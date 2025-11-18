<script lang="ts">
	let className = '';
	export { className as class };

	$: classes = ['table-row', className].filter(Boolean).join(' ');
</script>

<tr class={classes} {...$$restProps}>
	<slot />
</tr>

<style>
	.table-row {
		border-bottom: 1px solid var(--color-border);
		transition: background-color var(--transition-normal);
	}

	.table-row:hover {
		background-color: var(--color-muted);
	}

	/* Remove hover effect for header rows */
	:global(thead) .table-row:hover {
		background-color: transparent;
	}
</style>
