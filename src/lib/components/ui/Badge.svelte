<script lang="ts">
	export let variant:
		| 'default'
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'error'
		| 'outline' = 'default';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let dot = false;

	let className = '';
	export { className as class };

	$: classes = ['badge', `variant-${variant}`, `size-${size}`, className].filter(Boolean).join(' ');
</script>

<span class={classes} {...$$restProps}>
	{#if dot}
		<span class="dot" />
	{/if}
	<slot />
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		border-radius: var(--radius-full);
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		transition: all var(--transition-normal);
		border: 1px solid transparent;
	}

	/* Size variants */
	.size-sm {
		height: 20px;
		padding: 0 var(--spacing-sm);
		font-size: var(--font-size-xs);
	}

	.size-md {
		height: 24px;
		padding: 0 var(--spacing-md);
		font-size: var(--font-size-sm);
	}

	.size-lg {
		height: 28px;
		padding: 0 var(--spacing-lg);
		font-size: var(--font-size-base);
	}

	/* Variant styles */
	.variant-default {
		background-color: var(--color-secondary);
		color: var(--color-secondary-foreground);
	}

	.variant-primary {
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
	}

	.variant-secondary {
		background-color: var(--color-muted);
		color: var(--color-foreground);
	}

	.variant-success {
		background-color: var(--color-success);
		color: var(--color-success-foreground);
	}

	.variant-warning {
		background-color: var(--color-warning);
		color: var(--color-warning-foreground);
	}

	.variant-error {
		background-color: var(--color-error);
		color: var(--color-error-foreground);
	}

	.variant-outline {
		background-color: transparent;
		color: var(--color-foreground);
		border-color: var(--color-border);
	}

	/* Dot indicator */
	.dot {
		width: 6px;
		height: 6px;
		border-radius: var(--radius-full);
		background-color: currentColor;
	}
</style>
