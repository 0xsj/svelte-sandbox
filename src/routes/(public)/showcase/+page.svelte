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
	import Slider from '$lib/components/forms/Slider.svelte';
	import Toggle from '$lib/components/forms/Toggle.svelte';
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
	import Table from '$lib/components/display/table/Table.svelte';
	import TableHeader from '$lib/components/display/table/TableHeader.svelte';
	import TableBody from '$lib/components/display/table/TableBody.svelte';
	import TableRow from '$lib/components/display/table/TableRow.svelte';
	import TableHead from '$lib/components/display/table/TableHead.svelte';
	import TableCell from '$lib/components/display/table/TableCell.svelte';
	import TableCaption from '$lib/components/display/table/TableCaption.svelte';
	import Accordion from '$lib/components/display/accordion/Accordion.svelte';
	import AccordionItem from '$lib/components/display/accordion/AccordionItem.svelte';
	import Popover from '$lib/components/overlays/popover/Popover.svelte';
	import PopoverTrigger from '$lib/components/overlays/popover/PopoverTrigger.svelte';
	import PopoverContent from '$lib/components/overlays/popover/PopoverContent.svelte';
	import DropdownMenu from '$lib/components/overlays/dropdown-menu/DropdownMenu.svelte';
	import DropdownMenuTrigger from '$lib/components/overlays/dropdown-menu/DropdownMenuTrigger.svelte';
	import DropdownMenuContent from '$lib/components/overlays/dropdown-menu/DropdownMenuContent.svelte';
	import DropdownMenuItem from '$lib/components/overlays/dropdown-menu/DropdownMenuItem.svelte';
	import DropdownMenuSeparator from '$lib/components/overlays/dropdown-menu/DropdownMenuSeparator.svelte';
	import DropdownMenuLabel from '$lib/components/overlays/dropdown-menu/DropdownMenuLabel.svelte';
	import Sheet from '$lib/components/overlays/sheet/Sheet.svelte';
	import SheetTrigger from '$lib/components/overlays/sheet/SheetTrigger.svelte';
	import SheetContent from '$lib/components/overlays/sheet/SheetContent.svelte';
	import SheetClose from '$lib/components/overlays/sheet/SheetClose.svelte';
	import Combobox from '$lib/components/forms/combobox/Combobox.svelte';
	import ComboboxTrigger from '$lib/components/forms/combobox/ComboboxTrigger.svelte';
	import ComboboxContent from '$lib/components/forms/combobox/ComboboxContent.svelte';
	import ComboboxInput from '$lib/components/forms/combobox/ComboboxInput.svelte';
	import ComboboxItem from '$lib/components/forms/combobox/ComboboxItem.svelte';
	import Breadcrumbs from '$lib/components/navigation/breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbItem from '$lib/components/navigation/breadcrumbs/BreadcrumbItem.svelte';
	import Pagination from '$lib/components/navigation/Pagination.svelte';
	import { toast } from '$lib/components/feedback/toast/toast.store';

	let selectedTab = 'buttons';
	let dialogOpen = false;
	let sheetOpen = false;
	let radioValue = 'option1';
	let switchChecked = false;
	let checkboxChecked = false;
	let showSuccessAlert = true;
	let progressValue = 45;
	let sliderValue = 50;
	let togglePressed = false;
	let comboboxValue = '';
	let currentPage = 1;

	const frameworks = [
		{ value: 'next', label: 'Next.js' },
		{ value: 'sveltekit', label: 'SvelteKit' },
		{ value: 'nuxt', label: 'Nuxt.js' },
		{ value: 'remix', label: 'Remix' },
		{ value: 'astro', label: 'Astro' }
	];

	const tableData = [
		{ invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
		{ invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
		{ invoice: 'INV003', status: 'Paid', method: 'Bank Transfer', amount: '$350.00' },
		{ invoice: 'INV004', status: 'Failed', method: 'Credit Card', amount: '$450.00' }
	];
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
					<TabsTrigger value="buttons">Buttons & Forms</TabsTrigger>
					<TabsTrigger value="display">Display & Data</TabsTrigger>
					<TabsTrigger value="overlays">Overlays & Menus</TabsTrigger>
					<TabsTrigger value="feedback">Feedback & Loading</TabsTrigger>
					<TabsTrigger value="navigation">Navigation</TabsTrigger>
					<TabsTrigger value="layout">Layout</TabsTrigger>
				</TabsList>

				<!-- Buttons & Forms Tab -->
				<TabsContent value="buttons">
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

						<!-- Form Inputs -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Form Inputs</Text>
								<Card style="max-width: 600px;">
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
										</Stack>
									</CardContent>
								</Card>
							</Stack>
						</Box>

						<Separator />

						<!-- Advanced Form Controls -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Advanced Form Controls</Text>

								<Card style="max-width: 600px;">
									<CardContent>
										<Stack direction="vertical" gap="lg">
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

											<!-- Slider -->
											<Stack direction="vertical" gap="sm">
												<Label>Volume: {sliderValue}</Label>
												<Slider bind:value={sliderValue} showValue />
											</Stack>

											<!-- Toggle -->
											<Stack direction="vertical" gap="sm">
												<Label>Toggle Button</Label>
												<Flex direction="row" gap="sm">
													<Toggle bind:pressed={togglePressed}>
														<strong>B</strong>
													</Toggle>
													<Toggle size="md" variant="outline">
														<em>I</em>
													</Toggle>
													<Toggle size="md" variant="outline">
														<u>U</u>
													</Toggle>
												</Flex>
											</Stack>

											<!-- Combobox -->
											<Stack direction="vertical" gap="sm">
												<Label>Framework</Label>
												<Combobox bind:value={comboboxValue}>
													<ComboboxTrigger placeholder="Select framework..." />
													<ComboboxContent>
														<ComboboxInput placeholder="Search frameworks..." />
														{#each frameworks as framework}
															<ComboboxItem value={framework.value} label={framework.label}>
																{framework.label}
															</ComboboxItem>
														{/each}
													</ComboboxContent>
												</Combobox>
											</Stack>
										</Stack>
									</CardContent>
								</Card>
							</Stack>
						</Box>
					</Stack>
				</TabsContent>

				<!-- Display & Data Tab -->
				<TabsContent value="display">
					<Stack direction="vertical" gap="3xl">
						<!-- Typography -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Typography</Text>
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

						<!-- Badges & Avatars -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Badges</Text>
								<Flex direction="row" gap="md" wrap>
									<Badge variant="default">Default</Badge>
									<Badge variant="primary">Primary</Badge>
									<Badge variant="secondary">Secondary</Badge>
									<Badge variant="success">Success</Badge>
									<Badge variant="warning">Warning</Badge>
									<Badge variant="error">Error</Badge>
									<Badge variant="outline">Outline</Badge>
								</Flex>
								<Text size="base" weight="medium">With status dots:</Text>
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
								<Flex direction="row" gap="md" align="center" wrap>
									<Avatar fallback="JD" size="sm" />
									<Avatar fallback="AB" size="md" />
									<Avatar fallback="XY" size="lg" />
									<Avatar fallback="MK" size="xl" />
								</Flex>
							</Stack>
						</Box>

						<Separator />

						<!-- Cards -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Cards</Text>
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
							</Stack>
						</Box>

						<Separator />

						<!-- Table -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Table</Text>
								<Table>
									<TableCaption>A list of recent transactions</TableCaption>
									<TableHeader>
										<TableRow>
											<TableHead>Invoice</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Method</TableHead>
											<TableHead align="right">Amount</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{#each tableData as row}
											<TableRow>
												<TableCell>{row.invoice}</TableCell>
												<TableCell>
													<Badge
														variant={row.status === 'Paid'
															? 'success'
															: row.status === 'Pending'
																? 'warning'
																: 'error'}
													>
														{row.status}
													</Badge>
												</TableCell>
												<TableCell>{row.method}</TableCell>
												<TableCell align="right">{row.amount}</TableCell>
											</TableRow>
										{/each}
									</TableBody>
								</Table>
							</Stack>
						</Box>

						<Separator />

						<!-- Accordion -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Accordion</Text>
								<Text size="sm" variant="muted">Single mode - only one open at a time</Text>
								<Accordion type="single">
									<AccordionItem value="item-1" title="What is SvelteKit?">
										SvelteKit is a framework for building web applications of all sizes, with a
										beautiful development experience and flexible filesystem-based routing.
									</AccordionItem>
									<AccordionItem value="item-2" title="How do I get started?">
										Install SvelteKit with npm create svelte@latest, then follow the prompts to set
										up your project.
									</AccordionItem>
									<AccordionItem value="item-3" title="Where can I learn more?">
										Visit the official documentation at kit.svelte.dev for comprehensive guides and
										tutorials.
									</AccordionItem>
								</Accordion>
							</Stack>
						</Box>

						<Separator />

						<!-- Kbd -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Keyboard Shortcuts</Text>
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
										<Kbd>Esc</Kbd>
										<Text size="sm" variant="muted">Close</Text>
									</Flex>
								</Flex>
							</Stack>
						</Box>
					</Stack>
				</TabsContent>

				<!-- Overlays & Menus Tab -->
				<TabsContent value="overlays">
					<Stack direction="vertical" gap="3xl">
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

						<Separator />

						<!-- Sheet -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Sheet</Text>
								<Text size="sm" variant="muted">Slide-in panels from the side</Text>
								<Flex direction="row" gap="md" wrap>
									<Sheet bind:open={sheetOpen}>
										<SheetTrigger>
											<Button variant="outline">Open Sheet (Right)</Button>
										</SheetTrigger>
										<SheetContent side="right">
											<SheetClose />
											<Stack direction="vertical" gap="lg">
												<Text size="xl" weight="semibold">Sheet Title</Text>
												<Text size="sm" variant="muted">
													This is a sheet that slides in from the right side of the screen.
												</Text>
												<Separator />
												<Text size="sm">
													Sheets are useful for forms, filters, or any content that needs temporary
													focus without completely blocking the main view.
												</Text>
											</Stack>
										</SheetContent>
									</Sheet>
								</Flex>
							</Stack>
						</Box>

						<Separator />

						<!-- Dropdown Menu -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Dropdown Menu</Text>
								<Text size="sm" variant="muted">Action menus with items and separators</Text>
								<DropdownMenu>
									<DropdownMenuTrigger>
										<Button variant="outline">Open Menu</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent side="bottom" align="start">
										<DropdownMenuLabel>My Account</DropdownMenuLabel>
										<DropdownMenuItem>Profile</DropdownMenuItem>
										<DropdownMenuItem>Settings</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>Logout</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</Stack>
						</Box>

						<Separator />

						<!-- Popover -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Popover</Text>
								<Text size="sm" variant="muted">Floating content boxes</Text>
								<Popover>
									<PopoverTrigger>
										<Button variant="outline">Open Popover</Button>
									</PopoverTrigger>
									<PopoverContent side="bottom" align="center">
										<Stack direction="vertical" gap="sm">
											<Text size="base" weight="semibold">Popover Title</Text>
											<Text size="sm" variant="muted">
												This is popover content that floats above other elements.
											</Text>
										</Stack>
									</PopoverContent>
								</Popover>
							</Stack>
						</Box>

						<Separator />

						<!-- Tooltip -->
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
					</Stack>
				</TabsContent>

				<!-- Feedback & Loading Tab -->
				<TabsContent value="feedback">
					<Stack direction="vertical" gap="3xl">
						<!-- Alerts -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Alerts</Text>
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
										<AlertDescription
											>Please review your settings before proceeding.</AlertDescription
										>
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

						<!-- Toast -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Toast Notifications</Text>
								<Text size="sm" variant="muted">Global notification system</Text>
								<Flex direction="row" gap="md" wrap>
									<Button
										variant="outline"
										on:click={() => toast.success('Success!', 'Your changes have been saved.')}
									>
										Show Success
									</Button>
									<Button
										variant="outline"
										on:click={() => toast.error('Error!', 'Something went wrong.')}
									>
										Show Error
									</Button>
									<Button
										variant="outline"
										on:click={() => toast.info('Info', 'This is an informational message.')}
									>
										Show Info
									</Button>
									<Button
										variant="outline"
										on:click={() => toast.warning('Warning', 'Please review your changes.')}
									>
										Show Warning
									</Button>
								</Flex>
							</Stack>
						</Box>

						<Separator />

						<!-- Spinner -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Spinner</Text>
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
							</Stack>
						</Box>

						<Separator />

						<!-- Progress -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Progress</Text>
								<Stack direction="vertical" gap="md">
									<Progress value={progressValue} showLabel />
									<Progress value={60} variant="primary" showLabel />
									<Progress value={80} variant="success" showLabel />
									<Progress value={50} variant="warning" showLabel />
									<Progress value={30} variant="error" showLabel />
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
								<Stack direction="vertical" gap="md">
									<Skeleton variant="text" lines={3} />
									<Flex direction="row" gap="md">
										<Skeleton variant="circular" width="48px" height="48px" />
										<Stack direction="vertical" gap="xs" style="flex: 1;">
											<Skeleton variant="text" />
											<Skeleton variant="text" width="60%" />
										</Stack>
									</Flex>
									<Skeleton variant="rectangular" height="200px" />
								</Stack>
							</Stack>
						</Box>

						<Separator />

						<!-- Empty State -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Empty State</Text>
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
						</Box>
					</Stack>
				</TabsContent>

				<!-- Navigation Tab -->
				<TabsContent value="navigation">
					<Stack direction="vertical" gap="3xl">
						<!-- Breadcrumbs -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Breadcrumbs</Text>
								<Text size="sm" variant="muted">Navigation trail</Text>
								<Breadcrumbs>
									<BreadcrumbItem href="/">Home</BreadcrumbItem>
									<BreadcrumbItem href="/products">Products</BreadcrumbItem>
									<BreadcrumbItem href="/products/electronics">Electronics</BreadcrumbItem>
									<BreadcrumbItem current>Laptop</BreadcrumbItem>
								</Breadcrumbs>

								<Text size="sm" variant="muted">Custom separator:</Text>
								<Breadcrumbs separator=">">
									<BreadcrumbItem href="/">Home</BreadcrumbItem>
									<BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
									<BreadcrumbItem current>Components</BreadcrumbItem>
								</Breadcrumbs>
							</Stack>
						</Box>

						<Separator />

						<!-- Pagination -->
						<Box as="section">
							<Stack direction="vertical" gap="lg">
								<Text size="2xl" weight="semibold">Pagination</Text>
								<Text size="sm" variant="muted">Page navigation</Text>
								<Pagination bind:currentPage totalPages={20} />
								<Text size="sm" variant="muted">Current page: {currentPage}</Text>
							</Stack>
						</Box>
					</Stack>
				</TabsContent>

				<!-- Layout Tab -->
				<TabsContent value="layout">
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
			</Tabs>
		</Stack>
	</Box>
</Container>

<style>
	:global(body) {
		background-color: var(--color-background);
	}
</style>
