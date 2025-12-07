<script lang="ts">
	interface Props {
		title: string
		date: string
		description: string
		slug: string
		tags?: string[]
	}

	let { title, date, description, slug, tags = [] }: Props = $props()

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-GB', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}
</script>

<article class="group">
	<a
		href="/blog/{slug}"
		class="block border border-border rounded-xl p-8 transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
	>
		<div class="mb-4 flex flex-wrap items-center gap-3">
			<time datetime={date} class="label">
				{formatDate(date)}
			</time>
			{#if tags.length > 0}
				<span class="text-border">|</span>
				{#each tags as tag (tag)}
					<span class="label">{tag}</span>
				{/each}
			{/if}
		</div>

		<h2 class="mb-4 text-2xl font-normal transition-opacity group-hover:opacity-70">
			{title}
		</h2>

		<p class="mb-6 text-muted-foreground">
			{description}
		</p>

		<span class="label inline-flex items-center gap-2 transition-transform group-hover:translate-x-1">
			Read article
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M5 12h14" />
				<path d="m12 5 7 7-7 7" />
			</svg>
		</span>
	</a>
</article>
