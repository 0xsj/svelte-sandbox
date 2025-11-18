<script>
	import Container from '$lib/components/layout/Container.svelte';
	import Box from '$lib/components/layout/Box.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Flex from '$lib/components/layout/Flex.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Text from '$lib/components/display/Text.svelte';
	import Label from '$lib/components/forms/Label.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Badge from '$lib/components/display/Badge.svelte';
	import Separator from '$lib/components/display/Separator.svelte';
	import Checkbox from '$lib/components/forms/Checkbox.svelte';
</script>

<Container size="xl">
	<Box py="4xl">
		<Stack direction="vertical" gap="4xl">
			<!-- Hero Section -->
			<Box style="text-align: center;">
				<Stack direction="vertical" gap="md">
					<Text size="5xl" weight="bold">Welcome to Customer Feedback</Text>
					<Text size="xl" variant="muted">
						A multi-tenant SaaS platform for managing customer feedback
					</Text>
				</Stack>
			</Box>

			<Separator spacing="xl" />

			<!-- Button Variants -->
			<Box as="section">
				<Stack direction="vertical" gap="lg">
					<Text size="2xl" weight="semibold">Button Variants</Text>
					<Flex direction="row" gap="md" wrap="wrap">
						<Button variant="primary">Primary</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="destructive">Destructive</Button>
					</Flex>
				</Stack>
			</Box>

			<Separator />

			<!-- Button Sizes -->
			<Box as="section">
				<Stack direction="vertical" gap="lg">
					<Text size="2xl" weight="semibold">Button Sizes</Text>
					<Flex direction="row" gap="md" align="center" wrap="wrap">
						<Button size="sm">Small</Button>
						<Button size="md">Medium</Button>
						<Button size="lg">Large</Button>
					</Flex>
				</Stack>
			</Box>

			<Separator />

			<!-- Typography -->
			<Box as="section">
				<Stack direction="vertical" gap="lg">
					<Text size="2xl" weight="semibold">Typography</Text>
					<Stack direction="vertical" gap="sm">
						<Text size="5xl" weight="bold">Heading 5XL</Text>
						<Text size="4xl" weight="bold">Heading 4XL</Text>
						<Text size="3xl" weight="bold">Heading 3XL</Text>
						<Text size="2xl" weight="semibold">Heading 2XL</Text>
						<Text size="xl" weight="medium">Heading XL</Text>
						<Text size="base">Base text for body content</Text>
						<Text size="sm" variant="muted">Small muted text</Text>
					</Stack>
				</Stack>
			</Box>

			<Separator />

			<!-- Badges -->
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
					<Text size="sm" variant="muted">With status dots:</Text>
					<Flex direction="row" gap="md" wrap>
						<Badge variant="success" dot>Active</Badge>
						<Badge variant="warning" dot>Pending</Badge>
						<Badge variant="error" dot>Inactive</Badge>
					</Flex>
				</Stack>
			</Box>

			<Separator />

			<!-- Form Elements -->
			<Box as="section">
				<Stack direction="vertical" gap="lg">
					<Text size="2xl" weight="semibold">Form Elements</Text>
					<Stack direction="vertical" gap="md" style="max-width: 400px;">
						<Stack direction="vertical" gap="sm">
							<Label htmlFor="name" required>Full Name</Label>
							<Input id="name" type="text" placeholder="John Doe" />
						</Stack>

						<Stack direction="vertical" gap="sm">
							<Label htmlFor="email" required>Email Address</Label>
							<Input id="email" type="email" placeholder="you@example.com" />
						</Stack>

						<Stack direction="vertical" gap="sm">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" placeholder="••••••••" />
						</Stack>

						<Flex direction="row" gap="sm" align="center">
							<Checkbox id="terms" />
							<Label htmlFor="terms">I agree to the terms and conditions</Label>
						</Flex>

						<Flex direction="row" gap="sm" align="center">
							<Checkbox id="newsletter" />
							<Label htmlFor="newsletter">Subscribe to newsletter</Label>
						</Flex>

						<Button variant="primary" style="width: 100%;">Submit</Button>
					</Stack>
				</Stack>
			</Box>
		</Stack>
	</Box>
</Container>
