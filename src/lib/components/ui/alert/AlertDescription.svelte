<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="description {className}" {...$$restProps}>
	<slot />
</div>

<style>
	.description {
		font-size: var(--font-size-sm);
		line-height: 1.5;
		opacity: 0.9;
	}
</style>
