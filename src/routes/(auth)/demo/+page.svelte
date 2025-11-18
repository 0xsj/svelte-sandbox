<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import { authStore } from '$lib/stores/auth';
	import { uiStore } from '$lib/stores/ui';
	import { usersStore, userStore } from '$lib/stores/queries/users';
	import { createUserMutation } from '$lib/stores/mutations/users';

	let selectedUserId = '1';

	// Reactive subscriptions with $ prefix
	$: isAuthenticated = $authStore.isAuthenticated;
	$: sidebarOpen = $uiStore.sidebarOpen;
	$: users = $usersStore;
	$: selectedUser = $userStore;
	$: createUser = $createUserMutation;

	// Fetch users on mount
	onMount(() => {
		usersStore.fetch();
		userStore.fetch(selectedUserId);
	});

	// Reactive: fetch user when selection changes
	$: if (selectedUserId) {
		userStore.fetch(selectedUserId);
	}

	function handleLogin() {
		console.log('🔐 [Demo] Simulating login...');
		authStore.setTokens('mock-access-token-12345', 'mock-refresh-token-67890');
	}

	function handleLogout() {
		console.log('🚪 [Demo] Logging out...');
		authStore.logout();
	}

	function handleCreateUser() {
		console.log('👤 [Demo] Creating new user...');
		createUserMutation.mutate({
			email: `user${Date.now()}@example.com`,
			name: `User ${Date.now()}`,
			role: 'user'
		});
	}

	function handleTestDeduplication() {
		console.log('🔄 [Demo] Testing request deduplication - firing 5 identical requests...');

		// Fire 5 requests - our store's stale-time should deduplicate
		Promise.all([
			usersStore.fetch(),
			usersStore.fetch(),
			usersStore.fetch(),
			usersStore.fetch(),
			usersStore.fetch()
		]).then(() => {
			console.log('✅ [Demo] All requests completed (check console for deduplication)');
		});
	}
</script>

<div class="container">
	<h1>🧪 API Infrastructure Demo (SvelteKit)</h1>

	<!-- Auth State -->
	<section class="section">
		<h2>1. Auth State (Svelte Store)</h2>
		<p>Status: {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}</p>
		<div class="button-group">
			<Button on:click={handleLogin} disabled={isAuthenticated}>Login</Button>
			<Button on:click={handleLogout} disabled={!isAuthenticated} variant="destructive">
				Logout
			</Button>
		</div>
		<p class="hint">💡 Check console and localStorage to see token storage</p>
	</section>

	<!-- UI State -->
	<section class="section">
		<h2>2. UI State (Svelte Store)</h2>
		<p>Sidebar: {sidebarOpen ? '👁️ Open' : '🙈 Closed'}</p>
		<Button on:click={() => uiStore.toggleSidebar()}>Toggle Sidebar</Button>
		<p class="hint">💡 Refresh page - state persists via localStorage</p>
	</section>

	<!-- User List -->
	<section class="section">
		<h2>3. Fetch Users (Svelte Store)</h2>

		{#if users.isLoading}
			<p>Loading users...</p>
		{:else if users.isError}
			<p style="color: red;">Error: {users.error?.message}</p>
		{:else if users.data}
			<div>
				<p>Found {users.data.length} users</p>
				<ul class="user-list">
					{#each users.data as user}
						<li>
							<button
								on:click={() => (selectedUserId = user.id)}
								class:active={selectedUserId === user.id}
							>
								{user.name} ({user.email})
							</button>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<Button on:click={() => usersStore.fetch(true)}>Refetch Users</Button>
		<p class="hint">💡 Store has 5min stale time - rapid refetches are deduplicated</p>
	</section>

	<!-- Selected User -->
	<section class="section">
		<h2>4. Selected User Detail</h2>
		{#if selectedUser.isLoading}
			<p>Loading user...</p>
		{:else if selectedUser.data}
			<div class="user-card">
				<p><strong>ID:</strong> {selectedUser.data.id}</p>
				<p><strong>Name:</strong> {selectedUser.data.name}</p>
				<p><strong>Email:</strong> {selectedUser.data.email}</p>
				<p><strong>Role:</strong> {selectedUser.data.role}</p>
			</div>
		{:else}
			<p>Select a user from the list</p>
		{/if}
	</section>

	<!-- Create User -->
	<section class="section">
		<h2>5. Create User (Mutation)</h2>
		<Button on:click={handleCreateUser} disabled={createUser.isPending}>
			{createUser.isPending ? 'Creating...' : 'Create Random User'}
		</Button>

		{#if createUser.isSuccess}
			<p style="color: green;">✅ User created! List auto-refreshed</p>
		{/if}
		{#if createUser.isError}
			<p style="color: red;">❌ Error: {createUser.error?.message}</p>
		{/if}

		<p class="hint">💡 Creates user → Invalidates cache → List auto-refreshes</p>
	</section>

	<!-- Deduplication Test -->
	<section class="section">
		<h2>6. Request Deduplication Test</h2>
		<Button on:click={handleTestDeduplication}>Fire 5 Identical Requests</Button>
		<p class="hint">💡 Check console - stale-time prevents redundant fetches</p>
	</section>

	<!-- Instructions -->
	<section class="section">
		<h2>📝 Check Your Console</h2>
		<ul>
			<li>Store logs show which methods are called</li>
			<li>API client logs show requests/responses</li>
			<li>Network tab shows actual HTTP requests</li>
			<li>Compare with Next.js version - different patterns, same result!</li>
		</ul>
	</section>
</div>

<style>
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: var(--spacing-2xl);
	}

	.section {
		margin-bottom: var(--spacing-3xl);
		padding: var(--spacing-xl);
		background-color: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.section h2 {
		margin-bottom: var(--spacing-lg);
		color: var(--color-primary);
	}

	.button-group {
		display: flex;
		gap: var(--spacing-md);
		margin: var(--spacing-md) 0;
	}

	.hint {
		margin-top: var(--spacing-md);
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--color-muted);
		border-left: 3px solid var(--color-primary);
		font-size: var(--font-size-sm);
		color: var(--color-muted-foreground);
	}

	.user-list {
		list-style: none;
		padding: 0;
		margin: var(--spacing-md) 0;
	}

	.user-list li {
		margin-bottom: var(--spacing-sm);
	}

	.user-list button {
		width: 100%;
		text-align: left;
		padding: var(--spacing-md);
		background-color: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.user-list button:hover {
		background-color: var(--color-accent);
	}

	.user-list button.active {
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
		border-color: var(--color-primary);
	}

	.user-card {
		padding: var(--spacing-lg);
		background-color: var(--color-muted);
		border-radius: var(--radius-md);
	}

	.user-card p {
		margin-bottom: var(--spacing-sm);
	}
</style>
