<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Box from '$lib/components/layout/Box.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Grid from '$lib/components/layout/Grid.svelte';
	import Flex from '$lib/components/layout/Flex.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Text from '$lib/components/display/Text.svelte';
	import Badge from '$lib/components/display/Badge.svelte';
	import Separator from '$lib/components/display/Separator.svelte';
	import Card from '$lib/components/display/card/Card.svelte';
	import CardHeader from '$lib/components/display/card/CardHeader.svelte';
	import CardTitle from '$lib/components/display/card/CardTitle.svelte';
	import CardContent from '$lib/components/display/card/CardContent.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<Box display="flex" style="min-height: 100vh;">
	<!-- Sidebar -->
	<Box as="aside" class="sidebar" py="xl" px="lg">
		<Stack direction="vertical" gap="2xl">
			<Box>
				<Text size="xl" weight="bold">Dashboard</Text>
			</Box>

			<Stack direction="vertical" gap="sm">
				<Box class="nav-item">Overview</Box>
				<Box class="nav-item">Analytics</Box>
				<Box class="nav-item">Customers</Box>
				<Box class="nav-item">Feedback</Box>
				<Box class="nav-item">Settings</Box>
			</Stack>

			<Separator spacing="md" />

			<Box>
				<ThemeToggle />
			</Box>
		</Stack>
	</Box>

	<!-- Main Content -->
	<Box flex={1} class="main-content">
		<Container size="xl">
			<Stack direction="vertical" gap="2xl" style="padding: 32px 0;">
				<!-- Header -->
				<Flex direction="row" justify="space-between" align="center" wrap>
					<Stack direction="vertical" gap="xs">
						<Text size="3xl" weight="bold">Dashboard Overview</Text>
						<Text size="base" variant="muted">Welcome back! Here's what's happening today.</Text>
					</Stack>
					<Button variant="primary">New Feedback</Button>
				</Flex>

				<!-- Stats Grid -->
				<Grid columns={4} columnsMobile={1} columnsTablet={2} gap="lg">
					<Card>
						<CardContent>
							<Stack direction="vertical" gap="xs">
								<Text size="sm" variant="muted">TOTAL FEEDBACK</Text>
								<Text size="3xl" weight="bold">1,234</Text>
								<Text size="sm" variant="success">+12% from last month</Text>
							</Stack>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<Stack direction="vertical" gap="xs">
								<Text size="sm" variant="muted">ACTIVE USERS</Text>
								<Text size="3xl" weight="bold">856</Text>
								<Text size="sm" variant="success">+8% from last month</Text>
							</Stack>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<Stack direction="vertical" gap="xs">
								<Text size="sm" variant="muted">PENDING REVIEWS</Text>
								<Text size="3xl" weight="bold">42</Text>
								<Text size="sm" variant="error">-5% from last month</Text>
							</Stack>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<Stack direction="vertical" gap="xs">
								<Text size="sm" variant="muted">SATISFACTION</Text>
								<Text size="3xl" weight="bold">94%</Text>
								<Text size="sm" variant="success">+2% from last month</Text>
							</Stack>
						</CardContent>
					</Card>
				</Grid>

				<!-- Content Grid -->
				<Grid columns={12} gap="lg">
					<!-- Recent Feedback -->
					<Card style="grid-column: span 8;">
						<CardHeader>
							<Flex direction="row" justify="space-between" align="center">
								<CardTitle>Recent Feedback</CardTitle>
								<Button variant="ghost" size="sm">View All</Button>
							</Flex>
						</CardHeader>
						<CardContent>
							<Stack direction="vertical" gap="md">
								{#each [1, 2, 3, 4, 5] as item}
									<Box class="feedback-item" p="md">
										<Stack direction="vertical" gap="xs">
											<Flex direction="row" justify="space-between" align="start">
												<Text size="base" weight="medium">
													Customer feedback #{item}
												</Text>
												<Badge variant="primary" size="sm">New</Badge>
											</Flex>
											<Text size="sm" variant="muted">
												Lorem ipsum dolor sit amet, consectetur adipiscing elit...
											</Text>
											<Text size="sm" variant="muted">2 hours ago</Text>
										</Stack>
									</Box>
								{/each}
							</Stack>
						</CardContent>
					</Card>

					<!-- Quick Actions -->
					<Card style="grid-column: span 4;">
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
						</CardHeader>
						<CardContent>
							<Stack direction="vertical" gap="md">
								<Button variant="outline" style="width: 100%;">Export Data</Button>
								<Button variant="outline" style="width: 100%;">Generate Report</Button>
								<Button variant="outline" style="width: 100%;">Invite Team</Button>
								<Button variant="outline" style="width: 100%;">Settings</Button>
							</Stack>
						</CardContent>
					</Card>
				</Grid>

				<!-- Activity Section -->
				<Card>
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
					</CardHeader>
					<CardContent>
						<Grid columns={3} columnsMobile={1} columnsTablet={2} gap="md">
							{#each [1, 2, 3, 4, 5, 6] as item}
								<Box class="activity-item" p="md">
									<Stack direction="vertical" gap="xs">
										<Text size="base" weight="medium">Activity {item}</Text>
										<Text size="sm" variant="muted">User performed an action</Text>
										<Text size="xs" variant="muted">5 minutes ago</Text>
									</Stack>
								</Box>
							{/each}
						</Grid>
					</CardContent>
				</Card>
			</Stack>
		</Container>
	</Box>
</Box>

<style>
	:global(.sidebar) {
		width: 250px;
		background-color: var(--color-background);
		border-right: 1px solid var(--color-border);
		position: sticky;
		top: 0;
		height: 100vh;
		overflow-y: auto;
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

	:global(.feedback-item) {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		transition: all var(--transition-normal);
		cursor: pointer;
	}

	:global(.feedback-item:hover) {
		background-color: var(--color-muted);
	}

	:global(.activity-item) {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		transition: all var(--transition-normal);
	}

	:global(.activity-item:hover) {
		border-color: var(--color-primary);
	}
</style>
