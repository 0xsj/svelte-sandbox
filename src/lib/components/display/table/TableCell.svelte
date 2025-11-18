<script lang="ts">
	let className = '';
	export { className as class };

	$: classes = ['table-cell', className].filter(Boolean).join(' ');
</script>

<td class={classes} {...$$restProps}>
	<slot />
</td>

<style>
	.table-cell {
		padding: var(--spacing-md) var(--spacing-lg);
		vertical-align: middle;
		color: var(--color-foreground);
	}

	.table-cell[align='center'] {
		text-align: center;
	}

	.table-cell[align='right'] {
		text-align: right;
	}
</style>
