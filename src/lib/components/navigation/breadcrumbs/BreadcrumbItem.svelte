<script lang="ts">
	export let href: string | undefined = undefined;
	export let current: boolean = false;
	export let separator: string = '/';
	let className = '';
	export { className as class };

	$: classes = ['breadcrumb-item', current && 'current', className].filter(Boolean).join(' ');
</script>

<li class={classes} {...$$restProps}>
	{#if href && !current}
		<a class="breadcrumb-link" {href}>
			<slot />
		</a>
	{:else}
		<span class="breadcrumb-text">
			<slot />
		</span>
	{/if}
	{#if !current}
		<span class="breadcrumb-separator" aria-hidden="true">{separator}</span>
	{/if}
</li>

<style>
	.breadcrumb-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-size: var(--font-size-sm);
	}

	.breadcrumb-link {
		color: var(--color-muted-foreground);
		text-decoration: none;
		transition: color var(--transition-normal);
	}

	.breadcrumb-link:hover {
		color: var(--color-foreground);
		text-decoration: underline;
	}

	.breadcrumb-text {
		color: var(--color-foreground);
		font-weight: var(--font-weight-medium);
	}

	.breadcrumb-separator {
		color: var(--color-muted-foreground);
		user-select: none;
	}

	.current .breadcrumb-separator {
		display: none;
	}
</style>
