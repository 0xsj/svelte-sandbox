<script lang="ts" context="module">
	import { writable, type Writable } from 'svelte/store';
	import { setContext, getContext } from 'svelte';

	const SHEET_KEY = Symbol('Sheet');

	export interface SheetContext {
		open: Writable<boolean>;
		toggle: () => void;
		close: () => void;
	}

	export function setSheetContext(context: SheetContext) {
		setContext(SHEET_KEY, context);
	}

	export function getSheetContext(): SheetContext {
		const context = getContext<SheetContext>(SHEET_KEY);
		if (!context) {
			throw new Error('Sheet components must be used within Sheet');
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

	const context: SheetContext = {
		open: openStore,
		toggle,
		close
	};

	setSheetContext(context);
</script>

<div class="sheet">
	<slot />
</div>

<style>
	.sheet {
		display: contents;
	}
</style>
