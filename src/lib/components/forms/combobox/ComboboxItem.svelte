<script lang="ts">
	import { getComboboxContext } from './Combobox.svelte';

	export let value: string;
	export let label: string = value;
	let className = '';
	export { className as class };

	const { selected, search, select } = getComboboxContext();

	$: isSelected = $selected === value;
	$: searchTerm = $search.toLowerCase();
	$: isVisible = label.toLowerCase().includes(searchTerm);
	$: classes = ['combobox-item', isSelected && 'selected', className].filter(Boolean).join(' ');

	function handleClick() {
		select(value);
	}
</script>

{#if isVisible}
	<button type="button" class={classes} on:click={handleClick} {...$$restProps}>
		<span class="combobox-item-label">
			<slot>{label}</slot>
		</span>
		{#if isSelected}
			<svg
				class="combobox-item-check"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="20 6 9 17 4 12"></polyline>
			</svg>
		{/if}
	</button>
{/if}

<style>
	.combobox-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: var(--font-size-sm);
		color: var(--color-foreground);
		background: transparent;
		border: none;
		cursor: pointer;
		text-align: left;
		transition: background-color var(--transition-normal);
		font-family: inherit;
	}

	.combobox-item:hover {
		background-color: var(--color-accent);
	}

	.combobox-item:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: -2px;
	}

	.combobox-item.selected {
		background-color: var(--color-accent);
	}

	.combobox-item-label {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.combobox-item-check {
		flex-shrink: 0;
		margin-left: var(--spacing-sm);
		color: var(--color-primary);
	}
</style>
