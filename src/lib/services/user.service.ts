import { apiClient } from '$lib/api';
import type { User, CreateUserInput, UpdateUserInput } from '$lib/types/user';

/**
 * User Service
 * Handles all user-related API operations
 */
export class UserService {
	/**
	 * Get all users
	 */
	async list(): Promise<User[]> {
		console.log('[UserService] Fetching users list...');
		return apiClient.get<User[]>('/users');
	}

	/**
	 * Get user by ID
	 */
	async getById(id: string): Promise<User> {
		console.log(`[UserService] Fetching user ${id}...`);
		return apiClient.get<User>(`/users/${id}`);
	}

	/**
	 * Create new user
	 */
	async create(data: CreateUserInput): Promise<User> {
		console.log('[UserService] Creating user...', data);
		return apiClient.post<User>('/users', data);
	}

	/**
	 * Update user
	 */
	async update(id: string, data: UpdateUserInput): Promise<User> {
		console.log(`[UserService] Updating user ${id}...`, data);
		return apiClient.patch<User>(`/users/${id}`, data);
	}

	/**
	 * Delete user
	 */
	async delete(id: string): Promise<void> {
		console.log(`[UserService] Deleting user ${id}...`);
		return apiClient.delete(`/users/${id}`);
	}
}

// Export singleton
export const userService = new UserService();
