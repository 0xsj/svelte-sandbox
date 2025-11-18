<script lang="ts">
	import { getComboboxContext } from './Combobox.svelte';

	export let placeholder: string = 'Select...';
	let className = '';
	export { className as class };

	const { open, selected, toggle } = getComboboxContext();

	$: isOpen = $open;
	$: selectedValue = $selected;
	$: classes = ['combobox-trigger', isOpen && 'open', className].filter(Boolean).join(' ');
</script>

<button type="button" class={classes} on:click={toggle} {...$$restProps}>
	<span class="combobox-value">
		{#if selectedValue}
			<slot value={selectedValue}>{selectedValue}</slot>
		{:else}
			<span class="placeholder">{placeholder}</span>
		{/if}
	</span>
	<svg
		class="combobox-icon"
		class:rotated={isOpen}
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
		<polyline points="6 9 12 15 18 9"></polyline>
	</svg>
</button>

<style>
	.combobox-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 40px;
		padding: 0 var(--spacing-md);
		font-size: var(--font-size-base);
		color: var(--color-foreground);
		background-color: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-normal);
		font-family: inherit;
		text-align: left;
	}

	.combobox-trigger:hover {
		border-color: var(--color-ring);
	}

	.combobox-trigger:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	.combobox-trigger.open {
		border-color: var(--color-ring);
	}

	.combobox-value {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.placeholder {
		color: var(--color-muted-foreground);
	}

	.combobox-icon {
		flex-shrink: 0;
		margin-left: var(--spacing-sm);
		color: var(--color-muted-foreground);
		transition: transform var(--transition-normal);
	}

	.combobox-icon.rotated {
		transform: rotate(180deg);
	}
</style>
