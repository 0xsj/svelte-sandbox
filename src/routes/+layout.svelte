<script>
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<div class="container">
	<header class="header">
		<h1>Customer Feedback</h1>
		<ThemeToggle />
	</header>
	<main><slot /></main>
	<footer>© 2025 Customer Feedback</footer>
</div>

<style>
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.header {
		position: sticky;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 64px;
		padding: 0 var(--spacing-lg);
		border-bottom: 1px solid var(--color-border);
		background: var(--color-background);
	}
	main {
		flex: 1;
	}
	footer {
		padding: var(--spacing-xl);
		text-align: center;
		border-top: 1px solid var(--color-border);
		color: var(--color-muted-foreground);
	}
</style>
