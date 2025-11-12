import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

// Initialize from localStorage if in browser
function getInitialState(): AuthState {
  if (browser) {
    const stored = localStorage.getItem('auth-storage');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.state || createDefaultState();
      } catch {
        return createDefaultState();
      }
    }
  }
  return createDefaultState();
}

function createDefaultState(): AuthState {
  return {
    token: null,
    refreshToken: null,
    isAuthenticated: false,
  };
}

// Create store
function createAuthStore() {
  const { subscribe, update } = writable<AuthState>(getInitialState());

  // Persist to localStorage on changes
  if (browser) {
    subscribe((state) => {
      localStorage.setItem('auth-storage', JSON.stringify({ state }));
    });
  }

  return {
    subscribe,
    
    setTokens: (token: string, refreshToken: string) => {
      update((state) => ({
        ...state,
        token,
        refreshToken,
        isAuthenticated: true,
      }));
    },

    clearTokens: () => {
      update(() => createDefaultState());
    },

    logout: () => {
      update(() => createDefaultState());
      if (browser) {
        localStorage.removeItem('auth_token');
      }
    },
  };
}

export const authStore = createAuthStore();

// Helper to get token outside Svelte components
export function getAuthToken(): string | null {
  let token: string | null = null;
  authStore.subscribe((state) => {
    token = state.token;
  })();
  return token;
}