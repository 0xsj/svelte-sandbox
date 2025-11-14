<script lang="ts">
	import { getDialogContext } from './Dialog.svelte';

	const context = getDialogContext();

	function handleClick() {
		context.onOpenChange(false);
	}
</script>

<button on:click={handleClick} {...$$restProps}>
	<slot />
</button>
