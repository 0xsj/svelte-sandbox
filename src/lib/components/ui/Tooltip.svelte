<script lang="ts">
	export let content: string;
	export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
	export let delay = 200;

	let showTooltip = false;
	let timeout: ReturnType<typeof setTimeout>;

	function handleMouseEnter() {
		timeout = setTimeout(() => {
			showTooltip = true;
		}, delay);
	}

	function handleMouseLeave() {
		clearTimeout(timeout);
		showTooltip = false;
	}
</script>

<div
	class="tooltip-wrapper"
	role="group"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<slot />
	{#if showTooltip}
		<div class="tooltip {position}" role="tooltip">
			{content}
		</div>
	{/if}
</div>

<style>
	.tooltip-wrapper {
		position: relative;
		display: inline-flex;
	}

	.tooltip {
		position: absolute;
		z-index: 50;
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--color-foreground);
		color: var(--color-background);
		font-size: var(--font-size-xs);
		border-radius: var(--radius-sm);
		white-space: nowrap;
		pointer-events: none;
		animation: fadeIn 0.15s ease-out;
	}

	.tooltip::after {
		content: '';
		position: absolute;
		border: 4px solid transparent;
	}

	/* Position variants */
	.tooltip.top {
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip.top::after {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-top-color: var(--color-foreground);
	}

	.tooltip.bottom {
		top: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip.bottom::after {
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-bottom-color: var(--color-foreground);
	}

	.tooltip.left {
		right: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}

	.tooltip.left::after {
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-left-color: var(--color-foreground);
	}

	.tooltip.right {
		left: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}

	.tooltip.right::after {
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-right-color: var(--color-foreground);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
