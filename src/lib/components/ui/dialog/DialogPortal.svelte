<script lang="ts">
	import { getDialogContext } from './Dialog.svelte';
	import { onMount } from 'svelte';

	const context = getDialogContext();

	let mounted = false;
	let portalTarget: HTMLElement;

	onMount(() => {
		portalTarget = document.body;
		mounted = true;
	});

	function portal(node: HTMLElement) {
		if (portalTarget) {
			portalTarget.appendChild(node);
		}

		return {
			destroy() {
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			}
		};
	}
</script>

{#if context.open && mounted}
	<div use:portal {...$$restProps}>
		<slot />
	</div>
{/if}
