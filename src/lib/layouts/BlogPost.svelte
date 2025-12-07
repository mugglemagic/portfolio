<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		title: string
		date: string
		description?: string
		tags?: string[]
		children: Snippet
	}

	let { title, date, tags = [], children }: Props = $props()

	// Calculate reading time (approximately 200 words per minute)
	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-GB', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}
</script>

<article class="prose mx-auto max-w-3xl px-4 py-8">
	<header class="mb-8">
		<h1 class="mb-4 text-4xl font-bold">{title}</h1>
		<div class="flex flex-wrap items-center gap-4 text-muted-foreground">
			<time datetime={date}>{formatDate(date)}</time>
			{#if tags.length > 0}
				<span aria-hidden="true">|</span>
				<div class="flex flex-wrap gap-2" role="list" aria-label="Tags">
					{#each tags as tag (tag)}
						<span
							role="listitem"
							class="rounded-full bg-muted px-3 py-1 text-sm"
						>
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>
	</header>

	<div class="prose-content">
		{@render children()}
	</div>
</article>

<style>
	.prose-content :global(h2) {
		font-size: 1.75rem;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.prose-content :global(h3) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	.prose-content :global(p) {
		margin-bottom: 1.25rem;
		line-height: 1.75;
	}

	.prose-content :global(a) {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.prose-content :global(ul),
	.prose-content :global(ol) {
		margin-bottom: 1.25rem;
		padding-left: 1.5rem;
	}

	.prose-content :global(li) {
		margin-bottom: 0.5rem;
	}

	.prose-content :global(pre) {
		background-color: var(--color-muted);
		border-radius: 0.5rem;
		padding: 1rem;
		overflow-x: auto;
		margin-bottom: 1.25rem;
	}

	.prose-content :global(code) {
		font-family: var(--font-mono);
		font-size: 0.875rem;
	}

	.prose-content :global(:not(pre) > code) {
		background-color: var(--color-muted);
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
	}

	.prose-content :global(blockquote) {
		border-left: 4px solid var(--color-border);
		padding-left: 1rem;
		font-style: italic;
		margin-bottom: 1.25rem;
	}
</style>
