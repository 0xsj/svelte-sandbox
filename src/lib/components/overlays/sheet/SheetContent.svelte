<script lang="ts">
	import { getSheetContext } from './Sheet.svelte';
	import { clickOutside } from '$lib/utils/dom/click-outside';

	export let side: 'left' | 'right' | 'top' | 'bottom' = 'right';
	let className = '';
	export { className as class };

	const { open, close } = getSheetContext();

	$: isOpen = $open;
	$: classes = ['sheet-content', `side-${side}`, className].filter(Boolean).join(' ');

	function handleClickOutside() {
		close();
	}

	function handleEscape(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}
</script>

{#if isOpen}
	<!-- Overlay -->
	<div class="sheet-overlay" on:click={close}></div>

	<!-- Content -->
	<div
		class={classes}
		use:clickOutside={handleClickOutside}
		on:keydown={handleEscape}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		{...$$restProps}
	>
		<slot />
	</div>
{/if}

<style>
	.sheet-overlay {
		position: fixed;
		inset: 0;
		z-index: 50;
		background-color: rgba(0, 0, 0, 0.5);
		animation: fadeIn 0.2s ease-out;
	}

	.sheet-content {
		position: fixed;
		z-index: 51;
		background-color: var(--color-background);
		box-shadow: var(--shadow-lg);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		padding: var(--spacing-2xl);
		overflow-y: auto;
	}

	/* Side: right */
	.side-right {
		top: 0;
		right: 0;
		bottom: 0;
		width: 400px;
		max-width: 90vw;
		border-left: 1px solid var(--color-border);
		animation: slideInRight 0.25s ease-out;
	}

	/* Side: left */
	.side-left {
		top: 0;
		left: 0;
		bottom: 0;
		width: 400px;
		max-width: 90vw;
		border-right: 1px solid var(--color-border);
		animation: slideInLeft 0.25s ease-out;
	}

	/* Side: top */
	.side-top {
		top: 0;
		left: 0;
		right: 0;
		height: 400px;
		max-height: 90vh;
		border-bottom: 1px solid var(--color-border);
		animation: slideInTop 0.25s ease-out;
	}

	/* Side: bottom */
	.side-bottom {
		bottom: 0;
		left: 0;
		right: 0;
		height: 400px;
		max-height: 90vh;
		border-top: 1px solid var(--color-border);
		animation: slideInBottom 0.25s ease-out;
	}

	/* Animations */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideInRight {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes slideInLeft {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes slideInTop {
		from {
			transform: translateY(-100%);
		}
		to {
			transform: translateY(0);
		}
	}

	@keyframes slideInBottom {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}

	/* Mobile adjustments */
	@media (max-width: 640px) {
		.side-right,
		.side-left {
			width: 100%;
			max-width: 100%;
		}
	}
</style>
