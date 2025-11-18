<script lang="ts">
	import { getSheetContext } from './Sheet.svelte';

	const { toggle } = getSheetContext();
	let className = '';
	export { className as class };
</script>

<button type="button" class={className} on:click={toggle} {...$$restProps}>
	<slot />
</button>

<style>
	button {
		all: unset;
		cursor: pointer;
	}
</style>
