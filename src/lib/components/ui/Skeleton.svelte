<script lang="ts">
	export let variant: 'text' | 'circular' | 'rectangular' = 'rectangular';
	export let width: string | undefined = undefined;
	export let height: string | undefined = undefined;
	export let lines: number = 1;
	let className = '';
	export { className as class };

	$: classes = ['skeleton', `variant-${variant}`, className].filter(Boolean).join(' ');
	$: style = [width ? `width: ${width}` : '', height ? `height: ${height}` : '']
		.filter(Boolean)
		.join('; ');
</script>

{#if variant === 'text' && lines > 1}
	<div class="skeleton-lines" {...$$restProps}>
		{#each Array(lines) as _, i}
			<div class={classes} style={i === lines - 1 ? `${style}; width: 80%` : style}></div>
		{/each}
	</div>
{:else}
	<div class={classes} {style} {...$$restProps}></div>
{/if}

<style>
	.skeleton {
		background: linear-gradient(
			90deg,
			var(--color-muted) 0%,
			var(--color-muted-foreground) 50%,
			var(--color-muted) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s ease-in-out infinite;
		opacity: 0.7;
	}

	/* Variant styles */
	.variant-text {
		height: 1em;
		border-radius: var(--radius-sm);
		margin-bottom: var(--spacing-xs);
	}

	.variant-circular {
		border-radius: var(--radius-full);
		width: 40px;
		height: 40px;
	}

	.variant-rectangular {
		border-radius: var(--radius-md);
		width: 100%;
		height: 100px;
	}

	/* Multiple lines container */
	.skeleton-lines {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		width: 100%;
	}

	/* Shimmer animation */
	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}
</style>
