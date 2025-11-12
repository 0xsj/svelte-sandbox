/**
 * Manages AbortControllers for ongoing requests
 * Prevents memory leaks and allows cancellation of in-flight requests
 */
export class AbortManager {
  private controllers = new Map<string, AbortController>();

  /**
   * Create a new AbortController for a request
   * If a controller already exists for this key, abort it first
   *
   * @param key - Unique identifier for the request
   * @returns AbortSignal to pass to fetch
   */
  create(key: string): AbortSignal {
    // Abort existing request with same key if it exists
    this.abort(key);

    // Create new controller
    const controller = new AbortController();
    this.controllers.set(key, controller);

    return controller.signal;
  }

  /**
   * Abort a specific request by key
   *
   * @param key - Unique identifier for the request
   */
  abort(key: string): void {
    const controller = this.controllers.get(key);
    if (controller) {
      controller.abort();
      this.controllers.delete(key);
    }
  }

  /**
   * Abort all ongoing requests
   */
  abortAll(): void {
    this.controllers.forEach((controller) => controller.abort());
    this.controllers.clear();
  }

  /**
   * Clean up a controller after request completes
   * Should be called in finally block
   *
   * @param key - Unique identifier for the request
   */
  cleanup(key: string): void {
    this.controllers.delete(key);
  }

  /**
   * Check if a request is currently active
   *
   * @param key - Unique identifier for the request
   */
  has(key: string): boolean {
    return this.controllers.has(key);
  }

  /**
   * Get number of active requests
   */
  get size(): number {
    return this.controllers.size;
  }
}

/**
 * Global singleton instance
 * Can be used across the application
 */
export const abortManager = new AbortManager();
