/**
 * Request Registry - Deduplicates identical in-flight requests
 *
 * NOTE: When using Tanstack Query, this is mostly educational.
 * Tanstack Query provides superior deduplication with cache management.
 *
 * Useful for:
 * - Understanding how deduplication works internally
 * - Plain fetch without Tanstack Query
 * - SvelteKit projects without query libraries
 * - Manual API calls outside of query hooks
 */

/**
 * Registry entry containing the pending promise and metadata
 */
interface RegistryEntry<T> {
  promise: Promise<T>;
  timestamp: number;
  aborted: boolean;
}

export class RequestRegistry {
  private registry = new Map<string, RegistryEntry<unknown>>();

  /**
   * Get or create a request
   * If an identical request is in-flight, return the existing promise
   * Otherwise, execute the request function and store it
   *
   * @param key - Unique identifier for the request (e.g., "GET:/api/users/123")
   * @param requestFn - Function that performs the actual request
   * @returns Promise that resolves with the request result
   *
   * @example
   * ```typescript
   * const data = await registry.getOrCreate(
   *   'GET:/api/users/123',
   *   () => fetch('/api/users/123').then(r => r.json())
   * );
   * ```
   */
  async getOrCreate<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    // Check if request is already in-flight
    const existing = this.registry.get(key) as RegistryEntry<T> | undefined;

    if (existing && !existing.aborted) {
      console.debug(`[RequestRegistry] Reusing in-flight request: ${key}`);
      return existing.promise;
    }

    // Create new request
    console.debug(`[RequestRegistry] Creating new request: ${key}`);

    const promise = requestFn()
      .then((result) => {
        // Clean up on success
        this.cleanup(key);
        return result;
      })
      .catch((error) => {
        // Clean up on error
        this.cleanup(key);
        throw error;
      });

    // Store in registry
    this.registry.set(key, {
      promise,
      timestamp: Date.now(),
      aborted: false,
    });

    return promise;
  }

  /**
   * Manually abort a request
   * Marks the request as aborted so it won't be reused
   *
   * @param key - Unique identifier for the request
   */
  abort(key: string): void {
    const entry = this.registry.get(key);
    if (entry) {
      entry.aborted = true;
      console.debug(`[RequestRegistry] Aborted request: ${key}`);
    }
  }

  /**
   * Clear a specific request from the registry
   *
   * @param key - Unique identifier for the request
   */
  cleanup(key: string): void {
    this.registry.delete(key);
  }

  /**
   * Clear all requests from the registry
   * Useful for cleanup on logout or route changes
   */
  clear(): void {
    this.registry.clear();
  }

  /**
   * Remove stale requests that have been pending too long
   * Prevents memory leaks from requests that never resolve
   *
   * @param maxAge - Maximum age in milliseconds (default: 60 seconds)
   */
  cleanupStale(maxAge: number = 60000): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.registry.forEach((entry, key) => {
      if (now - entry.timestamp > maxAge) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => {
      console.warn(`[RequestRegistry] Cleaning up stale request: ${key}`);
      this.cleanup(key);
    });
  }

  /**
   * Check if a request is currently in-flight
   *
   * @param key - Unique identifier for the request
   */
  has(key: string): boolean {
    const entry = this.registry.get(key);
    return entry !== undefined && !entry.aborted;
  }

  /**
   * Get number of active requests
   */
  get size(): number {
    return this.registry.size;
  }

  /**
   * Get all active request keys (useful for debugging)
   */
  getActiveKeys(): string[] {
    return Array.from(this.registry.keys());
  }
}

/**
 * Global singleton instance
 */
export const requestRegistry = new RequestRegistry();

/**
 * Generate a cache key for a request
 * Combines method, URL, and serialized params/body
 *
 * @example
 * ```typescript
 * const key = generateRequestKey('GET', '/api/users', { page: 1 });
 * // Returns: "GET:/api/users?page=1"
 * ```
 */
export function generateRequestKey(
  method: string,
  url: string,
  params?: Record<string, unknown>,
  body?: unknown
): string {
  let key = `${method}:${url}`;

  // Add query params to key
  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    key += `?${queryString}`;
  }

  // Add body to key (for POST/PUT/PATCH)
  if (body) {
    const bodyHash = JSON.stringify(body);
    key += `|body:${bodyHash}`;
  }

  return key;
}
