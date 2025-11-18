<script lang="ts" context="module">
	import { writable, type Writable } from 'svelte/store';
	import { setContext, getContext } from 'svelte';

	const COMBOBOX_KEY = Symbol('Combobox');

	export interface ComboboxContext {
		open: Writable<boolean>;
		selected: Writable<string>;
		search: Writable<string>;
		toggle: () => void;
		close: () => void;
		select: (value: string) => void;
	}

	export function setComboboxContext(context: ComboboxContext) {
		setContext(COMBOBOX_KEY, context);
	}

	export function getComboboxContext(): ComboboxContext {
		const context = getContext<ComboboxContext>(COMBOBOX_KEY);
		if (!context) {
			throw new Error('Combobox components must be used within Combobox');
		}
		return context;
	}
</script>

<script lang="ts">
	export let value: string = '';
	export let placeholder: string = 'Search...';
	let className = '';
	export { className as class };

	const open = writable(false);
	const selected = writable(value);
	const search = writable('');

	$: selected.set(value);

	function toggle() {
		open.update((o) => !o);
	}

	function close() {
		open.set(false);
		search.set('');
	}

	function select(itemValue: string) {
		value = itemValue;
		selected.set(itemValue);
		close();
	}

	const context: ComboboxContext = {
		open,
		selected,
		search,
		toggle,
		close,
		select
	};

	setComboboxContext(context);

	$: classes = ['combobox', className].filter(Boolean).join(' ');
</script>

<div class={classes} {...$$restProps}>
	<slot {placeholder} />
</div>

<style>
	.combobox {
		position: relative;
		width: 100%;
	}
</style>
