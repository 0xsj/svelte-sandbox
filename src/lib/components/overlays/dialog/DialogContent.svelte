<script lang="ts">
	import { getDialogContext } from './Dialog.svelte';
	import { onMount, onDestroy } from 'svelte';

	export let closeOnEscape = true;

	const context = getDialogContext();

	let className = '';
	export { className as class };

	let contentElement: HTMLDivElement;

	function handleEscape(e: KeyboardEvent) {
		if (closeOnEscape && e.key === 'Escape') {
			context.onOpenChange(false);
		}
	}

	function handleClick(e: MouseEvent) {
		e.stopPropagation();
	}

	onMount(() => {
		// Lock body scroll
		const originalStyle = window.getComputedStyle(document.body).overflow;
		document.body.style.overflow = 'hidden';

		// Add escape key listener
		document.addEventListener('keydown', handleEscape);

		// Focus first focusable element
		const focusableElements = contentElement.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		focusableElements[0]?.focus();

		return () => {
			document.body.style.overflow = originalStyle;
			document.removeEventListener('keydown', handleEscape);
		};
	});
</script>

<div
	bind:this={contentElement}
	role="dialog"
	aria-modal="true"
	class="content {className}"
	on:click={handleClick}
	{...$$restProps}
>
	<slot />
</div>

<style>
	.content {
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 51;
		transform: translate(-50%, -50%);
		width: 90vw;
		max-width: 500px;
		max-height: 85vh;
		overflow-y: auto;
		background-color: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		animation: dialogSlideIn 200ms ease-out;
	}

	@keyframes dialogSlideIn {
		from {
			opacity: 0;
			transform: translate(-50%, -48%) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}
</style>
