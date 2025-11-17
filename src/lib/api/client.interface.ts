import type { RequestOptions } from './types';

/**
 * API Client interface (Port)
 * This is the contract that all implementations must follow
 * Allows swapping between real API, mocks, or other implementations
 */
export interface ApiClient {
	/**
	 * Perform a GET request
	 */
	get<T>(url: string, options?: RequestOptions): Promise<T>;

	/**
	 * Perform a POST request
	 */
	post<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T>;

	/**
	 * Perform a PUT request
	 */
	put<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T>;

	/**
	 * Perform a PATCH request
	 */
	patch<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T>;

	/**
	 * Perform a DELETE request
	 */
	delete<T>(url: string, options?: RequestOptions): Promise<T>;
}
