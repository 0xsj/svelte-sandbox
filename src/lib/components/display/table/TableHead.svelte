<script lang="ts">
	let className = '';
	export { className as class };

	$: classes = ['table-head', className].filter(Boolean).join(' ');
</script>

<th class={classes} {...$$restProps}>
	<slot />
</th>

<style>
	.table-head {
		height: 48px;
		padding: var(--spacing-md) var(--spacing-lg);
		text-align: left;
		font-weight: var(--font-weight-semibold);
		color: var(--color-muted-foreground);
		vertical-align: middle;
		white-space: nowrap;
	}

	.table-head[align='center'] {
		text-align: center;
	}

	.table-head[align='right'] {
		text-align: right;
	}
</style>
