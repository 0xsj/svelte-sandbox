<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="list {className}" {...$$restProps}>
	<slot />
</div>

<style>
	.list {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-xs);
		background-color: var(--color-muted);
		border-radius: var(--radius-md);
	}
</style>
