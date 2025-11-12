<!-- src/lib/components/layout/Box.svelte -->
<script lang="ts">
	type SpacingValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
	type DisplayValue =
		| 'block'
		| 'inline-block'
		| 'flex'
		| 'inline-flex'
		| 'grid'
		| 'inline-grid'
		| 'none';
	type FlexValue = 1 | 'auto' | 'initial' | 'none';

	export let as: string = 'div';

	// Padding
	export let padding: SpacingValue | undefined = undefined;
	export let p: SpacingValue | undefined = undefined;
	export let paddingX: SpacingValue | undefined = undefined;
	export let px: SpacingValue | undefined = undefined;
	export let paddingY: SpacingValue | undefined = undefined;
	export let py: SpacingValue | undefined = undefined;
	export let paddingTop: SpacingValue | undefined = undefined;
	export let pt: SpacingValue | undefined = undefined;
	export let paddingRight: SpacingValue | undefined = undefined;
	export let pr: SpacingValue | undefined = undefined;
	export let paddingBottom: SpacingValue | undefined = undefined;
	export let pb: SpacingValue | undefined = undefined;
	export let paddingLeft: SpacingValue | undefined = undefined;
	export let pl: SpacingValue | undefined = undefined;

	// Margin
	export let margin: SpacingValue | undefined = undefined;
	export let m: SpacingValue | undefined = undefined;
	export let marginX: SpacingValue | undefined = undefined;
	export let mx: SpacingValue | undefined = undefined;
	export let marginY: SpacingValue | undefined = undefined;
	export let my: SpacingValue | undefined = undefined;
	export let marginTop: SpacingValue | undefined = undefined;
	export let mt: SpacingValue | undefined = undefined;
	export let marginRight: SpacingValue | undefined = undefined;
	export let mr: SpacingValue | undefined = undefined;
	export let marginBottom: SpacingValue | undefined = undefined;
	export let mb: SpacingValue | undefined = undefined;
	export let marginLeft: SpacingValue | undefined = undefined;
	export let ml: SpacingValue | undefined = undefined;

	// Display
	export let display: DisplayValue | undefined = undefined;

	// Flex
	export let flex: FlexValue | undefined = undefined;

	let className = '';
	export { className as class };

	$: classes = [
		'box',
		(padding || p) && `p-${padding || p}`,
		(paddingX || px) && `px-${paddingX || px}`,
		(paddingY || py) && `py-${paddingY || py}`,
		(paddingTop || pt) && `pt-${paddingTop || pt}`,
		(paddingRight || pr) && `pr-${paddingRight || pr}`,
		(paddingBottom || pb) && `pb-${paddingBottom || pb}`,
		(paddingLeft || pl) && `pl-${paddingLeft || pl}`,
		(margin || m) && `m-${margin || m}`,
		(marginX || mx) && `mx-${marginX || mx}`,
		(marginY || my) && `my-${marginY || my}`,
		(marginTop || mt) && `mt-${marginTop || mt}`,
		(marginRight || mr) && `mr-${marginRight || mr}`,
		(marginBottom || mb) && `mb-${marginBottom || mb}`,
		(marginLeft || ml) && `ml-${marginLeft || ml}`,
		display && `display-${display}`,
		flex === 1 && 'flex-1',
		flex === 'auto' && 'flex-auto',
		flex === 'initial' && 'flex-initial',
		flex === 'none' && 'flex-none',
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<svelte:element this={as} class={classes} {...$$restProps}>
	<slot />
</svelte:element>

<style>
	.box {
		box-sizing: border-box;
	}

	/* Padding - All sides */
	.p-xs {
		padding: var(--spacing-xs);
	}
	.p-sm {
		padding: var(--spacing-sm);
	}
	.p-md {
		padding: var(--spacing-md);
	}
	.p-lg {
		padding: var(--spacing-lg);
	}
	.p-xl {
		padding: var(--spacing-xl);
	}
	.p-2xl {
		padding: var(--spacing-2xl);
	}
	.p-3xl {
		padding: var(--spacing-3xl);
	}
	.p-4xl {
		padding: var(--spacing-4xl);
	}

	/* Padding - Horizontal */
	.px-xs {
		padding-left: var(--spacing-xs);
		padding-right: var(--spacing-xs);
	}
	.px-sm {
		padding-left: var(--spacing-sm);
		padding-right: var(--spacing-sm);
	}
	.px-md {
		padding-left: var(--spacing-md);
		padding-right: var(--spacing-md);
	}
	.px-lg {
		padding-left: var(--spacing-lg);
		padding-right: var(--spacing-lg);
	}
	.px-xl {
		padding-left: var(--spacing-xl);
		padding-right: var(--spacing-xl);
	}
	.px-2xl {
		padding-left: var(--spacing-2xl);
		padding-right: var(--spacing-2xl);
	}
	.px-3xl {
		padding-left: var(--spacing-3xl);
		padding-right: var(--spacing-3xl);
	}
	.px-4xl {
		padding-left: var(--spacing-4xl);
		padding-right: var(--spacing-4xl);
	}

	/* Padding - Vertical */
	.py-xs {
		padding-top: var(--spacing-xs);
		padding-bottom: var(--spacing-xs);
	}
	.py-sm {
		padding-top: var(--spacing-sm);
		padding-bottom: var(--spacing-sm);
	}
	.py-md {
		padding-top: var(--spacing-md);
		padding-bottom: var(--spacing-md);
	}
	.py-lg {
		padding-top: var(--spacing-lg);
		padding-bottom: var(--spacing-lg);
	}
	.py-xl {
		padding-top: var(--spacing-xl);
		padding-bottom: var(--spacing-xl);
	}
	.py-2xl {
		padding-top: var(--spacing-2xl);
		padding-bottom: var(--spacing-2xl);
	}
	.py-3xl {
		padding-top: var(--spacing-3xl);
		padding-bottom: var(--spacing-3xl);
	}
	.py-4xl {
		padding-top: var(--spacing-4xl);
		padding-bottom: var(--spacing-4xl);
	}

	/* Padding - Top */
	.pt-xs {
		padding-top: var(--spacing-xs);
	}
	.pt-sm {
		padding-top: var(--spacing-sm);
	}
	.pt-md {
		padding-top: var(--spacing-md);
	}
	.pt-lg {
		padding-top: var(--spacing-lg);
	}
	.pt-xl {
		padding-top: var(--spacing-xl);
	}
	.pt-2xl {
		padding-top: var(--spacing-2xl);
	}
	.pt-3xl {
		padding-top: var(--spacing-3xl);
	}
	.pt-4xl {
		padding-top: var(--spacing-4xl);
	}

	/* Padding - Right */
	.pr-xs {
		padding-right: var(--spacing-xs);
	}
	.pr-sm {
		padding-right: var(--spacing-sm);
	}
	.pr-md {
		padding-right: var(--spacing-md);
	}
	.pr-lg {
		padding-right: var(--spacing-lg);
	}
	.pr-xl {
		padding-right: var(--spacing-xl);
	}
	.pr-2xl {
		padding-right: var(--spacing-2xl);
	}
	.pr-3xl {
		padding-right: var(--spacing-3xl);
	}
	.pr-4xl {
		padding-right: var(--spacing-4xl);
	}

	/* Padding - Bottom */
	.pb-xs {
		padding-bottom: var(--spacing-xs);
	}
	.pb-sm {
		padding-bottom: var(--spacing-sm);
	}
	.pb-md {
		padding-bottom: var(--spacing-md);
	}
	.pb-lg {
		padding-bottom: var(--spacing-lg);
	}
	.pb-xl {
		padding-bottom: var(--spacing-xl);
	}
	.pb-2xl {
		padding-bottom: var(--spacing-2xl);
	}
	.pb-3xl {
		padding-bottom: var(--spacing-3xl);
	}
	.pb-4xl {
		padding-bottom: var(--spacing-4xl);
	}

	/* Padding - Left */
	.pl-xs {
		padding-left: var(--spacing-xs);
	}
	.pl-sm {
		padding-left: var(--spacing-sm);
	}
	.pl-md {
		padding-left: var(--spacing-md);
	}
	.pl-lg {
		padding-left: var(--spacing-lg);
	}
	.pl-xl {
		padding-left: var(--spacing-xl);
	}
	.pl-2xl {
		padding-left: var(--spacing-2xl);
	}
	.pl-3xl {
		padding-left: var(--spacing-3xl);
	}
	.pl-4xl {
		padding-left: var(--spacing-4xl);
	}

	/* Margin - All sides */
	.m-xs {
		margin: var(--spacing-xs);
	}
	.m-sm {
		margin: var(--spacing-sm);
	}
	.m-md {
		margin: var(--spacing-md);
	}
	.m-lg {
		margin: var(--spacing-lg);
	}
	.m-xl {
		margin: var(--spacing-xl);
	}
	.m-2xl {
		margin: var(--spacing-2xl);
	}
	.m-3xl {
		margin: var(--spacing-3xl);
	}
	.m-4xl {
		margin: var(--spacing-4xl);
	}

	/* Margin - Horizontal */
	.mx-xs {
		margin-left: var(--spacing-xs);
		margin-right: var(--spacing-xs);
	}
	.mx-sm {
		margin-left: var(--spacing-sm);
		margin-right: var(--spacing-sm);
	}
	.mx-md {
		margin-left: var(--spacing-md);
		margin-right: var(--spacing-md);
	}
	.mx-lg {
		margin-left: var(--spacing-lg);
		margin-right: var(--spacing-lg);
	}
	.mx-xl {
		margin-left: var(--spacing-xl);
		margin-right: var(--spacing-xl);
	}
	.mx-2xl {
		margin-left: var(--spacing-2xl);
		margin-right: var(--spacing-2xl);
	}
	.mx-3xl {
		margin-left: var(--spacing-3xl);
		margin-right: var(--spacing-3xl);
	}
	.mx-4xl {
		margin-left: var(--spacing-4xl);
		margin-right: var(--spacing-4xl);
	}

	/* Margin - Vertical */
	.my-xs {
		margin-top: var(--spacing-xs);
		margin-bottom: var(--spacing-xs);
	}
	.my-sm {
		margin-top: var(--spacing-sm);
		margin-bottom: var(--spacing-sm);
	}
	.my-md {
		margin-top: var(--spacing-md);
		margin-bottom: var(--spacing-md);
	}
	.my-lg {
		margin-top: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);
	}
	.my-xl {
		margin-top: var(--spacing-xl);
		margin-bottom: var(--spacing-xl);
	}
	.my-2xl {
		margin-top: var(--spacing-2xl);
		margin-bottom: var(--spacing-2xl);
	}
	.my-3xl {
		margin-top: var(--spacing-3xl);
		margin-bottom: var(--spacing-3xl);
	}
	.my-4xl {
		margin-top: var(--spacing-4xl);
		margin-bottom: var(--spacing-4xl);
	}

	/* Margin - Top */
	.mt-xs {
		margin-top: var(--spacing-xs);
	}
	.mt-sm {
		margin-top: var(--spacing-sm);
	}
	.mt-md {
		margin-top: var(--spacing-md);
	}
	.mt-lg {
		margin-top: var(--spacing-lg);
	}
	.mt-xl {
		margin-top: var(--spacing-xl);
	}
	.mt-2xl {
		margin-top: var(--spacing-2xl);
	}
	.mt-3xl {
		margin-top: var(--spacing-3xl);
	}
	.mt-4xl {
		margin-top: var(--spacing-4xl);
	}

	/* Margin - Right */
	.mr-xs {
		margin-right: var(--spacing-xs);
	}
	.mr-sm {
		margin-right: var(--spacing-sm);
	}
	.mr-md {
		margin-right: var(--spacing-md);
	}
	.mr-lg {
		margin-right: var(--spacing-lg);
	}
	.mr-xl {
		margin-right: var(--spacing-xl);
	}
	.mr-2xl {
		margin-right: var(--spacing-2xl);
	}
	.mr-3xl {
		margin-right: var(--spacing-3xl);
	}
	.mr-4xl {
		margin-right: var(--spacing-4xl);
	}

	/* Margin - Bottom */
	.mb-xs {
		margin-bottom: var(--spacing-xs);
	}
	.mb-sm {
		margin-bottom: var(--spacing-sm);
	}
	.mb-md {
		margin-bottom: var(--spacing-md);
	}
	.mb-lg {
		margin-bottom: var(--spacing-lg);
	}
	.mb-xl {
		margin-bottom: var(--spacing-xl);
	}
	.mb-2xl {
		margin-bottom: var(--spacing-2xl);
	}
	.mb-3xl {
		margin-bottom: var(--spacing-3xl);
	}
	.mb-4xl {
		margin-bottom: var(--spacing-4xl);
	}

	/* Margin - Left */
	.ml-xs {
		margin-left: var(--spacing-xs);
	}
	.ml-sm {
		margin-left: var(--spacing-sm);
	}
	.ml-md {
		margin-left: var(--spacing-md);
	}
	.ml-lg {
		margin-left: var(--spacing-lg);
	}
	.ml-xl {
		margin-left: var(--spacing-xl);
	}
	.ml-2xl {
		margin-left: var(--spacing-2xl);
	}
	.ml-3xl {
		margin-left: var(--spacing-3xl);
	}
	.ml-4xl {
		margin-left: var(--spacing-4xl);
	}

	/* Display */
	.display-block {
		display: block;
	}
	.display-inline-block {
		display: inline-block;
	}
	.display-flex {
		display: flex;
	}
	.display-inline-flex {
		display: inline-flex;
	}
	.display-grid {
		display: grid;
	}
	.display-inline-grid {
		display: inline-grid;
	}
	.display-none {
		display: none;
	}

	/* Flex property */
	.flex-1 {
		flex: 1;
	}
	.flex-auto {
		flex: auto;
	}
	.flex-initial {
		flex: initial;
	}
	.flex-none {
		flex: none;
	}
</style>
