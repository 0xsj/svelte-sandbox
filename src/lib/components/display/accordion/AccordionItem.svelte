<script lang="ts">
	import { getAccordionContext } from './Accordion.svelte';

	export let value: string;
	export let title: string;
	let className = '';
	export { className as class };

	const { toggle, isActive } = getAccordionContext();

	$: active = isActive(value);
	$: classes = ['accordion-item', active && 'active', className].filter(Boolean).join(' ');

	function handleToggle() {
		toggle(value);
	}
</script>

<div class={classes} {...$$restProps}>
	<button type="button" class="accordion-trigger" on:click={handleToggle}>
		<span class="accordion-title">{title}</span>
		<svg
			class="accordion-icon"
			class:rotated={active}
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

	{#if active}
		<div class="accordion-content">
			<slot />
		</div>
	{/if}
</div>

<style>
	.accordion-item {
		border-bottom: 1px solid var(--color-border);
	}

	.accordion-item:last-child {
		border-bottom: none;
	}

	.accordion-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: var(--spacing-lg);
		background: transparent;
		border: none;
		cursor: pointer;
		text-align: left;
		transition: background-color var(--transition-normal);
		font-family: inherit;
		font-size: var(--font-size-base);
	}

	.accordion-trigger:hover {
		background-color: var(--color-muted);
	}

	.accordion-title {
		font-weight: var(--font-weight-medium);
		color: var(--color-foreground);
	}

	.accordion-icon {
		flex-shrink: 0;
		transition: transform var(--transition-normal);
		color: var(--color-muted-foreground);
	}

	.accordion-icon.rotated {
		transform: rotate(180deg);
	}

	.accordion-content {
		padding: 0 var(--spacing-lg) var(--spacing-lg);
		animation: slideDown 0.2s ease-out;
		color: var(--color-muted-foreground);
		font-size: var(--font-size-sm);
		line-height: 1.6;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
