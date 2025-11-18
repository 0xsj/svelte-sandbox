<script lang="ts">
	export let pressed: boolean = false;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let variant: 'default' | 'outline' = 'default';
	export let disabled: boolean = false;
	let className = '';
	export { className as class };

	function handleClick() {
		if (!disabled) {
			pressed = !pressed;
		}
	}

	$: classes = [
		'toggle',
		`size-${size}`,
		`variant-${variant}`,
		pressed && 'pressed',
		disabled && 'disabled',
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<button
	type="button"
	role="switch"
	aria-checked={pressed}
	aria-pressed={pressed}
	class={classes}
	{disabled}
	on:click={handleClick}
	{...$$restProps}
>
	<slot />
</button>

<style>
	.toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md);
		font-weight: var(--font-weight-medium);
		transition: all var(--transition-normal);
		cursor: pointer;
		border: 1px solid transparent;
		background-color: transparent;
		color: var(--color-foreground);
	}

	.toggle:hover:not(:disabled) {
		background-color: var(--color-muted);
	}

	.toggle:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	.toggle.disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	/* Size variants */
	.size-sm {
		height: 32px;
		padding: 0 var(--spacing-sm);
		font-size: var(--font-size-sm);
	}

	.size-md {
		height: 36px;
		padding: 0 var(--spacing-md);
		font-size: var(--font-size-base);
	}

	.size-lg {
		height: 40px;
		padding: 0 var(--spacing-lg);
		font-size: var(--font-size-lg);
	}

	/* Variant: default */
	.variant-default.pressed {
		background-color: var(--color-accent);
		color: var(--color-accent-foreground);
	}

	/* Variant: outline */
	.variant-outline {
		border-color: var(--color-border);
	}

	.variant-outline.pressed {
		background-color: var(--color-accent);
		border-color: var(--color-accent);
		color: var(--color-accent-foreground);
	}
</style>
