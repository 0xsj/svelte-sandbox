<script lang="ts">
	import { getDialogContext } from './Dialog.svelte';

	const context = getDialogContext();

	function handleClick() {
		context.onOpenChange(true);
	}
</script>

<button on:click={handleClick} {...$$restProps}>
	<slot />
</button>
