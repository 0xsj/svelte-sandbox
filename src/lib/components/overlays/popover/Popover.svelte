<script lang="ts" context="module">
	import { writable, type Writable } from 'svelte/store';
	import { setContext, getContext } from 'svelte';

	const POPOVER_KEY = Symbol('Popover');

	export interface PopoverContext {
		open: Writable<boolean>;
		toggle: () => void;
		close: () => void;
	}

	export function setPopoverContext(context: PopoverContext) {
		setContext(POPOVER_KEY, context);
	}

	export function getPopoverContext(): PopoverContext {
		const context = getContext<PopoverContext>(POPOVER_KEY);
		if (!context) {
			throw new Error('Popover components must be used within Popover');
		}
		return context;
	}
</script>

<script lang="ts">
	export let open: boolean = false;

	const openStore = writable(open);

	$: openStore.set(open);

	function toggle() {
		open = !open;
		openStore.set(open);
	}

	function close() {
		open = false;
		openStore.set(false);
	}

	const context: PopoverContext = {
		open: openStore,
		toggle,
		close
	};

	setPopoverContext(context);
</script>

<div class="popover">
	<slot />
</div>

<style>
	.popover {
		position: relative;
		display: inline-block;
	}
</style>
