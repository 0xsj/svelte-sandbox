<script lang="ts">
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';
	export let decorative = true;
	export let spacing: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

	let className = '';
	export { className as class };

	$: classes = ['separator', orientation, spacing !== 'none' && `spacing-${spacing}`, className]
		.filter(Boolean)
		.join(' ');
</script>

<div
	role={decorative ? 'none' : 'separator'}
	aria-orientation={decorative ? undefined : orientation}
	class={classes}
	{...$$restProps}
></div>

<style>
	.separator {
		flex-shrink: 0;
		background-color: var(--color-border);
	}

	/* Orientation */
	.horizontal {
		width: 100%;
		height: 1px;
	}

	.vertical {
		width: 1px;
		height: 100%;
	}

	/* Spacing variants for horizontal */
	.horizontal.spacing-xs {
		margin-top: var(--spacing-xs);
		margin-bottom: var(--spacing-xs);
	}

	.horizontal.spacing-sm {
		margin-top: var(--spacing-sm);
		margin-bottom: var(--spacing-sm);
	}

	.horizontal.spacing-md {
		margin-top: var(--spacing-md);
		margin-bottom: var(--spacing-md);
	}

	.horizontal.spacing-lg {
		margin-top: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);
	}

	.horizontal.spacing-xl {
		margin-top: var(--spacing-xl);
		margin-bottom: var(--spacing-xl);
	}

	/* Spacing variants for vertical */
	.vertical.spacing-xs {
		margin-left: var(--spacing-xs);
		margin-right: var(--spacing-xs);
	}

	.vertical.spacing-sm {
		margin-left: var(--spacing-sm);
		margin-right: var(--spacing-sm);
	}

	.vertical.spacing-md {
		margin-left: var(--spacing-md);
		margin-right: var(--spacing-md);
	}

	.vertical.spacing-lg {
		margin-left: var(--spacing-lg);
		margin-right: var(--spacing-lg);
	}

	.vertical.spacing-xl {
		margin-left: var(--spacing-xl);
		margin-right: var(--spacing-xl);
	}
</style>
