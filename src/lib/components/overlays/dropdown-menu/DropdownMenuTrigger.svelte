<script lang="ts">
	import { getDropdownMenuContext } from './DropdownMenu.svelte';

	const { toggle } = getDropdownMenuContext();
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
