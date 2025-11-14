<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="footer {className}" {...$$restProps}>
	<slot />
</div>

<style>
	.footer {
		display: flex;
		align-items: center;
		padding: var(--spacing-xl);
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--color-border);
	}
</style>
