<script>
	import Button from '$lib/components/ui/Button.svelte';
</script>

<div class="container">
	<h1>Welcome to Customer Feedback</h1>

	<section>
		<h2>Button Variants</h2>
		<div class="grid">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
		</div>
	</section>
</div>

<style>
	.container {
		max-width: 1280px;
		margin: 0 auto;
		padding: var(--spacing-4xl) var(--spacing-lg);
	}
	h1 {
		font-size: var(--font-size-5xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--spacing-3xl);
		text-align: center;
	}
	section {
		margin-bottom: var(--spacing-3xl);
	}
	h2 {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-semibold);
		margin-bottom: var(--spacing-xl);
	}
	.grid {
		display: flex;
		gap: var(--spacing-lg);
		flex-wrap: wrap;
	}
</style>
