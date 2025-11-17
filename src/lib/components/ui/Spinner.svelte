<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let variant: 'primary' | 'secondary' | 'white' = 'primary';
	let className = '';
	export { className as class };

	$: classes = ['spinner', `size-${size}`, `variant-${variant}`, className]
		.filter(Boolean)
		.join(' ');
</script>

<div class={classes} role="status" aria-label="Loading" {...$$restProps}>
	<svg class="spinner-svg" viewBox="0 0 50 50">
		<circle class="spinner-circle" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
	</svg>
	<span class="sr-only">Loading...</span>
</div>

<style>
	.spinner {
		display: inline-block;
		position: relative;
	}

	/* Size variants */
	.size-sm {
		width: 16px;
		height: 16px;
	}

	.size-md {
		width: 24px;
		height: 24px;
	}

	.size-lg {
		width: 32px;
		height: 32px;
	}

	.size-xl {
		width: 48px;
		height: 48px;
	}

	/* SVG */
	.spinner-svg {
		width: 100%;
		height: 100%;
		animation: rotate 2s linear infinite;
	}

	.spinner-circle {
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}

	/* Variant colors */
	.variant-primary .spinner-circle {
		stroke: var(--color-primary);
	}

	.variant-secondary .spinner-circle {
		stroke: var(--color-muted-foreground);
	}

	.variant-white .spinner-circle {
		stroke: white;
	}

	/* Animations */
	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}

	/* Screen reader only */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
