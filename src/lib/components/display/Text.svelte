<script lang="ts">
	export let as: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' = 'p';
	export let size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' = 'base';
	export let weight: 'normal' | 'medium' | 'semibold' | 'bold' = 'normal';
	export let variant: 'default' | 'muted' | 'error' | 'success' | 'warning' = 'default';
	export let align: 'left' | 'center' | 'right' | undefined = undefined;

	let className = '';
	export { className as class };

	$: classes = [
		'text',
		`size-${size}`,
		`weight-${weight}`,
		`variant-${variant}`,
		align && `align-${align}`,
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<svelte:element this={as} class={classes} {...$$restProps}>
	<slot />
</svelte:element>

<style>
	.text {
		margin: 0;
		font-family: var(--font-family-sans);
		color: inherit;
	}

	/* Size variants */
	.size-xs {
		font-size: var(--font-size-xs);
	}

	.size-sm {
		font-size: var(--font-size-sm);
	}

	.size-base {
		font-size: var(--font-size-base);
	}

	.size-lg {
		font-size: var(--font-size-lg);
	}

	.size-xl {
		font-size: var(--font-size-xl);
	}

	.size-2xl {
		font-size: var(--font-size-2xl);
	}

	.size-3xl {
		font-size: var(--font-size-3xl);
	}

	.size-4xl {
		font-size: var(--font-size-4xl);
	}

	.size-5xl {
		font-size: var(--font-size-5xl);
	}

	/* Weight variants */
	.weight-normal {
		font-weight: var(--font-weight-normal);
	}

	.weight-medium {
		font-weight: var(--font-weight-medium);
	}

	.weight-semibold {
		font-weight: var(--font-weight-semibold);
	}

	.weight-bold {
		font-weight: var(--font-weight-bold);
	}

	/* Color variants */
	.variant-default {
		color: var(--color-foreground);
	}

	.variant-muted {
		color: var(--color-muted-foreground);
	}

	.variant-error {
		color: var(--color-error);
	}

	.variant-success {
		color: var(--color-success);
	}

	.variant-warning {
		color: var(--color-warning);
	}

	/* Alignment */
	.align-left {
		text-align: left;
	}

	.align-center {
		text-align: center;
	}

	.align-right {
		text-align: right;
	}
</style>
