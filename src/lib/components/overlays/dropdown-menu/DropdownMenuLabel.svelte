<script lang="ts">
	let className = '';
	export { className as class };

	$: classes = ['dropdown-label', className].filter(Boolean).join(' ');
</script>

<div class={classes} {...$$restProps}>
	<slot />
</div>

<style>
	.dropdown-label {
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		color: var(--color-muted-foreground);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
</style>
