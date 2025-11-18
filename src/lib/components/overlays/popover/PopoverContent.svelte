<script lang="ts">
	import { getPopoverContext } from './Popover.svelte';
	import { clickOutside } from '$lib/utils/dom/click-outside';

	export let side: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
	export let align: 'start' | 'center' | 'end' = 'center';
	let className = '';
	export { className as class };

	const { open, close } = getPopoverContext();

	$: isOpen = $open;
	$: classes = ['popover-content', `side-${side}`, `align-${align}`, className]
		.filter(Boolean)
		.join(' ');

	function handleClickOutside() {
		close();
	}
</script>

{#if isOpen}
	<div class={classes} use:clickOutside={handleClickOutside} {...$$restProps}>
		<slot />
	</div>
{/if}

<style>
	.popover-content {
		position: absolute;
		z-index: 50;
		min-width: 200px;
		padding: var(--spacing-md);
		background-color: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		animation: fadeIn 0.15s ease-out;
	}

	/* Side positioning */
	.side-top {
		bottom: calc(100% + 8px);
	}

	.side-bottom {
		top: calc(100% + 8px);
	}

	.side-left {
		right: calc(100% + 8px);
	}

	.side-right {
		left: calc(100% + 8px);
	}

	/* Alignment for top/bottom */
	.side-top.align-start,
	.side-bottom.align-start {
		left: 0;
	}

	.side-top.align-center,
	.side-bottom.align-center {
		left: 50%;
		transform: translateX(-50%);
	}

	.side-top.align-end,
	.side-bottom.align-end {
		right: 0;
	}

	/* Alignment for left/right */
	.side-left.align-start,
	.side-right.align-start {
		top: 0;
	}

	.side-left.align-center,
	.side-right.align-center {
		top: 50%;
		transform: translateY(-50%);
	}

	.side-left.align-end,
	.side-right.align-end {
		bottom: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
