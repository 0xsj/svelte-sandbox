<script lang="ts">
	import { toastStore } from './toast.store';
	import Toast from './Toast.svelte';

	export let position:
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right' = 'top-right';

	$: toasts = $toastStore.toasts;
	$: classes = ['toaster', `position-${position}`].filter(Boolean).join(' ');

	function handleDismiss(id: string) {
		toastStore.dismiss(id);
	}
</script>

{#if toasts.length > 0}
	<div class={classes}>
		{#each toasts as toast (toast.id)}
			<Toast
				id={toast.id}
				title={toast.title}
				description={toast.description}
				variant={toast.variant}
				onDismiss={handleDismiss}
			/>
		{/each}
	</div>
{/if}

<style>
	.toaster {
		position: fixed;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		padding: var(--spacing-lg);
		pointer-events: none;
		max-height: 100vh;
		overflow-y: auto;
	}

	/* Position variants */
	.position-top-left {
		top: 0;
		left: 0;
	}

	.position-top-center {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.position-top-right {
		top: 0;
		right: 0;
	}

	.position-bottom-left {
		bottom: 0;
		left: 0;
	}

	.position-bottom-center {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.position-bottom-right {
		bottom: 0;
		right: 0;
	}

	/* Mobile adjustments */
	@media (max-width: 640px) {
		.toaster {
			left: 0;
			right: 0;
			transform: none;
			width: 100%;
		}

		.toaster :global(.toast) {
			max-width: 100%;
		}
	}
</style>
