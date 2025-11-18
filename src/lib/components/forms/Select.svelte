<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let error = false;
	export let disabled = false;
	export let value: string | undefined = undefined;

	let className = '';
	export { className as class };

	$: classes = ['select', `size-${size}`, error && 'error', className].filter(Boolean).join(' ');
</script>

<div class="wrapper">
	<select bind:value class={classes} {disabled} {...$$restProps}>
		<slot />
	</select>
	<div class="icon">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	</div>
</div>

<style>
	.wrapper {
		position: relative;
		display: inline-block;
		width: 100%;
	}

	.select {
		width: 100%;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-input);
		background-color: var(--color-background);
		color: var(--color-foreground);
		font-family: var(--font-family-sans);
		transition: all var(--transition-normal);
		outline: none;
		appearance: none;
		cursor: pointer;
		padding-right: var(--spacing-3xl);
	}

	.select:focus {
		border-color: var(--color-ring);
		box-shadow: 0 0 0 1px var(--color-ring);
	}

	.select:disabled {
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

	/* Error state */
	.error {
		border-color: var(--color-error);
	}

	.error:focus {
		border-color: var(--color-error);
		box-shadow: 0 0 0 1px var(--color-error);
	}

	/* Icon */
	.icon {
		position: absolute;
		right: var(--spacing-lg);
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: var(--color-muted-foreground);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.select:disabled ~ .icon {
		opacity: 0.5;
	}
</style>
