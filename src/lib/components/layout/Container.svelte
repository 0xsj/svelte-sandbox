<!-- src/lib/components/layout/Container.svelte -->
<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'lg';
	export let noPadding = false;
	export let as: string = 'div';

	let className = '';
	export { className as class };
</script>

<svelte:element this={as} class="container {size} {noPadding ? 'no-padding' : ''} {className}">
	<slot />
</svelte:element>

<style>
	.container {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		padding-left: var(--spacing-lg);
		padding-right: var(--spacing-lg);
	}

	/* Size variants */
	.sm {
		max-width: 640px;
	}

	.md {
		max-width: 768px;
	}

	.lg {
		max-width: 1024px;
	}

	.xl {
		max-width: 1280px;
	}

	.full {
		max-width: 100%;
	}

	/* No padding variant */
	.no-padding {
		padding-left: 0;
		padding-right: 0;
	}

	/* Responsive padding adjustments */
	@media (min-width: 640px) {
		.container {
			padding-left: var(--spacing-xl);
			padding-right: var(--spacing-xl);
		}
	}

	@media (min-width: 1024px) {
		.container {
			padding-left: var(--spacing-2xl);
			padding-right: var(--spacing-2xl);
		}
	}
</style>
