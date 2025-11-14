<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface CheckboxProps extends Omit<HTMLInputAttributes, 'size' | 'type'> {
		size?: 'sm' | 'md' | 'lg';
		error?: boolean;
	}

	let {
		size = 'md',
		error = false,
		disabled = false,
		class: className = '',
		...restProps
	}: CheckboxProps = $props();

	const classes = ['checkbox', `size-${size}`, error && 'error', disabled && 'disabled', className]
		.filter(Boolean)
		.join(' ');
</script>

<input type="checkbox" class={classes} {disabled} {...restProps} />

<style>
	.checkbox {
		appearance: none;
		cursor: pointer;
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-input);
		background-color: var(--color-background);
		transition: all var(--transition-normal);
		outline: none;
		position: relative;
		flex-shrink: 0;
	}

	.checkbox:hover:not(:disabled) {
		border-color: var(--color-primary);
	}

	.checkbox:focus {
		border-color: var(--color-ring);
		box-shadow: 0 0 0 1px var(--color-ring);
	}

	.checkbox:checked {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
	}

	.checkbox:checked::after {
		content: '';
		position: absolute;
		display: block;
		border: solid var(--color-primary-foreground);
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	.checkbox.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	.checkbox.error {
		border-color: var(--color-error);
	}

	.checkbox.error:focus {
		border-color: var(--color-error);
		box-shadow: 0 0 0 1px var(--color-error);
	}

	/* Size variants */
	.size-sm {
		width: 16px;
		height: 16px;
	}

	.size-sm:checked::after {
		left: 4px;
		top: 1px;
		width: 4px;
		height: 8px;
	}

	.size-md {
		width: 20px;
		height: 20px;
	}

	.size-md:checked::after {
		left: 6px;
		top: 2px;
		width: 5px;
		height: 10px;
	}

	.size-lg {
		width: 24px;
		height: 24px;
	}

	.size-lg:checked::after {
		left: 7px;
		top: 2px;
		width: 6px;
		height: 12px;
	}
</style>
