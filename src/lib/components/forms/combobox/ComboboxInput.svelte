<script lang="ts">
	import { getComboboxContext } from './Combobox.svelte';

	export let placeholder: string = 'Search...';
	let className = '';
	export { className as class };

	const { search, open } = getComboboxContext();

	$: searchValue = $search;
	$: classes = ['combobox-input', className].filter(Boolean).join(' ');

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		search.set(target.value);
		open.set(true);
	}

	function handleFocus() {
		open.set(true);
	}
</script>

<input
	type="text"
	class={classes}
	{placeholder}
	value={searchValue}
	on:input={handleInput}
	on:focus={handleFocus}
	{...$$restProps}
/>

<style>
	.combobox-input {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: var(--font-size-sm);
		color: var(--color-foreground);
		background-color: var(--color-background);
		border: none;
		border-bottom: 1px solid var(--color-border);
		outline: none;
		font-family: inherit;
	}

	.combobox-input::placeholder {
		color: var(--color-muted-foreground);
	}

	.combobox-input:focus {
		border-bottom-color: var(--color-ring);
	}
</style>
