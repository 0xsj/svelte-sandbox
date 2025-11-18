<script lang="ts">
	export let as: string = 'div';

	let className = '';
	export { className as class };
</script>

<svelte:element this={as} class="header {className}" {...$$restProps}>
	<slot />
</svelte:element>

<style>
	.header {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		padding: var(--spacing-xl);
		padding-bottom: var(--spacing-lg);
	}
</style>
