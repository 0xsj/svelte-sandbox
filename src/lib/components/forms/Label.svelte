<script lang="ts">
	export let htmlFor: string | undefined = undefined;
	export let size: 'xs' | 'sm' | 'base' = 'sm';
	export let weight: 'normal' | 'medium' | 'semibold' | 'bold' = 'medium';
	export let required = false;
	export let disabled = false;

	let className = '';
	export { className as class };

	$: classes = ['label', `size-${size}`, `weight-${weight}`, disabled && 'disabled', className]
		.filter(Boolean)
		.join(' ');
</script>

<label for={htmlFor} class={classes} {...$$restProps}>
	<slot />
	{#if required}
		<span class="required" aria-label="required">*</span>
	{/if}
</label>

<style>
	.label {
		display: inline-block;
		margin: 0;
		font-family: var(--font-family-sans);
		color: var(--color-foreground);
		cursor: pointer;
		user-select: none;
	}

	.label.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Size variants */
	.size-xs {
		font-size: var(--font-size-xs);
	}

	.size-sm {
		font-size: var(--font-size-sm);
	}

	.size-base {
		font-size: var(--font-size-base);
	}

	/* Weight variants */
	.weight-normal {
		font-weight: var(--font-weight-normal);
	}

	.weight-medium {
		font-weight: var(--font-weight-medium);
	}

	.weight-semibold {
		font-weight: var(--font-weight-semibold);
	}

	.weight-bold {
		font-weight: var(--font-weight-bold);
	}

	/* Required indicator */
	.required {
		color: var(--color-error);
		margin-left: var(--spacing-xs);
	}
</style>
