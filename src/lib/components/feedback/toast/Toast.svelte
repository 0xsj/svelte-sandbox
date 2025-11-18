<script lang="ts">
	import type { ToastVariant } from './toast.store';

	export let id: string;
	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let variant: ToastVariant = 'default';
	export let onDismiss: (id: string) => void;

	let className = '';
	export { className as class };

	$: classes = ['toast', `variant-${variant}`, className].filter(Boolean).join(' ');

	function handleDismiss() {
		onDismiss(id);
	}
</script>

<div class={classes} role="alert" {...$$restProps}>
	<div class="toast-content">
		{#if title}
			<div class="toast-title">{title}</div>
		{/if}
		{#if description}
			<div class="toast-description">{description}</div>
		{/if}
		<slot />
	</div>
	<button class="toast-close" on:click={handleDismiss} aria-label="Close">
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
			<line x1="18" y1="6" x2="6" y2="18"></line>
			<line x1="6" y1="6" x2="18" y2="18"></line>
		</svg>
	</button>
</div>

<style>
	.toast {
		display: flex;
		align-items: start;
		gap: var(--spacing-md);
		width: 100%;
		max-width: 420px;
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		background-color: var(--color-background);
		box-shadow: var(--shadow-lg);
		pointer-events: auto;
		animation: slideIn 0.2s ease-out;
	}

	.toast-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.toast-title {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-foreground);
		line-height: 1.4;
	}

	.toast-description {
		font-size: var(--font-size-sm);
		color: var(--color-muted-foreground);
		line-height: 1.4;
	}

	.toast-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		padding: 0;
		border: none;
		background: transparent;
		color: var(--color-muted-foreground);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: all var(--transition-normal);
		flex-shrink: 0;
	}

	.toast-close:hover {
		color: var(--color-foreground);
		background-color: var(--color-muted);
	}

	/* Variant styles */
	.variant-success {
		border-color: var(--color-success);
		background-color: var(--color-success-subtle, var(--color-background));
	}

	.variant-success .toast-title {
		color: var(--color-success);
	}

	.variant-error {
		border-color: var(--color-error);
		background-color: var(--color-error-subtle, var(--color-background));
	}

	.variant-error .toast-title {
		color: var(--color-error);
	}

	.variant-warning {
		border-color: var(--color-warning);
		background-color: var(--color-warning-subtle, var(--color-background));
	}

	.variant-warning .toast-title {
		color: var(--color-warning);
	}

	.variant-info {
		border-color: var(--color-primary);
		background-color: var(--color-primary-subtle, var(--color-background));
	}

	.variant-info .toast-title {
		color: var(--color-primary);
	}

	/* Animations */
	@keyframes slideIn {
		from {
			transform: translateY(-100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
