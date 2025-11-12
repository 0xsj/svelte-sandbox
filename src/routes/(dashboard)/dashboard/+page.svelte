<!-- src/routes/(dashboard)/+page.svelte -->
<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Box from '$lib/components/layout/Box.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Grid from '$lib/components/layout/Grid.svelte';
	import Flex from '$lib/components/layout/Flex.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<Box display="flex" style="min-height: 100vh;">
	<!-- Sidebar -->
	<Box as="aside" class="sidebar" py="xl" px="lg">
		<Stack direction="vertical" gap="2xl">
			<Box>
				<h2 class="logo">Dashboard</h2>
			</Box>

			<Stack direction="vertical" gap="sm">
				<Box class="nav-item">Overview</Box>
				<Box class="nav-item">Analytics</Box>
				<Box class="nav-item">Customers</Box>
				<Box class="nav-item">Feedback</Box>
				<Box class="nav-item">Settings</Box>
			</Stack>
		</Stack>
	</Box>

	<!-- Main Content -->
	<Box flex={1} class="main-content">
		<Container size="xl">
			<Stack direction="vertical" gap="2xl">
				<!-- Header -->
				<Box pt="2xl">
					<Flex direction="row" justify="space-between" align="center">
						<Stack direction="vertical" gap="xs">
							<h1 class="page-title">Dashboard Overview</h1>
							<p class="page-subtitle">Welcome back! Here's what's happening today.</p>
						</Stack>
						<Button variant="primary">New Feedback</Button>
					</Flex>
				</Box>

				<!-- Stats Grid -->
				<Grid columns={4} columnsMobile={1} columnsTablet={2} gap="lg">
					<Box class="stat-card" p="xl">
						<Stack direction="vertical" gap="sm">
							<p class="stat-label">Total Feedback</p>
							<p class="stat-value">1,234</p>
							<p class="stat-change">+12% from last month</p>
						</Stack>
					</Box>

					<Box class="stat-card" p="xl">
						<Stack direction="vertical" gap="sm">
							<p class="stat-label">Active Users</p>
							<p class="stat-value">856</p>
							<p class="stat-change">+8% from last month</p>
						</Stack>
					</Box>

					<Box class="stat-card" p="xl">
						<Stack direction="vertical" gap="sm">
							<p class="stat-label">Pending Reviews</p>
							<p class="stat-value">42</p>
							<p class="stat-change">-5% from last month</p>
						</Stack>
					</Box>

					<Box class="stat-card" p="xl">
						<Stack direction="vertical" gap="sm">
							<p class="stat-label">Satisfaction</p>
							<p class="stat-value">94%</p>
							<p class="stat-change">+2% from last month</p>
						</Stack>
					</Box>
				</Grid>

				<!-- Content Grid -->
				<Grid columns={12} gap="lg">
					<!-- Recent Feedback -->
					<Box class="content-card" p="xl" style="grid-column: span 8;">
						<Stack direction="vertical" gap="lg">
							<Flex direction="row" justify="space-between" align="center">
								<h3 class="card-title">Recent Feedback</h3>
								<Button variant="ghost" size="sm">View All</Button>
							</Flex>

							<Stack direction="vertical" gap="md">
								{#each [1, 2, 3, 4, 5] as item}
									<Box class="feedback-item" p="md">
										<Stack direction="vertical" gap="xs">
											<Flex direction="row" justify="space-between" align="start">
												<p class="feedback-title">Customer feedback #{item}</p>
												<span class="feedback-badge">New</span>
											</Flex>
											<p class="feedback-text">
												Lorem ipsum dolor sit amet, consectetur adipiscing elit...
											</p>
											<p class="feedback-meta">2 hours ago</p>
										</Stack>
									</Box>
								{/each}
							</Stack>
						</Stack>
					</Box>

					<!-- Quick Actions -->
					<Box class="content-card" p="xl" style="grid-column: span 4;">
						<Stack direction="vertical" gap="lg">
							<h3 class="card-title">Quick Actions</h3>

							<Stack direction="vertical" gap="md">
								<Button variant="outline" style="width: 100%;">Export Data</Button>
								<Button variant="outline" style="width: 100%;">Generate Report</Button>
								<Button variant="outline" style="width: 100%;">Invite Team</Button>
								<Button variant="outline" style="width: 100%;">Settings</Button>
							</Stack>
						</Stack>
					</Box>
				</Grid>

				<!-- Activity Section -->
				<Box class="content-card" p="xl">
					<Stack direction="vertical" gap="lg">
						<h3 class="card-title">Recent Activity</h3>

						<Grid columns={3} columnsMobile={1} columnsTablet={2} gap="md">
							{#each [1, 2, 3, 4, 5, 6] as item}
								<Box class="activity-item" p="md">
									<Stack direction="vertical" gap="xs">
										<p class="activity-title">Activity {item}</p>
										<p class="activity-text">User performed an action</p>
										<p class="activity-time">5 minutes ago</p>
									</Stack>
								</Box>
							{/each}
						</Grid>
					</Stack>
				</Box>
			</Stack>
		</Container>
	</Box>
</Box>

<style>
	:global(.sidebar) {
		width: 250px;
		background-color: var(--color-card);
		border-right: 1px solid var(--color-border);
		position: sticky;
		top: 0;
		height: 100vh;
		overflow-y: auto;
	}

	:global(.logo) {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-foreground);
		margin: 0;
	}

	:global(.nav-item) {
		padding: var(--spacing-md) var(--spacing-lg);
		border-radius: var(--radius-md);
		color: var(--color-muted-foreground);
		cursor: pointer;
		transition: all var(--transition-normal);
	}

	:global(.nav-item:hover) {
		background-color: var(--color-accent);
		color: var(--color-accent-foreground);
	}

	:global(.main-content) {
		background-color: var(--color-background);
		overflow-y: auto;
	}

	:global(.page-title) {
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-foreground);
		margin: 0;
	}

	:global(.page-subtitle) {
		font-size: var(--font-size-base);
		color: var(--color-muted-foreground);
		margin: 0;
	}

	:global(.stat-card) {
		background-color: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		transition: all var(--transition-normal);
	}

	:global(.stat-card:hover) {
		box-shadow: var(--shadow-md);
	}

	:global(.stat-label) {
		font-size: var(--font-size-sm);
		color: var(--color-muted-foreground);
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	:global(.stat-value) {
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-foreground);
		margin: 0;
	}

	:global(.stat-change) {
		font-size: var(--font-size-sm);
		color: var(--color-success);
		margin: 0;
	}

	:global(.content-card) {
		background-color: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	:global(.card-title) {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-foreground);
		margin: 0;
	}

	:global(.feedback-item) {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		transition: all var(--transition-normal);
		cursor: pointer;
	}

	:global(.feedback-item:hover) {
		background-color: var(--color-muted);
	}

	:global(.feedback-title) {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--color-foreground);
		margin: 0;
	}

	:global(.feedback-text) {
		font-size: var(--font-size-sm);
		color: var(--color-muted-foreground);
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:global(.feedback-meta) {
		font-size: var(--font-size-sm);
		color: var(--color-muted-foreground);
		margin: 0;
	}

	:global(.feedback-badge) {
		padding: 2px 8px;
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
	}

	:global(.activity-item) {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		transition: all var(--transition-normal);
	}

	:global(.activity-item:hover) {
		border-color: var(--color-primary);
	}

	:global(.activity-title) {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--color-foreground);
		margin: 0;
	}

	:global(.activity-text) {
		font-size: var(--font-size-sm);
		color: var(--color-muted-foreground);
		margin: 0;
	}

	:global(.activity-time) {
		font-size: var(--font-size-xs);
		color: var(--color-muted-foreground);
		margin: 0;
	}
</style>
