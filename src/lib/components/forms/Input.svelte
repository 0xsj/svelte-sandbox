<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface InputProps extends Omit<HTMLInputAttributes, 'size'> {
		size?: 'sm' | 'md' | 'lg';
		variant?: 'default' | 'error';
		error?: boolean;
	}

	let {
		size = 'md',
		variant = 'default',
		error = false,
		disabled = false,
		type = 'text',
		class: className = '',
		...restProps
	}: InputProps = $props();

	const inputVariant = error ? 'error' : variant;

	const classes = [
		'input',
		`size-${size}`,
		`variant-${inputVariant}`,
		disabled && 'disabled',
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<input {type} class={classes} {disabled} {...restProps} />

<style>
	.input {
		width: 100%;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-input);
		background-color: var(--color-background);
		color: var(--color-foreground);
		font-family: var(--font-family-sans);
		transition: all var(--transition-normal);
		outline: none;
	}

	.input::placeholder {
		color: var(--color-muted-foreground);
	}

	.input:focus {
		border-color: var(--color-ring);
		box-shadow: 0 0 0 1px var(--color-ring);
	}

	.input.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Size variants */
	.size-sm {
		height: 36px;
		padding: 0 var(--spacing-md);
		font-size: var(--font-size-sm);
	}

	.size-md {
		height: 40px;
		padding: 0 var(--spacing-lg);
		font-size: var(--font-size-base);
	}

	.size-lg {
		height: 44px;
		padding: 0 var(--spacing-xl);
		font-size: var(--font-size-lg);
	}

	/* Variant styles */
	.variant-error {
		border-color: var(--color-error);
	}

	.variant-error:focus {
		border-color: var(--color-error);
		box-shadow: 0 0 0 1px var(--color-error);
	}
</style>
