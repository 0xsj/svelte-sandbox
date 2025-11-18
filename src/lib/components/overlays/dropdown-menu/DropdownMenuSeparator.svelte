<script lang="ts">
	let className = '';
	export { className as class };

	$: classes = ['dropdown-separator', className].filter(Boolean).join(' ');
</script>

<div class={classes} role="separator" {...$$restProps}></div>

<style>
	.dropdown-separator {
		height: 1px;
		margin: var(--spacing-xs) 0;
		background-color: var(--color-border);
	}
</style>
