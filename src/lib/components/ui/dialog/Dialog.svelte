<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { setContext, getContext } from 'svelte';

	const DIALOG_KEY = Symbol('Dialog');

	export interface DialogContext {
		open: boolean;
		onOpenChange: (open: boolean) => void;
	}

	export function setDialogContext(context: DialogContext) {
		setContext(DIALOG_KEY, context);
	}

	export function getDialogContext(): DialogContext {
		const context = getContext<DialogContext>(DIALOG_KEY);
		if (!context) {
			throw new Error('Dialog compound components must be used within Dialog');
		}
		return context;
	}
</script>

<script lang="ts">
	export let open = false;

	function handleOpenChange(newOpen: boolean) {
		open = newOpen;
	}

	$: context = {
		open,
		onOpenChange: handleOpenChange
	};

	$: setDialogContext(context);
</script>

<slot />
