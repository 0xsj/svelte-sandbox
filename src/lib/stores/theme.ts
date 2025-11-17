import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set } = writable<Theme>('light');

	return {
		subscribe,
		init: () => {
			if (!browser) return;
			const stored = (localStorage.getItem('theme') as Theme) || 'light';
			set(stored);
			document.documentElement.classList.toggle('dark', stored === 'dark');
		},
		toggle: () => {
			if (!browser) return;
			const current = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
			set(current);
			localStorage.setItem('theme', current);
			document.documentElement.classList.toggle('dark', current === 'dark');
		}
	};
}

export const theme = createThemeStore();
