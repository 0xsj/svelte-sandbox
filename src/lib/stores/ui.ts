import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

interface UIState {
	sidebarOpen: boolean;
	theme: Theme;
}

function getInitialState(): UIState {
	if (browser) {
		const stored = localStorage.getItem('ui-storage');
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

function createDefaultState(): UIState {
	return {
		sidebarOpen: true,
		theme: 'system'
	};
}

function createUIStore() {
	const { subscribe, update } = writable<UIState>(getInitialState());

	if (browser) {
		subscribe((state) => {
			localStorage.setItem('ui-storage', JSON.stringify({ state }));
		});
	}

	return {
		subscribe,

		toggleSidebar: () => {
			update((state) => ({
				...state,
				sidebarOpen: !state.sidebarOpen
			}));
		},

		setSidebarOpen: (open: boolean) => {
			update((state) => ({
				...state,
				sidebarOpen: open
			}));
		},

		setTheme: (theme: Theme) => {
			update((state) => ({
				...state,
				theme
			}));
		},

		toggleTheme: () => {
			update((state) => ({
				...state,
				theme: state.theme === 'dark' ? 'light' : 'dark'
			}));
		}
	};
}

export const uiStore = createUIStore();

export function getResolvedTheme(theme: Theme): 'light' | 'dark' {
	if (theme !== 'system') return theme;

	if (browser) {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	return 'light';
}
