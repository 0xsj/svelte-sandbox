<script lang="ts">
	import { getDialogContext } from './Dialog.svelte';

	const context = getDialogContext();

	let className = '';
	export { className as class };

	function handleClick() {
		context.onOpenChange(false);
	}
</script>

<div class="overlay {className}" on:click={handleClick} {...$$restProps}></div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 50;
		background-color: rgba(0, 0, 0, 0.5);
		animation: fadeIn 200ms ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
