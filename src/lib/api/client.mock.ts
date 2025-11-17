import type { ApiClient } from './client.interface';
import type { RequestOptions } from './types';

/**
 * Mock API Client for testing and development
 *
 * Features:
 * - Simulates network delay
 * - In-memory data storage
 * - Configurable success/error responses
 * - No actual HTTP requests
 */
export class MockApiClient implements ApiClient {
	private data = new Map<string, unknown>();
	private delay: number;

	constructor(config: { delay?: number } = {}) {
		this.delay = config.delay ?? 500; // Default 500ms delay
	}

	/**
	 * Simulate network delay
	 */
	private async simulateDelay(): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, this.delay));
	}

	/**
	 * Parse URL to extract resource and ID
	 * e.g., "/api/users/123" => { resource: "users", id: "123" }
	 */
	private parseUrl(url: string): { resource: string; id?: string } {
		const parts = url.split('/').filter(Boolean);

		// Remove 'api' prefix if present
		const startIndex = parts[0] === 'api' ? 1 : 0;

		const resource = parts[startIndex] || '';
		const id = parts[startIndex + 1];

		return { resource, id };
	}

	/**
	 * Generate a storage key
	 */
	private getStorageKey(resource: string, id?: string): string {
		return id ? `${resource}:${id}` : resource;
	}

	/**
	 * GET request - retrieve data
	 */
	async get<T>(url: string, options?: RequestOptions): Promise<T> {
		await this.simulateDelay();

		// Check if request was aborted
		if (options?.signal?.aborted) {
			throw new Error('Request aborted');
		}

		const { resource, id } = this.parseUrl(url);

		if (id) {
			// Get single item
			const key = this.getStorageKey(resource, id);
			const item = this.data.get(key);

			if (!item) {
				const error = new Error(`${resource} with id ${id} not found`);
				(error as Error & { status: number }).status = 404;
				throw error;
			}

			return item as T;
		} else {
			// Get collection - return all items for this resource
			const items: unknown[] = [];
			this.data.forEach((value, key) => {
				if (key.startsWith(`${resource}:`)) {
					items.push(value);
				}
			});

			return items as T;
		}
	}

	/**
	 * POST request - create new resource
	 */
	async post<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
		await this.simulateDelay();

		if (options?.signal?.aborted) {
			throw new Error('Request aborted');
		}

		const { resource } = this.parseUrl(url);

		// Generate ID for new resource
		const id = this.generateId();
		const newItem = {
			id,
			...((data as object) || {}),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};

		// Store the new item
		const key = this.getStorageKey(resource, id);
		this.data.set(key, newItem);

		console.log(`[MockApiClient] Created ${resource}:`, newItem);

		return newItem as T;
	}

	/**
	 * PUT request - replace entire resource
	 */
	async put<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
		await this.simulateDelay();

		if (options?.signal?.aborted) {
			throw new Error('Request aborted');
		}

		const { resource, id } = this.parseUrl(url);

		if (!id) {
			const error = new Error('PUT requires an ID');
			(error as Error & { status: number }).status = 400;
			throw error;
		}

		const key = this.getStorageKey(resource, id);
		const existing = this.data.get(key);

		if (!existing) {
			const error = new Error(`${resource} with id ${id} not found`);
			(error as Error & { status: number }).status = 404;
			throw error;
		}

		const updated = {
			...(existing as object),
			...((data as object) || {}),
			id, // Preserve ID
			updatedAt: new Date().toISOString()
		};

		this.data.set(key, updated);

		console.log(`[MockApiClient] Updated ${resource}:`, updated);

		return updated as T;
	}

	/**
	 * PATCH request - partial update
	 */
	async patch<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
		// For mock purposes, PATCH is same as PUT
		return this.put<T>(url, data, options);
	}

	/**
	 * DELETE request - remove resource
	 */
	async delete<T>(url: string, options?: RequestOptions): Promise<T> {
		await this.simulateDelay();

		if (options?.signal?.aborted) {
			throw new Error('Request aborted');
		}

		const { resource, id } = this.parseUrl(url);

		if (!id) {
			const error = new Error('DELETE requires an ID');
			(error as Error & { status: number }).status = 400;
			throw error;
		}

		const key = this.getStorageKey(resource, id);
		const existing = this.data.get(key);

		if (!existing) {
			const error = new Error(`${resource} with id ${id} not found`);
			(error as Error & { status: number }).status = 404;
			throw error;
		}

		this.data.delete(key);

		console.log(`[MockApiClient] Deleted ${resource} with id ${id}`);

		return existing as T;
	}

	/**
	 * Generate a mock ID
	 */
	private generateId(): string {
		return `mock_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
	}

	/**
	 * Seed mock data for testing
	 *
	 * @example
	 * ```typescript
	 * mockClient.seed('users', [
	 *   { id: '1', name: 'John' },
	 *   { id: '2', name: 'Jane' }
	 * ]);
	 * ```
	 */
	seed(resource: string, items: Array<{ id: string; [key: string]: unknown }>): void {
		items.forEach((item) => {
			const key = this.getStorageKey(resource, item.id);
			this.data.set(key, item);
		});

		console.log(`[MockApiClient] Seeded ${items.length} ${resource}`);
	}

	/**
	 * Clear all mock data
	 */
	clear(): void {
		this.data.clear();
		console.log('[MockApiClient] Cleared all data');
	}

	/**
	 * Get all data (for debugging)
	 */
	getAllData(): Map<string, unknown> {
		return new Map(this.data);
	}
}
