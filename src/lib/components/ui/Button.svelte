<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled = false;
</script>

<button class="btn {variant} {size}" {disabled} on:click {...$$restProps}>
	<slot />
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-lg);
		font-weight: var(--font-weight-medium);
		transition: all var(--transition-normal);
		cursor: pointer;
		border: none;
		font-family: inherit;
	}
	.btn:disabled {
		pointer-events: none;
		opacity: 0.5;
	}
	.btn:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	.primary {
		background: var(--color-primary);
		color: var(--color-primary-foreground);
	}
	.primary:hover:not(:disabled) {
		opacity: 0.9;
	}
	.secondary {
		background: var(--color-secondary);
		color: var(--color-secondary-foreground);
	}
	.secondary:hover:not(:disabled) {
		opacity: 0.8;
	}
	.outline {
		background: var(--color-background);
		color: var(--color-foreground);
		border: 1px solid var(--color-border);
	}
	.outline:hover:not(:disabled) {
		background: var(--color-accent);
	}
	.ghost {
		background: transparent;
	}
	.ghost:hover:not(:disabled) {
		background: var(--color-accent);
	}
	.destructive {
		background: var(--color-error);
		color: var(--color-error-foreground);
	}
	.destructive:hover:not(:disabled) {
		opacity: 0.9;
	}

	.sm {
		height: 36px;
		padding: 0 var(--spacing-md);
		font-size: var(--font-size-sm);
	}
	.md {
		height: 40px;
		padding: 0 var(--spacing-lg);
		font-size: var(--font-size-base);
	}
	.lg {
		height: 44px;
		padding: 0 var(--spacing-xl);
		font-size: var(--font-size-lg);
	}
</style>
