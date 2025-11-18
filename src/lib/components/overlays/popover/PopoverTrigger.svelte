<script lang="ts">
	import { getPopoverContext } from './Popover.svelte';

	const { toggle } = getPopoverContext();
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
