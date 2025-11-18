<script>
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import Button from './forms/Button.svelte';

	let current = 'light';
	onMount(() => {
		theme.init();
		return theme.subscribe((v) => (current = v));
	});
</script>

<Button variant="ghost" size="md" on:click={theme.toggle}>
	{#if current === 'light'}🌞{:else}🌙{/if}
</Button>
