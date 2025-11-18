<script lang="ts">
	let className = '';
	export { className as class };

	$: classes = ['table-body', className].filter(Boolean).join(' ');
</script>

<tbody class={classes} {...$$restProps}>
	<slot />
</tbody>

<style>
	.table-body {
		/* Body styles */
	}

	.table-body :global(tr:last-child) {
		border-bottom: none;
	}
</style>
