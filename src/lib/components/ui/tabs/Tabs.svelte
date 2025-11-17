<script lang="ts" context="module">
	import { writable, type Writable } from 'svelte/store';
	import { setContext, getContext } from 'svelte';

	const TABS_KEY = Symbol('Tabs');

	export interface TabsContext {
		value: Writable<string>;
		onValueChange: (value: string) => void;
	}

	export function setTabsContext(context: TabsContext) {
		setContext(TABS_KEY, context);
	}

	export function getTabsContext(): TabsContext {
		const context = getContext<TabsContext>(TABS_KEY);
		if (!context) {
			throw new Error('Tabs compound components must be used within Tabs');
		}
		return context;
	}
</script>

<script lang="ts">
	export let value: string = '';
	let className = '';
	export { className as class };

	const valueStore = writable(value);

	function handleValueChange(newValue: string) {
		value = newValue;
		valueStore.set(newValue);
	}

	$: valueStore.set(value);

	const context: TabsContext = {
		value: valueStore,
		onValueChange: handleValueChange
	};

	setTabsContext(context);
</script>

<div class="tabs {className}" {...$$restProps}>
	<slot />
</div>

<style>
	.tabs {
		width: 100%;
	}
</style>
