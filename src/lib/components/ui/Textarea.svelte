<script lang="ts">
	import { onMount } from 'svelte';

	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let error = false;
	export let disabled = false;
	export let autoResize = false;
	export let value: string | undefined = undefined;

	let className = '';
	export { className as class };

	let textareaElement: HTMLTextAreaElement;

	function handleResize() {
		if (autoResize && textareaElement) {
			textareaElement.style.height = 'auto';
			textareaElement.style.height = `${textareaElement.scrollHeight}px`;
		}
	}

	function handleInput() {
		handleResize();
	}

	onMount(() => {
		handleResize();
	});

	$: classes = [
		'textarea',
		`size-${size}`,
		error && 'error',
		disabled && 'disabled',
		autoResize && 'autoResize',
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<textarea
	bind:this={textareaElement}
	bind:value
	class={classes}
	{disabled}
	on:input={handleInput}
	{...$$restProps}
></textarea>

<style>
	.textarea {
		width: 100%;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-input);
		background-color: var(--color-background);
		color: var(--color-foreground);
		font-family: var(--font-family-sans);
		transition: all var(--transition-normal);
		outline: none;
		resize: vertical;
	}

	.textarea::placeholder {
		color: var(--color-muted-foreground);
	}

	.textarea:focus {
		border-color: var(--color-ring);
		box-shadow: 0 0 0 1px var(--color-ring);
	}

	.textarea:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Size variants */
	.size-sm {
		min-height: 80px;
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: var(--font-size-sm);
	}

	.size-md {
		min-height: 100px;
		padding: var(--spacing-md) var(--spacing-lg);
		font-size: var(--font-size-base);
	}

	.size-lg {
		min-height: 120px;
		padding: var(--spacing-lg) var(--spacing-xl);
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

	/* Auto-resize */
	.autoResize {
		resize: none;
		overflow: hidden;
	}
</style>
