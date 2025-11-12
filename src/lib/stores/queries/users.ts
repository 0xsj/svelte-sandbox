import { writable, derived, get } from 'svelte/store';
import { userService } from '$lib/services/user.service';
import type { User } from '$lib/types/user';

interface QueryState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
  isSuccess: boolean;
}

function createQueryState<T>(): QueryState<T> {
  return {
    data: null,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: false,
  };
}

/**
 * Users List Store
 * 
 * Demonstrates:
 * - Client-side data fetching with Svelte stores
 * - Loading/error states
 * - Manual cache management
 */
function createUsersStore() {
  const { subscribe, set, update } = writable<QueryState<User[]>>(
    createQueryState()
  );

  // Cache timestamp for stale-while-revalidate pattern
  let lastFetch: number | null = null;
  const STALE_TIME = 5 * 60 * 1000; // 5 minutes

  return {
    subscribe,

    /**
     * Fetch users list
     * @param force - Force refetch even if data is fresh
     */
    fetch: async (force = false) => {
      // Check if data is still fresh
      const now = Date.now();
      if (!force && lastFetch && now - lastFetch < STALE_TIME) {
        console.log('[UsersStore] Data is fresh, skipping fetch');
        return;
      }

      console.log('[UsersStore] Fetching users...');

      update((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      }));

      try {
        const users = await userService.list();
        
        set({
          data: users,
          isLoading: false,
          error: null,
          isError: false,
          isSuccess: true,
        });

        lastFetch = Date.now();
      } catch (error) {
        console.error('[UsersStore] Error fetching users:', error);
        
        update((state) => ({
          ...state,
          isLoading: false,
          error: error as Error,
          isError: true,
          isSuccess: false,
        }));
      }
    },

    /**
     * Refetch (force fresh data)
     */
    refetch: async () => {
      const store = get({ subscribe });
      await createUsersStore().fetch(true);
    },

    /**
     * Reset store to initial state
     */
    reset: () => {
      set(createQueryState());
      lastFetch = null;
    },
  };
}

export const usersStore = createUsersStore();

/**
 * Single User Store
 */
function createUserStore() {
  const { subscribe, set, update } = writable<QueryState<User>>(
    createQueryState()
  );

  const cache = new Map<string, { data: User; timestamp: number }>();
  const STALE_TIME = 5 * 60 * 1000;

  return {
    subscribe,

    fetch: async (id: string, force = false) => {
      // Check cache
      const cached = cache.get(id);
      const now = Date.now();
      
      if (!force && cached && now - cached.timestamp < STALE_TIME) {
        console.log(`[UserStore] Using cached data for user ${id}`);
        set({
          data: cached.data,
          isLoading: false,
          error: null,
          isError: false,
          isSuccess: true,
        });
        return;
      }

      console.log(`[UserStore] Fetching user ${id}...`);

      update((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      }));

      try {
        const user = await userService.getById(id);
        
        set({
          data: user,
          isLoading: false,
          error: null,
          isError: false,
          isSuccess: true,
        });

        cache.set(id, { data: user, timestamp: Date.now() });
      } catch (error) {
        console.error(`[UserStore] Error fetching user ${id}:`, error);
        
        update((state) => ({
          ...state,
          isLoading: false,
          error: error as Error,
          isError: true,
          isSuccess: false,
        }));
      }
    },

    reset: () => {
      set(createQueryState());
    },

    clearCache: () => {
      cache.clear();
    },
  };
}

export const userStore = createUserStore();