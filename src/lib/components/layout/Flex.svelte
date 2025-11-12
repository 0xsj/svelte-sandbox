<!-- src/lib/components/layout/Flex.svelte -->
<script lang="ts">
	type SpacingValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
	type DirectionValue = 'row' | 'row-reverse' | 'column' | 'column-reverse';
	type AlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
	type JustifyValue =
		| 'start'
		| 'center'
		| 'end'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';
	type WrapValue = 'nowrap' | 'wrap' | 'wrap-reverse';

	export let direction: DirectionValue = 'row';
	export let align: AlignValue | undefined = undefined;
	export let justify: JustifyValue | undefined = undefined;
	export let wrap: WrapValue = 'nowrap';
	export let gap: SpacingValue = 'md';
	export let flex = false;
	export let inline = false;
	export let as: string = 'div';

	let className = '';
	export { className as class };

	$: classes = [
		inline ? 'inline-flex' : 'flex',
		`direction-${direction}`,
		align && `align-${align}`,
		justify && `justify-${justify}`,
		`wrap-${wrap}`,
		gap && `gap-${gap}`,
		flex && 'flex-grow',
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<svelte:element this={as} class={classes} {...$$restProps}>
	<slot />
</svelte:element>

<style>
	.flex {
		display: flex;
	}

	.inline-flex {
		display: inline-flex;
	}

	/* Direction */
	.direction-row {
		flex-direction: row;
	}
	.direction-row-reverse {
		flex-direction: row-reverse;
	}
	.direction-column {
		flex-direction: column;
	}
	.direction-column-reverse {
		flex-direction: column-reverse;
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
	.wrap-nowrap {
		flex-wrap: nowrap;
	}
	.wrap-wrap {
		flex-wrap: wrap;
	}
	.wrap-wrap-reverse {
		flex-wrap: wrap-reverse;
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

	/* Flex grow */
	.flex-grow {
		flex: 1;
	}
</style>
