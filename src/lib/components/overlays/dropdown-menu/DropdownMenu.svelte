<script lang="ts" context="module">
	import { writable, type Writable } from 'svelte/store';
	import { setContext, getContext } from 'svelte';

	const DROPDOWN_KEY = Symbol('DropdownMenu');

	export interface DropdownMenuContext {
		open: Writable<boolean>;
		toggle: () => void;
		close: () => void;
	}

	export function setDropdownMenuContext(context: DropdownMenuContext) {
		setContext(DROPDOWN_KEY, context);
	}

	export function getDropdownMenuContext(): DropdownMenuContext {
		const context = getContext<DropdownMenuContext>(DROPDOWN_KEY);
		if (!context) {
			throw new Error('DropdownMenu components must be used within DropdownMenu');
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

	const context: DropdownMenuContext = {
		open: openStore,
		toggle,
		close
	};

	setDropdownMenuContext(context);
</script>

<div class="dropdown-menu">
	<slot />
</div>

<style>
	.dropdown-menu {
		position: relative;
		display: inline-block;
	}
</style>
