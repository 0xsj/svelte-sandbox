<script lang="ts">
	export let value: number = 0;
	export let max: number = 100;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let variant: 'primary' | 'success' | 'warning' | 'error' = 'primary';
	export let showLabel: boolean = false;
	let className = '';
	export { className as class };

	$: percentage = Math.min(Math.max((value / max) * 100, 0), 100);
	$: classes = ['progress', `size-${size}`, className].filter(Boolean).join(' ');
	$: barClasses = ['progress-bar', `variant-${variant}`].filter(Boolean).join(' ');
</script>

<div
	class={classes}
	role="progressbar"
	aria-valuenow={value}
	aria-valuemin={0}
	aria-valuemax={max}
	{...$$restProps}
>
	<div class="progress-track">
		<div class={barClasses} style="width: {percentage}%"></div>
	</div>
	{#if showLabel}
		<span class="progress-label">{Math.round(percentage)}%</span>
	{/if}
</div>

<style>
	.progress {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		width: 100%;
	}

	.progress-track {
		position: relative;
		flex: 1;
		overflow: hidden;
		background-color: var(--color-secondary);
		border-radius: var(--radius-full);
	}

	.progress-bar {
		height: 100%;
		transition: width 0.3s ease;
		border-radius: var(--radius-full);
	}

	/* Size variants */
	.size-sm .progress-track {
		height: 4px;
	}

	.size-md .progress-track {
		height: 8px;
	}

	.size-lg .progress-track {
		height: 12px;
	}

	/* Variant colors */
	.variant-primary {
		background-color: var(--color-primary);
	}

	.variant-success {
		background-color: var(--color-success);
	}

	.variant-warning {
		background-color: var(--color-warning);
	}

	.variant-error {
		background-color: var(--color-error);
	}

	/* Label */
	.progress-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-foreground);
		min-width: 40px;
		text-align: right;
	}
</style>
