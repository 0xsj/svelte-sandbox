/**
 * Generic API response wrapper
 * Adjust based on your actual API response structure
 */
export interface ApiResponse<T> {
	data: T;
	message?: string;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		pageSize: number;
		total: number;
		totalPages: number;
	};
}

/**
 * Request options for API calls
 */
export interface RequestOptions {
	signal?: AbortSignal;
	headers?: Record<string, string>;
	params?: Record<string, string | number | boolean>;
}

/**
 * HTTP Methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Request configuration
 */
export interface RequestConfig extends RequestOptions {
	method: HttpMethod;
	body?: unknown;
}
