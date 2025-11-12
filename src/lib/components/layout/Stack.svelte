<!-- src/lib/components/layout/Stack.svelte -->
<script lang="ts">
	type SpacingValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
	type AlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
	type JustifyValue =
		| 'start'
		| 'center'
		| 'end'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';

	export let direction: 'vertical' | 'horizontal' = 'vertical';
	export let gap: SpacingValue = 'md';
	export let align: AlignValue | undefined = undefined;
	export let justify: JustifyValue | undefined = undefined;
	export let wrap = false;
	export let as: string = 'div';

	let className = '';
	export { className as class };

	$: classes = [
		'stack',
		direction,
		`gap-${gap}`,
		align && `align-${align}`,
		justify && `justify-${justify}`,
		wrap && 'wrap',
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<svelte:element this={as} class={classes} {...$$restProps}>
	<slot />
</svelte:element>

<style>
	.stack {
		display: flex;
	}

	/* Direction */
	.vertical {
		flex-direction: column;
	}

	.horizontal {
		flex-direction: row;
	}

	/* Gap */
	.gap-xs {
		gap: var(--spacing-xs);
	}
	.gap-sm {
		gap: var(--spacing-sm);
	}
	.gap-md {
		gap: var(--spacing-md);
	}
	.gap-lg {
		gap: var(--spacing-lg);
	}
	.gap-xl {
		gap: var(--spacing-xl);
	}
	.gap-2xl {
		gap: var(--spacing-2xl);
	}
	.gap-3xl {
		gap: var(--spacing-3xl);
	}
	.gap-4xl {
		gap: var(--spacing-4xl);
	}

	/* Align */
	.align-start {
		align-items: flex-start;
	}
	.align-center {
		align-items: center;
	}
	.align-end {
		align-items: flex-end;
	}
	.align-stretch {
		align-items: stretch;
	}
	.align-baseline {
		align-items: baseline;
	}

	/* Justify */
	.justify-start {
		justify-content: flex-start;
	}
	.justify-center {
		justify-content: center;
	}
	.justify-end {
		justify-content: flex-end;
	}
	.justify-space-between {
		justify-content: space-between;
	}
	.justify-space-around {
		justify-content: space-around;
	}
	.justify-space-evenly {
		justify-content: space-evenly;
	}

	/* Wrap */
	.wrap {
		flex-wrap: wrap;
	}
</style>
