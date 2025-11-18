<script lang="ts">
	export let value: number = 50;
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 1;
	export let disabled: boolean = false;
	export let showValue: boolean = false;
	let className = '';
	export { className as class };

	$: percentage = ((value - min) / (max - min)) * 100;
	$: classes = ['slider', disabled && 'disabled', className].filter(Boolean).join(' ');

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = Number(target.value);
	}
</script>

<div class={classes} {...$$restProps}>
	<div class="slider-container">
		<input
			type="range"
			{min}
			{max}
			{step}
			{disabled}
			bind:value
			on:input={handleInput}
			class="slider-input"
		/>
		<div class="slider-track">
			<div class="slider-range" style="width: {percentage}%"></div>
		</div>
		<div class="slider-thumb" style="left: {percentage}%"></div>
	</div>
	{#if showValue}
		<span class="slider-value">{value}</span>
	{/if}
</div>

<style>
	.slider {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		width: 100%;
	}

	.slider-container {
		position: relative;
		flex: 1;
		height: 20px;
		display: flex;
		align-items: center;
		touch-action: none;
		user-select: none;
	}

	.slider-input {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
		z-index: 2;
	}

	.slider-input:disabled {
		cursor: not-allowed;
	}

	.slider-track {
		position: relative;
		width: 100%;
		height: 8px;
		background-color: var(--color-secondary);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.slider-range {
		position: absolute;
		height: 100%;
		background-color: var(--color-primary);
		border-radius: var(--radius-full);
		transition: width 0.15s ease;
	}

	.slider-thumb {
		position: absolute;
		width: 20px;
		height: 20px;
		background-color: var(--color-background);
		border: 2px solid var(--color-primary);
		border-radius: var(--radius-full);
		box-shadow: var(--shadow-sm);
		transform: translateX(-50%);
		transition: left 0.15s ease;
		pointer-events: none;
		z-index: 1;
	}

	.slider-input:hover:not(:disabled) ~ .slider-thumb {
		box-shadow: var(--shadow-md);
	}

	.slider-input:focus-visible ~ .slider-thumb {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	.slider.disabled {
		opacity: 0.5;
	}

	.slider.disabled .slider-track {
		background-color: var(--color-muted);
	}

	.slider.disabled .slider-range {
		background-color: var(--color-muted-foreground);
	}

	.slider.disabled .slider-thumb {
		border-color: var(--color-muted-foreground);
	}

	.slider-value {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-foreground);
		min-width: 40px;
		text-align: right;
	}
</style>
