import { writable } from 'svelte/store';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface Toast {
	id: string;
	title?: string;
	description?: string;
	variant?: ToastVariant;
	duration?: number;
}

interface ToastState {
	toasts: Toast[];
}

function createToastStore() {
	const { subscribe, update } = writable<ToastState>({
		toasts: []
	});

	let toastIdCounter = 0;

	function generateId(): string {
		return `toast-${++toastIdCounter}-${Date.now()}`;
	}

	return {
		subscribe,

		/**
		 * Add a new toast
		 */
		add: (toast: Omit<Toast, 'id'>) => {
			const id = generateId();
			const newToast: Toast = {
				id,
				variant: 'default',
				duration: 5000,
				...toast
			};

			update((state) => ({
				toasts: [...state.toasts, newToast]
			}));

			// Auto-dismiss after duration
			if (newToast.duration && newToast.duration > 0) {
				setTimeout(() => {
					toastStore.dismiss(id);
				}, newToast.duration);
			}

			return id;
		},

		/**
		 * Dismiss a specific toast
		 */
		dismiss: (id: string) => {
			update((state) => ({
				toasts: state.toasts.filter((t) => t.id !== id)
			}));
		},

		/**
		 * Dismiss all toasts
		 */
		dismissAll: () => {
			update(() => ({ toasts: [] }));
		}
	};
}

export const toastStore = createToastStore();

/**
 * Helper functions for common toast types
 */
export const toast = {
	success: (title: string, description?: string) => {
		return toastStore.add({ title, description, variant: 'success' });
	},
	error: (title: string, description?: string) => {
		return toastStore.add({ title, description, variant: 'error' });
	},
	warning: (title: string, description?: string) => {
		return toastStore.add({ title, description, variant: 'warning' });
	},
	info: (title: string, description?: string) => {
		return toastStore.add({ title, description, variant: 'info' });
	},
	message: (title: string, description?: string) => {
		return toastStore.add({ title, description, variant: 'default' });
	}
};
