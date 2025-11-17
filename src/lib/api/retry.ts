/**
 * Retry configuration options
 */
export interface RetryOptions {
	/**
	 * Maximum number of retry attempts
	 * @default 3
	 */
	maxRetries?: number;

	/**
	 * Initial delay in milliseconds
	 * @default 1000
	 */
	initialDelay?: number;

	/**
	 * Maximum delay in milliseconds
	 * @default 10000
	 */
	maxDelay?: number;

	/**
	 * Backoff multiplier for exponential backoff
	 * @default 2
	 */
	backoffMultiplier?: number;

	/**
	 * Determine if error is retriable
	 */
	shouldRetry?: (error: unknown, attempt: number) => boolean;
}

/**
 * Type guard to check if error has a status property
 */
function hasStatus(error: unknown): error is { status: number } {
	return (
		typeof error === 'object' &&
		error !== null &&
		'status' in error &&
		typeof (error as Record<string, unknown>).status === 'number'
	);
}

/**
 * Default retry condition - only retry on network errors and 5xx server errors
 */
function defaultShouldRetry(error: unknown): boolean {
	// Network errors (fetch failures)
	if (error instanceof TypeError) {
		return true;
	}

	// Server errors (5xx)
	if (hasStatus(error)) {
		return error.status >= 500 && error.status < 600;
	}

	return false;
}

/**
 * Calculate delay with exponential backoff
 */
function calculateDelay(
	attempt: number,
	initialDelay: number,
	maxDelay: number,
	backoffMultiplier: number
): number {
	const delay = initialDelay * Math.pow(backoffMultiplier, attempt);
	return Math.min(delay, maxDelay);
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 *
 * @example
 * ```typescript
 * const data = await withRetry(
 *   () => fetch('/api/data'),
 *   { maxRetries: 3, initialDelay: 1000 }
 * );
 * ```
 */
export async function withRetry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
	const {
		maxRetries = 3,
		initialDelay = 1000,
		maxDelay = 10000,
		backoffMultiplier = 2,
		shouldRetry = defaultShouldRetry
	} = options;

	let lastError: unknown;

	for (let attempt = 0; attempt < maxRetries; attempt++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error;

			// Don't retry if we've exhausted attempts
			const isLastAttempt = attempt === maxRetries - 1;
			if (isLastAttempt) {
				throw error;
			}

			// Don't retry if error is not retriable
			if (!shouldRetry(error, attempt)) {
				throw error;
			}

			// Calculate delay and wait before next attempt
			const delay = calculateDelay(attempt, initialDelay, maxDelay, backoffMultiplier);

			console.warn(
				`Request failed (attempt ${attempt + 1}/${maxRetries}). Retrying in ${delay}ms...`,
				error
			);

			await sleep(delay);
		}
	}

	// Should never reach here, but TypeScript needs this
	throw lastError;
}

/**
 * Create a retriable function wrapper
 *
 * @example
 * ```typescript
 * const fetchWithRetry = createRetriable(
 *   (url: string) => fetch(url),
 *   { maxRetries: 3 }
 * );
 *
 * const data = await fetchWithRetry('/api/data');
 * ```
 */
export function createRetriable<TArgs extends unknown[], TReturn>(
	fn: (...args: TArgs) => Promise<TReturn>,
	options: RetryOptions = {}
): (...args: TArgs) => Promise<TReturn> {
	return (...args: TArgs) => withRetry(() => fn(...args), options);
}
