<script lang="ts">
	import { getRadioGroupContext } from './RadioGroup.svelte';

	export let value: string;
	export let disabled: boolean | undefined = undefined;
	export let id: string | undefined = undefined;

	let className = '';
	export { className as class };

	const context = getRadioGroupContext();

	$: isDisabled = disabled ?? context.disabled;
	$: isChecked = context.value === value;

	function handleChange() {
		if (!isDisabled) {
			context.onChange(value);
		}
	}

	$: radioClasses = [
		'radio',
		`size-${context.size}`,
		context.error && 'error',
		isDisabled && 'disabled'
	]
		.filter(Boolean)
		.join(' ');

	$: itemClasses = ['item', className].filter(Boolean).join(' ');
</script>

<label class={itemClasses}>
	<input
		type="radio"
		name={context.name}
		{value}
		checked={isChecked}
		disabled={isDisabled}
		{id}
		class="input"
		on:change={handleChange}
		{...$$restProps}
	/>
	<span class={radioClasses} />
	{#if $$slots.default}
		<span class="label">
			<slot />
		</span>
	{/if}
</label>

<style>
	.item {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		cursor: pointer;
		position: relative;
	}

	.item:has(.input:disabled) {
		cursor: not-allowed;
	}

	.input {
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

	.radio {
		display: inline-block;
		position: relative;
		flex-shrink: 0;
		border-radius: var(--radius-full);
		border: 2px solid var(--color-input);
		background-color: var(--color-background);
		transition: all var(--transition-normal);
	}

	.radio::after {
		content: '';
		position: absolute;
		border-radius: var(--radius-full);
		background-color: var(--color-primary-foreground);
		opacity: 0;
		transform: scale(0);
		transition: all var(--transition-normal);
	}

	/* Hover state */
	.item:hover .radio:not(.disabled) {
		border-color: var(--color-primary);
	}

	/* Focus state */
	.input:focus-visible + .radio {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	/* Checked state */
	.input:checked + .radio {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
	}

	.input:checked + .radio::after {
		opacity: 1;
		transform: scale(1);
	}

	/* Disabled state */
	.radio.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Error state */
	.radio.error {
		border-color: var(--color-error);
	}

	.radio.error:not(.disabled):hover {
		border-color: var(--color-error);
	}

	.input:checked + .radio.error {
		background-color: var(--color-error);
		border-color: var(--color-error);
	}

	.input:focus-visible + .radio.error {
		outline-color: var(--color-error);
	}

	/* Label */
	.label {
		font-size: var(--font-size-sm);
		color: var(--color-foreground);
		user-select: none;
	}

	.item:has(.input:disabled) .label {
		opacity: 0.5;
	}

	/* Size variants */
	.size-sm {
		width: 16px;
		height: 16px;
	}

	.size-sm::after {
		width: 6px;
		height: 6px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);
	}

	.input:checked + .size-sm::after {
		transform: translate(-50%, -50%) scale(1);
	}

	.size-md {
		width: 20px;
		height: 20px;
	}

	.size-md::after {
		width: 8px;
		height: 8px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);
	}

	.input:checked + .size-md::after {
		transform: translate(-50%, -50%) scale(1);
	}

	.size-lg {
		width: 24px;
		height: 24px;
	}

	.size-lg::after {
		width: 10px;
		height: 10px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);
	}

	.input:checked + .size-lg::after {
		transform: translate(-50%, -50%) scale(1);
	}
</style>
