import { FetchApiClient } from './client.fetch';
import { MockApiClient } from './client.mock';
import type { ApiClient } from './client.interface';
import { browser } from '$app/environment'; // SvelteKit import

function createApiClient(): ApiClient {
	// SvelteKit uses PUBLIC_ prefix instead of NEXT_PUBLIC_
	const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

	if (useMocks) {
		console.log('[API] Using Mock API Client');
		const mockClient = new MockApiClient({ delay: 500 });
		seedMockData(mockClient);
		return mockClient;
	}

	console.log('[API] Using Fetch API Client');
	return new FetchApiClient({
		baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
		enableDeduplication: false,
		enableRetry: true,
		maxRetries: 3,
		timeout: 30000,

		onRequest: async (config) => {
			// Get token from Svelte store (we'll create this next)
			if (browser) {
				const { getAuthToken } = await import('$lib/stores/auth');
				const token = getAuthToken();

				if (token) {
					config.headers['Authorization'] = `Bearer ${token}`;
				}
			}

			return config;
		},

		onResponse: async (response) => {
			return response;
		},

		onError: async (error) => {
			if (import.meta.env.DEV) {
				console.error('[API Error]', error);
			}

			if (
				error instanceof Error &&
				'status' in error &&
				(error as Error & { status: number }).status === 401
			) {
				console.warn('[API] Unauthorized');

				if (browser) {
					const { authStore } = await import('$lib/stores/auth');
					authStore.clearTokens();
				}
			}

			return error;
		}
	});
}

function seedMockData(client: MockApiClient): void {
	client.seed('users', [
		{
			id: '1',
			email: 'john@example.com',
			name: 'John Doe',
			role: 'admin',
			createdAt: new Date('2024-01-01').toISOString()
		},
		{
			id: '2',
			email: 'jane@example.com',
			name: 'Jane Smith',
			role: 'user',
			createdAt: new Date('2024-01-15').toISOString()
		}
	]);

	console.log('[API] Mock data seeded');
}

export const apiClient: ApiClient = createApiClient();

export type { ApiClient } from './client.interface';
export type { RequestOptions } from './types';
