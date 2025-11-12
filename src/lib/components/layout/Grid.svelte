<!-- src/lib/components/layout/Grid.svelte -->
<script lang="ts">
	type SpacingValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
	type ColumnsValue = 1 | 2 | 3 | 4 | 5 | 6 | 12;

	export let columns: ColumnsValue = 12;
	export let columnsMobile: ColumnsValue | undefined = undefined;
	export let columnsTablet: ColumnsValue | undefined = undefined;
	export let columnsDesktop: ColumnsValue | undefined = undefined;
	export let gap: SpacingValue = 'md';
	export let rowGap: SpacingValue | undefined = undefined;
	export let columnGap: SpacingValue | undefined = undefined;
	export let as: string = 'div';

	let className = '';
	export { className as class };

	$: classes = [
		'grid',
		`cols-${columns}`,
		columnsMobile && `cols-mobile-${columnsMobile}`,
		columnsTablet && `cols-tablet-${columnsTablet}`,
		columnsDesktop && `cols-desktop-${columnsDesktop}`,
		gap && `gap-${gap}`,
		rowGap && `row-gap-${rowGap}`,
		columnGap && `col-gap-${columnGap}`,
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<svelte:element this={as} class={classes} {...$$restProps}>
	<slot />
</svelte:element>

<style>
	.grid {
		display: grid;
	}

	/* Columns */
	.cols-1 {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
	.cols-2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.cols-3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	.cols-4 {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
	.cols-5 {
		grid-template-columns: repeat(5, minmax(0, 1fr));
	}
	.cols-6 {
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}
	.cols-12 {
		grid-template-columns: repeat(12, minmax(0, 1fr));
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

	/* Row Gap */
	.row-gap-xs {
		row-gap: var(--spacing-xs);
	}
	.row-gap-sm {
		row-gap: var(--spacing-sm);
	}
	.row-gap-md {
		row-gap: var(--spacing-md);
	}
	.row-gap-lg {
		row-gap: var(--spacing-lg);
	}
	.row-gap-xl {
		row-gap: var(--spacing-xl);
	}
	.row-gap-2xl {
		row-gap: var(--spacing-2xl);
	}
	.row-gap-3xl {
		row-gap: var(--spacing-3xl);
	}
	.row-gap-4xl {
		row-gap: var(--spacing-4xl);
	}

	/* Column Gap */
	.col-gap-xs {
		column-gap: var(--spacing-xs);
	}
	.col-gap-sm {
		column-gap: var(--spacing-sm);
	}
	.col-gap-md {
		column-gap: var(--spacing-md);
	}
	.col-gap-lg {
		column-gap: var(--spacing-lg);
	}
	.col-gap-xl {
		column-gap: var(--spacing-xl);
	}
	.col-gap-2xl {
		column-gap: var(--spacing-2xl);
	}
	.col-gap-3xl {
		column-gap: var(--spacing-3xl);
	}
	.col-gap-4xl {
		column-gap: var(--spacing-4xl);
	}

	/* Responsive Columns - Mobile (< 640px) */
	@media (max-width: 639px) {
		.cols-mobile-1 {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
		.cols-mobile-2 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.cols-mobile-3 {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
		.cols-mobile-4 {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
		.cols-mobile-5 {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
		.cols-mobile-6 {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
		.cols-mobile-12 {
			grid-template-columns: repeat(12, minmax(0, 1fr));
		}
	}

	/* Responsive Columns - Tablet (640px - 1023px) */
	@media (min-width: 640px) and (max-width: 1023px) {
		.cols-tablet-1 {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
		.cols-tablet-2 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.cols-tablet-3 {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
		.cols-tablet-4 {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
		.cols-tablet-5 {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
		.cols-tablet-6 {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
		.cols-tablet-12 {
			grid-template-columns: repeat(12, minmax(0, 1fr));
		}
	}

	/* Responsive Columns - Desktop (>= 1024px) */
	@media (min-width: 1024px) {
		.cols-desktop-1 {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
		.cols-desktop-2 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.cols-desktop-3 {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
		.cols-desktop-4 {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
		.cols-desktop-5 {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
		.cols-desktop-6 {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
		.cols-desktop-12 {
			grid-template-columns: repeat(12, minmax(0, 1fr));
		}
	}
</style>
