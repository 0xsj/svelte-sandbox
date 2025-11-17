import { writable } from 'svelte/store';
import { userService } from '$lib/services/user.service';
import { usersStore } from '$lib/stores/queries/users';
import type { CreateUserInput, UpdateUserInput } from '$lib/types/user';

interface MutationState<TData> {
	data: TData | null;
	isPending: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: Error | null;
}

function createMutationState<TData>(): MutationState<TData> {
	return {
		data: null,
		isPending: false,
		isError: false,
		isSuccess: false,
		error: null
	};
}

/**
 * Create User Mutation Store
 */
function createCreateUserStore() {
	const { subscribe, set } = writable<MutationState<unknown>>(createMutationState());

	return {
		subscribe,

		mutate: async (input: CreateUserInput) => {
			console.log('[CreateUserMutation] Creating user...', input);

			set({
				data: null,
				isPending: true,
				isError: false,
				isSuccess: false,
				error: null
			});

			try {
				const newUser = await userService.create(input);

				set({
					data: newUser,
					isPending: false,
					isError: false,
					isSuccess: true,
					error: null
				});

				console.log('[CreateUserMutation] Success! Invalidating users cache...');

				// Invalidate users list (refetch)
				await usersStore.fetch(true);

				return newUser;
			} catch (error) {
				console.error('[CreateUserMutation] Error:', error);

				set({
					data: null,
					isPending: false,
					isError: true,
					isSuccess: false,
					error: error as Error
				});

				throw error;
			}
		},

		reset: () => {
			set(createMutationState());
		}
	};
}

export const createUserMutation = createCreateUserStore();

/**
 * Update User Mutation Store
 */
function createUpdateUserStore() {
	const { subscribe, set } = writable<MutationState<unknown>>(createMutationState());

	return {
		subscribe,

		mutate: async (id: string, data: UpdateUserInput) => {
			console.log(`[UpdateUserMutation] Updating user ${id}...`, data);

			set({
				data: null,
				isPending: true,
				isError: false,
				isSuccess: false,
				error: null
			});

			try {
				const updatedUser = await userService.update(id, data);

				set({
					data: updatedUser,
					isPending: false,
					isError: false,
					isSuccess: true,
					error: null
				});

				// Invalidate cache
				await usersStore.fetch(true);

				return updatedUser;
			} catch (error) {
				console.error('[UpdateUserMutation] Error:', error);

				set({
					data: null,
					isPending: false,
					isError: true,
					isSuccess: false,
					error: error as Error
				});

				throw error;
			}
		},

		reset: () => {
			set(createMutationState());
		}
	};
}

export const updateUserMutation = createUpdateUserStore();
