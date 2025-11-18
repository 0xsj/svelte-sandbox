<script lang="ts" context="module">
	import { writable, type Writable } from 'svelte/store';
	import { setContext, getContext } from 'svelte';

	const ACCORDION_KEY = Symbol('Accordion');

	export interface AccordionContext {
		activeItems: Writable<string[]>;
		toggle: (value: string) => void;
		isActive: (value: string) => boolean;
		type: 'single' | 'multiple';
	}

	export function setAccordionContext(context: AccordionContext) {
		setContext(ACCORDION_KEY, context);
	}

	export function getAccordionContext(): AccordionContext {
		const context = getContext<AccordionContext>(ACCORDION_KEY);
		if (!context) {
			throw new Error('Accordion components must be used within Accordion');
		}
		return context;
	}
</script>

<script lang="ts">
	export let type: 'single' | 'multiple' = 'single';
	export let value: string | string[] = type === 'single' ? '' : [];
	let className = '';
	export { className as class };

	const activeItems = writable<string[]>(
		type === 'single' ? (value ? [value as string] : []) : (value as string[])
	);

	$: if (type === 'single' && typeof value === 'string') {
		activeItems.set(value ? [value] : []);
	} else if (type === 'multiple' && Array.isArray(value)) {
		activeItems.set(value);
	}

	function toggle(itemValue: string) {
		activeItems.update((items) => {
			if (type === 'single') {
				// Single: toggle or switch to new item
				const newItems = items.includes(itemValue) ? [] : [itemValue];
				value = newItems[0] || '';
				return newItems;
			} else {
				// Multiple: toggle item in array
				const newItems = items.includes(itemValue)
					? items.filter((v) => v !== itemValue)
					: [...items, itemValue];
				value = newItems;
				return newItems;
			}
		});
	}

	function isActive(itemValue: string): boolean {
		return $activeItems.includes(itemValue);
	}

	const context: AccordionContext = {
		activeItems,
		toggle,
		isActive,
		type
	};

	setAccordionContext(context);

	$: classes = ['accordion', className].filter(Boolean).join(' ');
</script>

<div class={classes} {...$$restProps}>
	<slot />
</div>

<style>
	.accordion {
		width: 100%;
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
	}
</style>
