<script lang="ts">
	export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h5';

	let className = '';
	export { className as class };
</script>

<svelte:element this={as} class="title {className}" {...$$restProps}>
	<slot />
</svelte:element>

<style>
	.title {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		margin: 0;
		line-height: 1.4;
	}
</style>
