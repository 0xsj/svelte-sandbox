<script lang="ts">
	let className = '';
	export { className as class };

	$: classes = ['table-header', className].filter(Boolean).join(' ');
</script>

<thead class={classes} {...$$restProps}>
	<slot />
</thead>

<style>
	.table-header {
		border-bottom: 1px solid var(--color-border);
		background-color: var(--color-muted);
	}
</style>
