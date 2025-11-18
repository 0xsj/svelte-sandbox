<script lang="ts">
	let className = '';
	export { className as class };

	$: classes = ['table-caption', className].filter(Boolean).join(' ');
</script>

<caption class={classes} {...$$restProps}>
	<slot />
</caption>

<style>
	.table-caption {
		margin-top: var(--spacing-md);
		font-size: var(--font-size-sm);
		color: var(--color-muted-foreground);
		text-align: center;
	}
</style>
