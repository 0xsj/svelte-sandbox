<script lang="ts">
	export let separator: string = '/';
	let className = '';
	export { className as class };

	$: classes = ['breadcrumbs', className].filter(Boolean).join(' ');
</script>

<nav class={classes} aria-label="Breadcrumb" {...$$restProps}>
	<ol class="breadcrumbs-list">
		<slot {separator} />
	</ol>
</nav>

<style>
	.breadcrumbs {
		display: flex;
		align-items: center;
	}

	.breadcrumbs-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
