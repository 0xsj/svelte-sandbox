<script lang="ts">
	export let variant: 'default' | 'info' | 'success' | 'warning' | 'error' = 'default';
	export let dismissible = false;
	export let onClose: (() => void) | undefined = undefined;

	let className = '';
	export { className as class };

	$: classes = ['alert', `variant-${variant}`, className].filter(Boolean).join(' ');

	function handleClose() {
		onClose?.();
	}
</script>

<div role="alert" class={classes} {...$$restProps}>
	<slot />
	{#if dismissible && onClose}
		<button type="button" class="close" on:click={handleClose} aria-label="Close alert">
			<svg
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
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>
	{/if}
</div>

<style>
	.alert {
		position: relative;
		width: 100%;
		border-radius: var(--radius-lg);
		border: 1px solid;
		padding: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	/* Variant styles */
	.variant-default {
		background-color: var(--color-background);
		border-color: var(--color-border);
		color: var(--color-foreground);
	}

	.variant-info {
		background-color: #eff6ff;
		border-color: #3b82f6;
		color: #1e40af;
	}

	.variant-success {
		background-color: #f0fdf4;
		border-color: var(--color-success);
		color: #15803d;
	}

	.variant-warning {
		background-color: #fffbeb;
		border-color: var(--color-warning);
		color: #b45309;
	}

	.variant-error {
		background-color: #fef2f2;
		border-color: var(--color-error);
		color: #b91c1c;
	}

	/* Dark mode variants */
	:global(.dark) .variant-info {
		background-color: rgba(59, 130, 246, 0.1);
		color: #93c5fd;
	}

	:global(.dark) .variant-success {
		background-color: rgba(34, 197, 94, 0.1);
		color: #86efac;
	}

	:global(.dark) .variant-warning {
		background-color: rgba(251, 146, 60, 0.1);
		color: #fdba74;
	}

	:global(.dark) .variant-error {
		background-color: rgba(239, 68, 68, 0.1);
		color: #fca5a5;
	}

	/* Close button */
	.close {
		position: absolute;
		top: var(--spacing-lg);
		right: var(--spacing-lg);
		background: transparent;
		border: none;
		cursor: pointer;
		padding: var(--spacing-xs);
		border-radius: var(--radius-sm);
		color: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-normal);
		opacity: 0.7;
	}

	.close:hover {
		opacity: 1;
		background-color: rgba(0, 0, 0, 0.05);
	}

	.close:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}

	:global(.dark) .close:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
</style>
