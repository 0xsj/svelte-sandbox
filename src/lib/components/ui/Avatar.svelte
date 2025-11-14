<script lang="ts">
	export let src: string | undefined = undefined;
	export let alt: string = '';
	export let fallback: string = '';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

	let className = '';
	export { className as class };

	let imageError = false;

	function handleError() {
		imageError = true;
	}

	$: showFallback = !src || imageError;
	$: classes = ['avatar', `size-${size}`, className].filter(Boolean).join(' ');
</script>

<div class={classes} {...$$restProps}>
	{#if !showFallback}
		<img {src} {alt} on:error={handleError} />
	{:else}
		<span class="fallback">{fallback}</span>
	{/if}
</div>

<style>
	.avatar {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: var(--radius-full);
		background-color: var(--color-muted);
		color: var(--color-foreground);
		font-weight: var(--font-weight-medium);
		flex-shrink: 0;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		text-transform: uppercase;
	}

	/* Size variants */
	.size-sm {
		width: 32px;
		height: 32px;
		font-size: var(--font-size-xs);
	}

	.size-md {
		width: 40px;
		height: 40px;
		font-size: var(--font-size-sm);
	}

	.size-lg {
		width: 48px;
		height: 48px;
		font-size: var(--font-size-base);
	}

	.size-xl {
		width: 64px;
		height: 64px;
		font-size: var(--font-size-lg);
	}
</style>
