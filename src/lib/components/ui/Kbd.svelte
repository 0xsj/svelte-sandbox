<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
	let className = '';
	export { className as class };

	$: classes = ['kbd', `size-${size}`, className].filter(Boolean).join(' ');
</script>

<kbd class={classes} {...$$restProps}>
	<slot />
</kbd>

<style>
	.kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-family-mono);
		font-weight: var(--font-weight-medium);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background-color: var(--color-muted);
		color: var(--color-foreground);
		box-shadow:
			0 1px 0 0 var(--color-border),
			0 1px 2px 0 rgba(0, 0, 0, 0.05);
		white-space: nowrap;
		line-height: 1;
	}

	/* Size variants */
	.size-sm {
		min-width: 20px;
		height: 20px;
		padding: 0 var(--spacing-xs);
		font-size: var(--font-size-xs);
	}

	.size-md {
		min-width: 24px;
		height: 24px;
		padding: 0 var(--spacing-sm);
		font-size: var(--font-size-sm);
	}

	.size-lg {
		min-width: 28px;
		height: 28px;
		padding: 0 var(--spacing-md);
		font-size: var(--font-size-base);
	}
</style>
