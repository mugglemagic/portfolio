<script lang="ts">
	import SEO from '$lib/components/SEO.svelte'
	import { formatDate } from '$lib/utils/blog'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<SEO
	title="{data.title} | Mark Basford"
	description={data.description}
	type="article"
	publishedTime={data.date}
	tags={data.tags}
/>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">
	<header class="mb-16">
		<a
			href="/blog"
			class="label mb-8 inline-flex min-h-[44px] items-center gap-2 transition-transform hover:opacity-60"
		>
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
				<path d="m12 19-7-7 7-7" />
				<path d="M19 12H5" />
			</svg>
			Back to blog
		</a>

		<h1 class="mb-6">{data.title}</h1>

		<div class="flex flex-wrap items-center gap-3">
			<time datetime={data.date} class="label">
				{formatDate(data.date)}
			</time>
			{#if data.tags && data.tags.length > 0}
				<span class="text-border">|</span>
				{#each data.tags as tag (tag)}
					<span class="label">{tag}</span>
				{/each}
			{/if}
		</div>
	</header>

	<div class="prose">
		{#if data.content}
			<data.content />
		{/if}
	</div>
</article>
