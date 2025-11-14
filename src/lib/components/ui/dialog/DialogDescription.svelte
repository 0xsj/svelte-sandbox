<script lang="ts">
	let className = '';
	export { className as class };
</script>

<p class="description {className}" {...$$restProps}>
	<slot />
</p>

<style>
	.description {
		font-size: var(--font-size-sm);
		color: var(--color-muted-foreground);
		margin: 0;
		line-height: 1.5;
	}
</style>
