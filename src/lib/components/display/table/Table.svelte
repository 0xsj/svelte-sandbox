<script lang="ts">
	let className = '';
	export { className as class };

	$: classes = ['table-wrapper', className].filter(Boolean).join(' ');
</script>

<div class={classes} {...$$restProps}>
	<table class="table">
		<slot />
	</table>
</div>

<style>
	.table-wrapper {
		width: 100%;
		overflow-x: auto;
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
	}

	.table {
		width: 100%;
		border-collapse: collapse;
		caption-side: bottom;
		font-size: var(--font-size-sm);
		background-color: var(--color-background);
	}
</style>
