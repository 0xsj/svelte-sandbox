import type { ApiClient } from './client.interface';
import type { RequestOptions, HttpMethod } from './types';
import { abortManager } from './abort-manager';
import { withRetry } from './retry';
import { requestRegistry, generateRequestKey } from './request-registry';

/**
 * Configuration for the Fetch API Client
 */
export interface FetchClientConfig {
	/**
	 * Base URL for all API requests
	 * @default process.env.NEXT_PUBLIC_API_URL || ''
	 */
	baseURL?: string;

	/**
	 * Default headers to include in all requests
	 */
	defaultHeaders?: Record<string, string>;

	/**
	 * Enable request deduplication
	 * @default false (Tanstack Query handles this)
	 */
	enableDeduplication?: boolean;

	/**
	 * Enable automatic retry with exponential backoff
	 * @default true
	 */
	enableRetry?: boolean;

	/**
	 * Maximum number of retry attempts
	 * @default 3
	 */
	maxRetries?: number;

	/**
	 * Request timeout in milliseconds
	 * @default 30000 (30 seconds)
	 */
	timeout?: number;

	/**
	 * Interceptor called before each request
	 * Useful for adding auth tokens, logging, etc.
	 */
	onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;

	/**
	 * Interceptor called after successful response
	 * Useful for logging, data transformation, etc.
	 */
	onResponse?: <T>(response: T) => T | Promise<T>;

	/**
	 * Interceptor called on error
	 * Useful for logging, error transformation, token refresh, etc.
	 */
	onError?: (error: unknown) => unknown | Promise<unknown>;
}

interface RequestConfig {
	method: HttpMethod;
	url: string;
	headers: Record<string, string>;
	body?: unknown;
	signal?: AbortSignal;
}

/**
 * Fetch-based API Client implementation
 *
 * Features:
 * - Automatic retry with exponential backoff
 * - Request deduplication (optional, for learning)
 * - AbortController integration for request cancellation
 * - Request/response interceptors
 * - Timeout handling
 * - Type-safe responses
 */
export class FetchApiClient implements ApiClient {
	private config: Required<FetchClientConfig>;

	constructor(config: FetchClientConfig = {}) {
		this.config = {
			baseURL: config.baseURL || process.env.NEXT_PUBLIC_API_URL || '',
			defaultHeaders: config.defaultHeaders || {
				'Content-Type': 'application/json'
			},
			enableDeduplication: config.enableDeduplication ?? false,
			enableRetry: config.enableRetry ?? true,
			maxRetries: config.maxRetries ?? 3,
			timeout: config.timeout ?? 30000,
			onRequest: config.onRequest || ((c) => c),
			onResponse: config.onResponse || ((r) => r),
			onError: config.onError || ((e) => e)
		};
	}

	/**
	 * Perform a GET request
	 */
	async get<T>(url: string, options?: RequestOptions): Promise<T> {
		return this.request<T>('GET', url, undefined, options);
	}

	/**
	 * Perform a POST request
	 */
	async post<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
		return this.request<T>('POST', url, data, options);
	}

	/**
	 * Perform a PUT request
	 */
	async put<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
		return this.request<T>('PUT', url, data, options);
	}

	/**
	 * Perform a PATCH request
	 */
	async patch<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
		return this.request<T>('PATCH', url, data, options);
	}

	/**
	 * Perform a DELETE request
	 */
	async delete<T>(url: string, options?: RequestOptions): Promise<T> {
		return this.request<T>('DELETE', url, undefined, options);
	}

	/**
	 * Core request method - handles all HTTP methods
	 */
	private async request<T>(
		method: HttpMethod,
		url: string,
		body?: unknown,
		options?: RequestOptions
	): Promise<T> {
		// Build full URL
		const fullUrl = this.buildUrl(url, options?.params);

		// Create request config
		let requestConfig: RequestConfig = {
			method,
			url: fullUrl,
			headers: {
				...this.config.defaultHeaders,
				...options?.headers
			},
			body,
			signal: options?.signal
		};

		// Apply request interceptor
		requestConfig = await this.config.onRequest(requestConfig);

		// Generate cache key for deduplication
		const cacheKey = generateRequestKey(method, fullUrl, options?.params, body);

		// Create abort signal with timeout
		const signal = this.createSignalWithTimeout(requestConfig.signal, cacheKey);

		// Execute request with optional deduplication and retry
		const executeFetch = async (): Promise<T> => {
			try {
				const response = await fetch(requestConfig.url, {
					method: requestConfig.method,
					headers: requestConfig.headers,
					body: requestConfig.body ? JSON.stringify(requestConfig.body) : undefined,
					signal
				});

				// Handle non-OK responses
				if (!response.ok) {
					await this.handleErrorResponse(response);
				}

				// Parse JSON response
				const data = await response.json();

				// Apply response interceptor
				return await this.config.onResponse(data);
			} catch (error) {
				// Apply error interceptor
				const transformedError = await this.config.onError(error);
				throw transformedError;
			} finally {
				// Cleanup abort controller
				abortManager.cleanup(cacheKey);
			}
		};

		// Apply deduplication if enabled
		const fetchWithDedup = this.config.enableDeduplication
			? () => requestRegistry.getOrCreate<T>(cacheKey, executeFetch)
			: executeFetch;

		// Apply retry if enabled
		const fetchWithRetry = this.config.enableRetry
			? () =>
					withRetry(fetchWithDedup, {
						maxRetries: this.config.maxRetries
					})
			: fetchWithDedup;

		return fetchWithRetry();
	}

	/**
	 * Build full URL with query parameters
	 */
	private buildUrl(url: string, params?: Record<string, string | number | boolean>): string {
		const fullUrl = url.startsWith('http') ? url : `${this.config.baseURL}${url}`;

		if (!params || Object.keys(params).length === 0) {
			return fullUrl;
		}

		const queryString = new URLSearchParams(
			Object.entries(params).map(([key, value]) => [key, String(value)])
		).toString();

		return `${fullUrl}?${queryString}`;
	}

	/**
	 * Create abort signal with timeout
	 * Combines user-provided signal with timeout signal
	 */
	private createSignalWithTimeout(userSignal?: AbortSignal, cacheKey?: string): AbortSignal {
		// If user provided signal, use it
		if (userSignal) {
			return userSignal;
		}

		// Create signal with abort manager (for race condition prevention)
		if (cacheKey) {
			return abortManager.create(cacheKey);
		}

		// Fallback: create timeout signal
		return AbortSignal.timeout(this.config.timeout);
	}

	/**
	 * Handle error responses and throw appropriate errors
	 */
	private async handleErrorResponse(response: Response): Promise<never> {
		let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
		let errorDetails: unknown;

		try {
			errorDetails = await response.json();
			if (typeof errorDetails === 'object' && errorDetails !== null && 'message' in errorDetails) {
				errorMessage = String(errorDetails.message);
			}
		} catch {
			// Ignore JSON parse errors
		}

		const error = new Error(errorMessage);
		(error as Error & { status: number; details: unknown }).status = response.status;
		(error as Error & { status: number; details: unknown }).details = errorDetails;

		throw error;
	}
}
