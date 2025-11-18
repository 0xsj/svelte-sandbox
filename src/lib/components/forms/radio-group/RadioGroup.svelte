<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { setContext, getContext } from 'svelte';

	const RADIO_GROUP_KEY = Symbol('RadioGroup');

	export interface RadioGroupContext {
		name: string;
		value: string | undefined;
		disabled: boolean;
		size: 'sm' | 'md' | 'lg';
		error: boolean;
		onChange: (value: string) => void;
	}

	export function setRadioGroupContext(context: RadioGroupContext) {
		setContext(RADIO_GROUP_KEY, context);
	}

	export function getRadioGroupContext(): RadioGroupContext {
		const context = getContext<RadioGroupContext>(RADIO_GROUP_KEY);
		if (!context) {
			throw new Error('Radio must be used within RadioGroup');
		}
		return context;
	}
</script>

<script lang="ts">
	export let name: string;
	export let value: string | undefined = undefined;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled = false;
	export let error = false;
	export let orientation: 'vertical' | 'horizontal' = 'vertical';

	let className = '';
	export { className as class };

	function handleChange(newValue: string) {
		value = newValue;
	}

	$: context = {
		name,
		value,
		disabled,
		size,
		error,
		onChange: handleChange
	};

	$: setRadioGroupContext(context);

	$: classes = ['group', orientation, className].filter(Boolean).join(' ');
</script>

<div role="radiogroup" class={classes} {...$$restProps}>
	<slot />
</div>

<style>
	.group {
		display: flex;
		gap: var(--spacing-md);
	}

	.vertical {
		flex-direction: column;
	}

	.horizontal {
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
