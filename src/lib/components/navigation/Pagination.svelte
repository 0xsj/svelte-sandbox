<script lang="ts">
	export let currentPage: number = 1;
	export let totalPages: number = 1;
	export let showFirstLast: boolean = true;
	export let showPrevNext: boolean = true;
	export let maxVisiblePages: number = 5;
	let className = '';
	export { className as class };

	$: classes = ['pagination', className].filter(Boolean).join(' ');
	$: canGoPrev = currentPage > 1;
	$: canGoNext = currentPage < totalPages;

	function handlePageChange(page: number) {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			currentPage = page;
		}
	}

	function getVisiblePages(): (number | string)[] {
		if (totalPages <= maxVisiblePages) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const pages: (number | string)[] = [];
		const halfVisible = Math.floor(maxVisiblePages / 2);

		let startPage = Math.max(1, currentPage - halfVisible);
		let endPage = Math.min(totalPages, currentPage + halfVisible);

		// Adjust if at the beginning
		if (currentPage <= halfVisible) {
			endPage = maxVisiblePages;
		}

		// Adjust if at the end
		if (currentPage >= totalPages - halfVisible) {
			startPage = totalPages - maxVisiblePages + 1;
		}

		// Add first page and ellipsis
		if (startPage > 1) {
			pages.push(1);
			if (startPage > 2) {
				pages.push('...');
			}
		}

		// Add visible pages
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		// Add last page and ellipsis
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pages.push('...');
			}
			pages.push(totalPages);
		}

		return pages;
	}

	$: visiblePages = getVisiblePages();
</script>

<nav class={classes} aria-label="Pagination" {...$$restProps}>
	<ul class="pagination-list">
		<!-- First button -->
		{#if showFirstLast}
			<li>
				<button
					type="button"
					class="pagination-button"
					disabled={!canGoPrev}
					on:click={() => handlePageChange(1)}
					aria-label="Go to first page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="11 17 6 12 11 7"></polyline>
						<polyline points="18 17 13 12 18 7"></polyline>
					</svg>
				</button>
			</li>
		{/if}

		<!-- Previous button -->
		{#if showPrevNext}
			<li>
				<button
					type="button"
					class="pagination-button"
					disabled={!canGoPrev}
					on:click={() => handlePageChange(currentPage - 1)}
					aria-label="Go to previous page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</button>
			</li>
		{/if}

		<!-- Page numbers -->
		{#each visiblePages as page}
			<li>
				{#if page === '...'}
					<span class="pagination-ellipsis">...</span>
				{:else}
					<button
						type="button"
						class="pagination-button"
						class:active={page === currentPage}
						on:click={() => typeof page === 'number' && handlePageChange(page)}
						aria-label="Go to page {page}"
						aria-current={page === currentPage ? 'page' : undefined}
					>
						{page}
					</button>
				{/if}
			</li>
		{/each}

		<!-- Next button -->
		{#if showPrevNext}
			<li>
				<button
					type="button"
					class="pagination-button"
					disabled={!canGoNext}
					on:click={() => handlePageChange(currentPage + 1)}
					aria-label="Go to next page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
			</li>
		{/if}

		<!-- Last button -->
		{#if showFirstLast}
			<li>
				<button
					type="button"
					class="pagination-button"
					disabled={!canGoNext}
					on:click={() => handlePageChange(totalPages)}
					aria-label="Go to last page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="13 17 18 12 13 7"></polyline>
						<polyline points="6 17 11 12 6 7"></polyline>
					</svg>
				</button>
			</li>
		{/if}
	</ul>
</nav>

<style>
	.pagination {
		display: flex;
		justify-content: center;
	}

	.pagination-list {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.pagination-button {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 36px;
		height: 36px;
		padding: 0 var(--spacing-sm);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-foreground);
		background-color: transparent;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-normal);
		font-family: inherit;
	}

	.pagination-button:hover:not(:disabled) {
		background-color: var(--color-accent);
	}

	.pagination-button:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	.pagination-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	.pagination-button.active {
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
		border-color: var(--color-primary);
	}

	.pagination-ellipsis {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		color: var(--color-muted-foreground);
		font-size: var(--font-size-sm);
	}
</style>
