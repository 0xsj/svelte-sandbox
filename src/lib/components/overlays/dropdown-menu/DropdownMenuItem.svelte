<script lang="ts">
	import { getDropdownMenuContext } from './DropdownMenu.svelte';

	export let disabled: boolean = false;
	let className = '';
	export { className as class };

	const { close } = getDropdownMenuContext();

	$: classes = ['dropdown-item', disabled && 'disabled', className].filter(Boolean).join(' ');

	function handleClick(event: MouseEvent) {
		if (disabled) {
			event.preventDefault();
			return;
		}
		close();
	}
</script>

<button type="button" class={classes} {disabled} on:click={handleClick} {...$$restProps}>
	<slot />
</button>

<style>
	.dropdown-item {
		display: flex;
		align-items: center;
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: var(--font-size-sm);
		color: var(--color-foreground);
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		text-align: left;
		transition: background-color var(--transition-normal);
		font-family: inherit;
	}

	.dropdown-item:hover:not(:disabled) {
		background-color: var(--color-accent);
	}

	.dropdown-item:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: -2px;
	}

	.dropdown-item.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
