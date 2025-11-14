<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="header {className}" {...$$restProps}>
	<slot />
</div>

<style>
	.header {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		padding: var(--spacing-xl);
		padding-bottom: var(--spacing-lg);
	}
</style>
