<script lang="ts">
	import { getComboboxContext } from './Combobox.svelte';
	import { clickOutside } from '$lib/utils/dom/click-outside';

	let className = '';
	export { className as class };

	const { open, close } = getComboboxContext();

	$: isOpen = $open;
	$: classes = ['combobox-content', className].filter(Boolean).join(' ');

	function handleClickOutside() {
		close();
	}
</script>

{#if isOpen}
	<div class={classes} use:clickOutside={handleClickOutside} {...$$restProps}>
		<slot />
	</div>
{/if}

<style>
	.combobox-content {
		position: absolute;
		z-index: 50;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		max-height: 300px;
		overflow-y: auto;
		background-color: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		animation: fadeIn 0.15s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
