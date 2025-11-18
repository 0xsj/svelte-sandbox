<script lang="ts">
	import { getTabsContext } from './Tabs.svelte';

	export let value: string;

	const { value: tabValue } = getTabsContext();
	let className = '';
	export { className as class };

	$: isActive = $tabValue === value;
</script>

{#if isActive}
	<div class="content {className}" role="tabpanel" {...$$restProps}>
		<slot />
	</div>
{/if}

<style>
	.content {
		margin-top: var(--spacing-lg);
		animation: fadeIn 0.2s ease-out;
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
