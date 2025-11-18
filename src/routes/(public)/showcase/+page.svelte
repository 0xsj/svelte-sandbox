<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Box from '$lib/components/layout/Box.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Flex from '$lib/components/layout/Flex.svelte';
	import Grid from '$lib/components/layout/Grid.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Text from '$lib/components/display/Text.svelte';
	import Label from '$lib/components/forms/Label.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Textarea from '$lib/components/forms/Textarea.svelte';
	import Select from '$lib/components/forms/Select.svelte';
	import Checkbox from '$lib/components/forms/Checkbox.svelte';
	import Switch from '$lib/components/forms/Switch.svelte';
	import Badge from '$lib/components/display/Badge.svelte';
	import Separator from '$lib/components/display/Separator.svelte';
	import Avatar from '$lib/components/display/Avatar.svelte';
	import Tooltip from '$lib/components/overlays/Tooltip.svelte';
	import Card from '$lib/components/display/card/Card.svelte';
	import CardHeader from '$lib/components/display/card/CardHeader.svelte';
	import CardTitle from '$lib/components/display/card/CardTitle.svelte';
	import CardDescription from '$lib/components/display/card/CardDescription.svelte';
	import CardContent from '$lib/components/display/card/CardContent.svelte';
	import CardFooter from '$lib/components/display/card/CardFooter.svelte';
	import Alert from '$lib/components/feedback/alert/Alert.svelte';
	import AlertTitle from '$lib/components/feedback/alert/AlertTitle.svelte';
	import AlertDescription from '$lib/components/feedback/alert/AlertDescription.svelte';
	import Dialog from '$lib/components/overlays/dialog/Dialog.svelte';
	import DialogTrigger from '$lib/components/overlays/dialog/DialogTrigger.svelte';
	import DialogPortal from '$lib/components/overlays/dialog/DialogPortal.svelte';
	import DialogOverlay from '$lib/components/overlays/dialog/DialogOverlay.svelte';
	import DialogContent from '$lib/components/overlays/dialog/DialogContent.svelte';
	import DialogHeader from '$lib/components/overlays/dialog/DialogHeader.svelte';
	import DialogTitle from '$lib/components/overlays/dialog/DialogTitle.svelte';
	import DialogDescription from '$lib/components/overlays/dialog/DialogDescription.svelte';
	import DialogFooter from '$lib/components/overlays/dialog/DialogFooter.svelte';
	import DialogClose from '$lib/components/overlays/dialog/DialogClose.svelte';
	import Tabs from '$lib/components/display/tabs/Tabs.svelte';
	import TabsList from '$lib/components/display/tabs/TabsList.svelte';
	import TabsTrigger from '$lib/components/display/tabs/TabsTrigger.svelte';
	import TabsContent from '$lib/components/display/tabs/TabsContent.svelte';
	import RadioGroup from '$lib/components/forms/radio-group/RadioGroup.svelte';
	import Radio from '$lib/components/forms/radio-group/Radio.svelte';
	import Spinner from '$lib/components/feedback/Spinner.svelte';
	import Progress from '$lib/components/feedback/Progress.svelte';
	import Skeleton from '$lib/components/feedback/Skeleton.svelte';
	import Kbd from '$lib/components/display/Kbd.svelte';
	import EmptyState from '$lib/components/feedback/EmptyState.svelte';

	let dialogOpen = false;
	let selectedTab = 'components';
	let radioValue = 'option1';
	let switchChecked = false;
	let checkboxChecked = false;
	let showSuccessAlert = true;
	let progressValue = 45;

	$: console.log('Selected tab:', selectedTab);
</script>

<svelte:head>
	<title>Component Showcase</title>
</svelte:head>

<Container size="xl">
	<Box py="4xl">
		<Stack direction="vertical" gap="4xl">
			<!-- Hero Section -->
			<Box style="text-align: center;">
				<Stack direction="vertical" gap="lg">
					<Text size="5xl" weight="bold">Component Showcase</Text>
					<Text size="xl" variant="muted">
						A comprehensive demonstration of all UI components built for SvelteKit
					</Text>
				</Stack>
			</Box>

			<Separator spacing="xl" />

			<!-- Tabs Navigation -->
			<Tabs bind:value={selectedTab}>
				<TabsList>
					<TabsTrigger value="components">UI Components</TabsTrigger>
					<TabsTrigger value="forms">Form Components</TabsTrigger>
					<TabsTrigger value="layouts">Layout Components</TabsTrigger>
					<TabsTrigger value="feedback">Feedback & Loading</TabsTrigger>
				</TabsList>

				<!-- UI Components Tab -->
				<TabsContent value="components">
					<Stack direction="vertical" gap="3xl">
						<!-- Buttons -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Buttons</Text>
								<Text size="sm" variant="muted">
									Different button variants and sizes for various use cases
								</Text>
								<Flex direction="row" gap="md" wrap>
									<Button variant="primary">Primary</Button>
									<Button variant="secondary">Secondary</Button>
									<Button variant="outline">Outline</Button>
									<Button variant="ghost">Ghost</Button>
									<Button variant="destructive">Destructive</Button>
								</Flex>
								<Flex direction="row" gap="md" align="center" wrap>
									<Button size="sm">Small</Button>
									<Button size="md">Medium</Button>
									<Button size="lg">Large</Button>
									<Button disabled>Disabled</Button>
								</Flex>
							</Stack>
						</Box>

						<Separator />

						<!-- Typography -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Typography</Text>
								<Text size="sm" variant="muted">
									Text component with various sizes, weights, and color variants
								</Text>
								<Stack direction="vertical" gap="sm">
									<Text size="5xl" weight="bold">Heading 5XL Bold</Text>
									<Text size="3xl" weight="semibold">Heading 3XL Semibold</Text>
									<Text size="xl" weight="medium">Heading XL Medium</Text>
									<Text size="base">Base text for body content</Text>
									<Text size="sm" variant="muted">Small muted text</Text>
									<Text size="sm" variant="success">Success message</Text>
									<Text size="sm" variant="warning">Warning message</Text>
									<Text size="sm" variant="error">Error message</Text>
								</Stack>
							</Stack>
						</Box>

						<Separator />

						<!-- Badges -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Badges</Text>
								<Text size="sm" variant="muted">Status indicators and labels</Text>
								<Flex direction="row" gap="md" wrap>
									<Badge variant="default">Default</Badge>
									<Badge variant="primary">Primary</Badge>
									<Badge variant="secondary">Secondary</Badge>
									<Badge variant="success">Success</Badge>
									<Badge variant="warning">Warning</Badge>
									<Badge variant="error">Error</Badge>
									<Badge variant="outline">Outline</Badge>
								</Flex>
								<Text size="sm" variant="muted">With status dots:</Text>
								<Flex direction="row" gap="md" wrap>
									<Badge variant="success" dot>Active</Badge>
									<Badge variant="warning" dot>Pending</Badge>
									<Badge variant="error" dot>Inactive</Badge>
								</Flex>
							</Stack>
						</Box>

						<Separator />

						<!-- Avatars -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Avatars</Text>
								<Text size="sm" variant="muted">User profile pictures with fallbacks</Text>
								<Flex direction="row" gap="md" align="center" wrap>
									<Avatar fallback="JD" size="sm" />
									<Avatar fallback="AB" size="md" />
									<Avatar fallback="XY" size="lg" />
									<Avatar fallback="MK" size="xl" />
								</Flex>
							</Stack>
						</Box>

						<Separator />

						<!-- Alerts -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Alerts</Text>
								<Text size="sm" variant="muted">Contextual feedback messages</Text>
								<Stack direction="vertical" gap="md">
									<Alert variant="default">
										<AlertTitle>Default Alert</AlertTitle>
										<AlertDescription>This is a default alert message.</AlertDescription>
									</Alert>
									<Alert variant="info">
										<AlertTitle>Info</AlertTitle>
										<AlertDescription>
											This is an informational alert with helpful context.
										</AlertDescription>
									</Alert>
									{#if showSuccessAlert}
										<Alert variant="success" dismissible onClose={() => (showSuccessAlert = false)}>
											<AlertTitle>Success!</AlertTitle>
											<AlertDescription>Your changes have been saved successfully.</AlertDescription
											>
										</Alert>
									{/if}
									<Alert variant="warning">
										<AlertTitle>Warning</AlertTitle>
										<AlertDescription>
											Please review your settings before proceeding.
										</AlertDescription>
									</Alert>
									<Alert variant="error">
										<AlertTitle>Error</AlertTitle>
										<AlertDescription>
											An error occurred while processing your request.
										</AlertDescription>
									</Alert>
								</Stack>
							</Stack>
						</Box>

						<Separator />

						<!-- Tooltips -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Tooltips</Text>
								<Text size="sm" variant="muted">Hover tooltips with different positions</Text>
								<Flex direction="row" gap="lg" wrap>
									<Tooltip content="Tooltip on top" position="top">
										<Button variant="outline">Hover (Top)</Button>
									</Tooltip>
									<Tooltip content="Tooltip on bottom" position="bottom">
										<Button variant="outline">Hover (Bottom)</Button>
									</Tooltip>
									<Tooltip content="Tooltip on left" position="left">
										<Button variant="outline">Hover (Left)</Button>
									</Tooltip>
									<Tooltip content="Tooltip on right" position="right">
										<Button variant="outline">Hover (Right)</Button>
									</Tooltip>
								</Flex>
							</Stack>
						</Box>

						<Separator />

						<!-- Cards -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Cards</Text>
								<Text size="sm" variant="muted">Content containers with headers and footers</Text>
								<Grid columns={3} columnsMobile={1} columnsTablet={2} gap="lg">
									<Card>
										<CardHeader>
											<CardTitle>Default Card</CardTitle>
											<CardDescription>With shadow and border</CardDescription>
										</CardHeader>
										<CardContent>
											<Text size="sm">Card content goes here.</Text>
										</CardContent>
									</Card>

									<Card variant="outline">
										<CardHeader>
											<CardTitle>Outline Card</CardTitle>
											<CardDescription>Border only, no shadow</CardDescription>
										</CardHeader>
										<CardContent>
											<Text size="sm">Card content goes here.</Text>
										</CardContent>
									</Card>

									<Card interactive>
										<CardHeader>
											<CardTitle>Interactive Card</CardTitle>
											<CardDescription>Hover to see effect</CardDescription>
										</CardHeader>
										<CardContent>
											<Text size="sm">This card has hover effects.</Text>
										</CardContent>
									</Card>
								</Grid>

								<Card style="max-width: 500px;">
									<CardHeader>
										<Flex direction="row" justify="space-between" align="center">
											<div>
												<CardTitle>Card with Footer</CardTitle>
												<CardDescription>Includes action buttons</CardDescription>
											</div>
											<Badge variant="success">Active</Badge>
										</Flex>
									</CardHeader>
									<CardContent>
										<Text size="sm">This card demonstrates a footer with action buttons.</Text>
									</CardContent>
									<CardFooter>
										<Button variant="outline" size="sm">Cancel</Button>
										<Button variant="primary" size="sm" style="margin-left: auto;">Save</Button>
									</CardFooter>
								</Card>
							</Stack>
						</Box>

						<Separator />

						<!-- Dialog -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Dialog</Text>
								<Text size="sm" variant="muted">Modal dialogs for important actions</Text>
								<Dialog bind:open={dialogOpen}>
									<DialogTrigger>
										<Button variant="primary">Open Dialog</Button>
									</DialogTrigger>
									<DialogPortal>
										<DialogOverlay />
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Confirm Action</DialogTitle>
												<DialogDescription>
													Are you sure you want to proceed? This action cannot be undone.
												</DialogDescription>
											</DialogHeader>
											<DialogFooter>
												<DialogClose>
													<Button variant="outline">Cancel</Button>
												</DialogClose>
												<Button variant="primary">Confirm</Button>
											</DialogFooter>
										</DialogContent>
									</DialogPortal>
								</Dialog>
							</Stack>
						</Box>
					</Stack>
				</TabsContent>

				<!-- Form Components Tab -->
				<TabsContent value="forms">
					<Stack direction="vertical" gap="3xl">
						<Card style="max-width: 600px;">
							<CardHeader>
								<CardTitle>Form Components</CardTitle>
								<CardDescription>All form inputs and controls</CardDescription>
							</CardHeader>
							<CardContent>
								<Stack direction="vertical" gap="lg">
									<!-- Text Input -->
									<Stack direction="vertical" gap="sm">
										<Label htmlFor="name" required>Full Name</Label>
										<Input id="name" type="text" placeholder="John Doe" />
									</Stack>

									<!-- Email Input -->
									<Stack direction="vertical" gap="sm">
										<Label htmlFor="email" required>Email Address</Label>
										<Input id="email" type="email" placeholder="you@example.com" />
									</Stack>

									<!-- Select -->
									<Stack direction="vertical" gap="sm">
										<Label htmlFor="country">Country</Label>
										<Select id="country">
											<option value="">Select a country</option>
											<option value="us">United States</option>
											<option value="uk">United Kingdom</option>
											<option value="ca">Canada</option>
											<option value="au">Australia</option>
										</Select>
									</Stack>

									<!-- Textarea -->
									<Stack direction="vertical" gap="sm">
										<Label htmlFor="message">Message</Label>
										<Textarea id="message" placeholder="Enter your message..." />
									</Stack>

									<!-- Radio Group -->
									<Stack direction="vertical" gap="sm">
										<Label>Choose an option</Label>
										<RadioGroup name="options" bind:value={radioValue}>
											<Radio value="option1">Option 1</Radio>
											<Radio value="option2">Option 2</Radio>
											<Radio value="option3">Option 3</Radio>
										</RadioGroup>
									</Stack>

									<!-- Checkbox -->
									<Flex direction="row" gap="sm" align="center">
										<Checkbox id="terms" bind:checked={checkboxChecked} />
										<Label htmlFor="terms">I agree to the terms and conditions</Label>
									</Flex>

									<!-- Switch -->
									<Flex direction="row" justify="space-between" align="center">
										<Label htmlFor="notifications">Enable notifications</Label>
										<Switch id="notifications" bind:checked={switchChecked} />
									</Flex>
								</Stack>
							</CardContent>
							<CardFooter>
								<Button variant="primary" style="width: 100%;">Submit Form</Button>
							</CardFooter>
						</Card>
					</Stack>
				</TabsContent>

				<!-- Layout Components Tab -->
				<TabsContent value="layouts">
					<Stack direction="vertical" gap="3xl">
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Layout Components</Text>
								<Text size="sm" variant="muted">
									Container, Box, Stack, Flex, and Grid for building layouts
								</Text>

								<!-- Grid Example -->
								<Text size="lg" weight="medium">Grid Layout</Text>
								<Grid columns={4} columnsMobile={2} columnsTablet={3} gap="md">
									{#each Array(8) as _, i}
										<Box
											p="xl"
											style="background-color: var(--color-primary); color: var(--color-primary-foreground); border-radius: var(--radius-md); text-align: center;"
										>
											Grid {i + 1}
										</Box>
									{/each}
								</Grid>

								<!-- Flex Example -->
								<Text size="lg" weight="medium">Flex Layout</Text>
								<Flex direction="row" gap="md" wrap>
									{#each Array(5) as _, i}
										<Box
											p="lg"
											style="background-color: var(--color-secondary); border-radius: var(--radius-md); flex: 1; min-width: 120px; text-align: center;"
										>
											Flex {i + 1}
										</Box>
									{/each}
								</Flex>

								<!-- Stack Example -->
								<Text size="lg" weight="medium">Stack Layout (Vertical)</Text>
								<Stack direction="vertical" gap="md">
									{#each Array(3) as _, i}
										<Box
											p="lg"
											style="background-color: var(--color-accent); border-radius: var(--radius-md);"
										>
											Stack Item {i + 1}
										</Box>
									{/each}
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</TabsContent>

				<!-- Feedback & Loading Components Tab -->
				<TabsContent value="feedback">
					<Stack direction="vertical" gap="3xl">
						<!-- Spinner -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Spinner</Text>
								<Text size="sm" variant="muted"
									>Loading indicators with different sizes and colors</Text
								>

								<Text size="base" weight="medium">Sizes</Text>
								<Flex direction="row" gap="xl" align="center" wrap>
									<Stack direction="vertical" gap="xs" align="center">
										<Spinner size="sm" />
										<Text size="sm" variant="muted">Small</Text>
									</Stack>
									<Stack direction="vertical" gap="xs" align="center">
										<Spinner size="md" />
										<Text size="sm" variant="muted">Medium</Text>
									</Stack>
									<Stack direction="vertical" gap="xs" align="center">
										<Spinner size="lg" />
										<Text size="sm" variant="muted">Large</Text>
									</Stack>
									<Stack direction="vertical" gap="xs" align="center">
										<Spinner size="xl" />
										<Text size="sm" variant="muted">X-Large</Text>
									</Stack>
								</Flex>

								<Text size="base" weight="medium">Variants</Text>
								<Flex direction="row" gap="xl" align="center" wrap>
									<Stack direction="vertical" gap="xs" align="center">
										<Spinner variant="primary" />
										<Text size="sm" variant="muted">Primary</Text>
									</Stack>
									<Stack direction="vertical" gap="xs" align="center">
										<Spinner variant="secondary" />
										<Text size="sm" variant="muted">Secondary</Text>
									</Stack>
									<Stack direction="vertical" gap="xs" align="center">
										<Box
											p="md"
											style="background-color: var(--color-primary); border-radius: var(--radius-md);"
										>
											<Spinner variant="white" />
										</Box>
										<Text size="sm" variant="muted">White</Text>
									</Stack>
								</Flex>
							</Stack>
						</Box>

						<Separator />

						<!-- Progress -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Progress</Text>
								<Text size="sm" variant="muted">Progress bars for showing completion status</Text>

								<Stack direction="vertical" gap="md">
									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">Basic Progress</Text>
										<Progress value={progressValue} />
									</Stack>

									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">With Label</Text>
										<Progress value={progressValue} showLabel />
									</Stack>

									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">Sizes</Text>
										<Progress value={75} size="sm" />
										<Progress value={75} size="md" />
										<Progress value={75} size="lg" />
									</Stack>

									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">Variants</Text>
										<Progress value={60} variant="primary" showLabel />
										<Progress value={80} variant="success" showLabel />
										<Progress value={50} variant="warning" showLabel />
										<Progress value={30} variant="error" showLabel />
									</Stack>
								</Stack>

								<Flex direction="row" gap="sm">
									<Button
										size="sm"
										on:click={() => (progressValue = Math.max(0, progressValue - 10))}
									>
										Decrease
									</Button>
									<Button
										size="sm"
										on:click={() => (progressValue = Math.min(100, progressValue + 10))}
									>
										Increase
									</Button>
								</Flex>
							</Stack>
						</Box>

						<Separator />

						<!-- Skeleton -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Skeleton</Text>
								<Text size="sm" variant="muted">Loading placeholders for content</Text>

								<Stack direction="vertical" gap="xl">
									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">Text Lines</Text>
										<Skeleton variant="text" lines={1} />
										<Skeleton variant="text" lines={3} />
									</Stack>

									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">Circular (Avatar)</Text>
										<Flex direction="row" gap="md">
											<Skeleton variant="circular" width="40px" height="40px" />
											<Skeleton variant="circular" width="48px" height="48px" />
											<Skeleton variant="circular" width="64px" height="64px" />
										</Flex>
									</Stack>

									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">Rectangular (Cards/Images)</Text>
										<Skeleton variant="rectangular" height="120px" />
										<Skeleton variant="rectangular" width="300px" height="200px" />
									</Stack>

									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">Card Skeleton Example</Text>
										<Card style="max-width: 400px;">
											<CardContent>
												<Stack direction="vertical" gap="md">
													<Flex direction="row" gap="md" align="start">
														<Skeleton variant="circular" width="48px" height="48px" />
														<Stack direction="vertical" gap="xs" style="flex: 1;">
															<Skeleton variant="text" />
															<Skeleton variant="text" width="60%" />
														</Stack>
													</Flex>
													<Skeleton variant="rectangular" height="200px" />
													<Skeleton variant="text" lines={2} />
												</Stack>
											</CardContent>
										</Card>
									</Stack>
								</Stack>
							</Stack>
						</Box>

						<Separator />

						<!-- Kbd -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Kbd (Keyboard Shortcuts)</Text>
								<Text size="sm" variant="muted"
									>Display keyboard shortcuts and key combinations</Text
								>

								<Stack direction="vertical" gap="md">
									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">Sizes</Text>
										<Flex direction="row" gap="md" align="center">
											<Kbd size="sm">Esc</Kbd>
											<Kbd size="md">Tab</Kbd>
											<Kbd size="lg">Enter</Kbd>
										</Flex>
									</Stack>

									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">Common Shortcuts</Text>
										<Flex direction="row" gap="lg" wrap>
											<Flex direction="row" gap="xs" align="center">
												<Kbd>⌘</Kbd>
												<Text size="sm">+</Text>
												<Kbd>K</Kbd>
												<Text size="sm" variant="muted">Search</Text>
											</Flex>
											<Flex direction="row" gap="xs" align="center">
												<Kbd>Ctrl</Kbd>
												<Text size="sm">+</Text>
												<Kbd>C</Kbd>
												<Text size="sm" variant="muted">Copy</Text>
											</Flex>
											<Flex direction="row" gap="xs" align="center">
												<Kbd>Ctrl</Kbd>
												<Text size="sm">+</Text>
												<Kbd>V</Kbd>
												<Text size="sm" variant="muted">Paste</Text>
											</Flex>
											<Flex direction="row" gap="xs" align="center">
												<Kbd>Shift</Kbd>
												<Text size="sm">+</Text>
												<Kbd>Del</Kbd>
												<Text size="sm" variant="muted">Delete</Text>
											</Flex>
										</Flex>
									</Stack>

									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">In Context</Text>
										<Card style="max-width: 500px;">
											<CardContent>
												<Stack direction="vertical" gap="sm">
													<Text size="sm">
														Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command menu
													</Text>
													<Text size="sm">
														Use <Kbd>↑</Kbd> and <Kbd>↓</Kbd> to navigate
													</Text>
													<Text size="sm">
														Press <Kbd>Enter</Kbd> to select an item
													</Text>
													<Text size="sm">
														Press <Kbd>Esc</Kbd> to close
													</Text>
												</Stack>
											</CardContent>
										</Card>
									</Stack>
								</Stack>
							</Stack>
						</Box>

						<Separator />

						<!-- EmptyState -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Empty State</Text>
								<Text size="sm" variant="muted"
									>Placeholder for when there's no data to display</Text
								>

								<Stack direction="vertical" gap="xl">
									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">Basic</Text>
										<Card>
											<CardContent>
												<EmptyState
													title="No results found"
													description="Try adjusting your search terms"
												/>
											</CardContent>
										</Card>
									</Stack>

									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">With Icon</Text>
										<Card>
											<CardContent>
												<EmptyState
													icon="🔍"
													title="No items yet"
													description="Start by creating your first item"
												/>
											</CardContent>
										</Card>
									</Stack>

									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">With Action Button</Text>
										<Card>
											<CardContent>
												<EmptyState
													icon="📭"
													title="Inbox empty"
													description="You're all caught up! Check back later for new messages."
												>
													<Button slot="action" variant="primary">Compose Message</Button>
												</EmptyState>
											</CardContent>
										</Card>
									</Stack>

									<Stack direction="vertical" gap="sm">
										<Text size="base" weight="medium">Sizes</Text>
										<Grid columns={2} columnsMobile={1} gap="lg">
											<Card>
												<CardContent>
													<EmptyState
														size="sm"
														icon="📝"
														title="No notes"
														description="Create your first note"
													/>
												</CardContent>
											</Card>
											<Card>
												<CardContent>
													<EmptyState
														size="lg"
														icon="🎉"
														title="All done!"
														description="You've completed all your tasks"
													/>
												</CardContent>
											</Card>
										</Grid>
									</Stack>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</TabsContent>
			</Tabs>
		</Stack>
	</Box>
</Container>

<style>
	:global(body) {
		background-color: var(--color-background);
	}
</style>
