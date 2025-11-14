<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled = false;
	export let checked = false;
	export let id: string | undefined = undefined;

	let className = '';
	export { className as class };

	$: switchClasses = ['switch', `size-${size}`, disabled && 'disabled', className]
		.filter(Boolean)
		.join(' ');
</script>

<label class="label">
	<input bind:checked type="checkbox" class="input" {disabled} {id} {...$$restProps} on:change />
	<span class={switchClasses} />
</label>

<style>
	.label {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		position: relative;
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

	.switch {
		position: relative;
		display: inline-block;
		flex-shrink: 0;
		border-radius: var(--radius-full);
		background-color: var(--color-input);
		transition: all var(--transition-normal);
		border: 2px solid transparent;
	}

	.switch::after {
		content: '';
		position: absolute;
		background-color: var(--color-background);
		border-radius: var(--radius-full);
		transition: all var(--transition-normal);
		box-shadow: var(--shadow-sm);
	}

	/* Checked state */
	.input:checked + .switch {
		background-color: var(--color-primary);
	}

	/* Focus state */
	.input:focus-visible + .switch {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	/* Disabled state */
	.switch.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.label:has(.input:disabled) {
		cursor: not-allowed;
	}

	/* Size variants */
	.size-sm {
		width: 32px;
		height: 18px;
	}

	.size-sm::after {
		width: 14px;
		height: 14px;
		left: 2px;
		top: 2px;
	}

	.input:checked + .size-sm::after {
		transform: translateX(14px);
	}

	.size-md {
		width: 40px;
		height: 24px;
	}

	.size-md::after {
		width: 18px;
		height: 18px;
		left: 3px;
		top: 3px;
	}

	.input:checked + .size-md::after {
		transform: translateX(16px);
	}

	.size-lg {
		width: 48px;
		height: 28px;
	}

	.size-lg::after {
		width: 22px;
		height: 22px;
		left: 3px;
		top: 3px;
	}

	.input:checked + .size-lg::after {
		transform: translateX(20px);
	}
</style>
