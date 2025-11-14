<script lang="ts">
	export let as: string = 'div';

	let className = '';
	export { className as class };
</script>

<svelte:element this={as} class="footer {className}" {...$$restProps}>
	<slot />
</svelte:element>

<style>
	.footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--spacing-md);
		padding: var(--spacing-xl);
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--color-border);
	}
</style>
