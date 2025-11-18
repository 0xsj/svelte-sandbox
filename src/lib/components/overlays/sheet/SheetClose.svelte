<script lang="ts">
	import { getSheetContext } from './Sheet.svelte';

	const { close } = getSheetContext();
	let className = '';
	export { className as class };

	$: classes = ['sheet-close', className].filter(Boolean).join(' ');
</script>

<button type="button" class={classes} on:click={close} aria-label="Close" {...$$restProps}>
	<slot>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<line x1="18" y1="6" x2="6" y2="18"></line>
			<line x1="6" y1="6" x2="18" y2="18"></line>
		</svg>
	</slot>
</button>

<style>
	.sheet-close {
		position: absolute;
		top: var(--spacing-lg);
		right: var(--spacing-lg);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0;
		border: none;
		background: transparent;
		color: var(--color-muted-foreground);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: all var(--transition-normal);
	}

	.sheet-close:hover {
		color: var(--color-foreground);
		background-color: var(--color-muted);
	}

	.sheet-close:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}
</style>
