<script lang="ts">
	import { getTabsContext } from './Tabs.svelte';

	export let value: string;

	const context = getTabsContext();

	let className = '';
	export { className as class };

	$: isActive = context.value === value;

	function handleClick() {
		context.onValueChange(value);
	}

	$: classes = ['trigger', isActive && 'active', className].filter(Boolean).join(' ');
</script>

<button class={classes} on:click={handleClick} role="tab" aria-selected={isActive} {...$$restProps}>
	<slot />
</button>

<style>
	.trigger {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-sm) var(--spacing-lg);
		border: none;
		background: transparent;
		border-radius: var(--radius-sm);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-muted-foreground);
		cursor: pointer;
		transition: all var(--transition-normal);
		white-space: nowrap;
	}

	.trigger:hover {
		color: var(--color-foreground);
	}

	.trigger.active {
		background-color: var(--color-background);
		color: var(--color-foreground);
		box-shadow: var(--shadow-sm);
	}

	.trigger:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}
</style>
