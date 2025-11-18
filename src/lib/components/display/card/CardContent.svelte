<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="content {className}" {...$$restProps}>
	<slot />
</div>

<style>
	.content {
		padding: 0 var(--spacing-xl);
		padding-bottom: var(--spacing-xl);
	}
</style>
