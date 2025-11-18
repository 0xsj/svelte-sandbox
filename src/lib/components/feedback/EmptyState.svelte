<script lang="ts">
	export let title: string;
	export let description: string | undefined = undefined;
	export let icon: string | undefined = undefined;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	let className = '';
	export { className as class };

	$: classes = ['empty-state', `size-${size}`, className].filter(Boolean).join(' ');
</script>

<div class={classes} {...$$restProps}>
	{#if icon}
		<div class="empty-state-icon">
			{icon}
		</div>
	{:else if $$slots.icon}
		<div class="empty-state-icon">
			<slot name="icon" />
		</div>
	{/if}

	<div class="empty-state-content">
		<h3 class="empty-state-title">{title}</h3>
		{#if description}
			<p class="empty-state-description">{description}</p>
		{/if}
	</div>

	{#if $$slots.action}
		<div class="empty-state-action">
			<slot name="action" />
		</div>
	{/if}
</div>

<style>
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--spacing-2xl);
		width: 100%;
	}

	.empty-state-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--spacing-lg);
		color: var(--color-muted-foreground);
		font-size: 48px;
	}

	.empty-state-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		max-width: 500px;
	}

	.empty-state-title {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-foreground);
		margin: 0;
	}

	.empty-state-description {
		font-size: var(--font-size-base);
		color: var(--color-muted-foreground);
		margin: 0;
		line-height: 1.5;
	}

	.empty-state-action {
		margin-top: var(--spacing-lg);
	}

	/* Size variants */
	.size-sm {
		padding: var(--spacing-xl);
	}

	.size-sm .empty-state-icon {
		font-size: 32px;
		margin-bottom: var(--spacing-md);
	}

	.size-sm .empty-state-title {
		font-size: var(--font-size-lg);
	}

	.size-sm .empty-state-description {
		font-size: var(--font-size-sm);
	}

	.size-lg {
		padding: var(--spacing-4xl);
	}

	.size-lg .empty-state-icon {
		font-size: 64px;
		margin-bottom: var(--spacing-xl);
	}

	.size-lg .empty-state-title {
		font-size: var(--font-size-2xl);
	}

	.size-lg .empty-state-description {
		font-size: var(--font-size-lg);
	}
</style>
