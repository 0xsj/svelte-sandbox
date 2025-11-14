<script lang="ts">
	export let variant: 'default' | 'outline' | 'ghost' = 'default';
	export let interactive = false;

	let className = '';
	export { className as class };

	$: classes = ['card', `variant-${variant}`, interactive && 'interactive', className]
		.filter(Boolean)
		.join(' ');
</script>

<div class={classes} {...$$restProps}>
	<slot />
</div>

<style>
	.card {
		border-radius: var(--radius-lg);
		transition: all var(--transition-normal);
	}

	/* Variant styles */
	.variant-default {
		background-color: var(--color-background);
		border: 1px solid var(--color-border);
		box-shadow: var(--shadow-sm);
	}

	.variant-outline {
		background-color: var(--color-background);
		border: 1px solid var(--color-border);
	}

	.variant-ghost {
		background-color: transparent;
	}

	/* Interactive state */
	.interactive {
		cursor: pointer;
	}

	.interactive:hover {
		box-shadow: var(--shadow-md);
		border-color: var(--color-primary);
	}
</style>
