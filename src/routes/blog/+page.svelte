<script lang="ts">
	import SEO from '$lib/components/SEO.svelte'
	import BlogCard from '$lib/components/BlogCard.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<SEO
	title="Blog | Mark Basford"
	description="Thoughts on accessibility, frontend development, and building inclusive web experiences."
/>

<div class="mx-auto max-w-3xl px-6 py-16 md:py-24">
	<p class="label mb-4">Blog</p>
	<h1 class="mb-8">Writing</h1>
	<p class="mb-16 max-w-xl text-xl text-muted-foreground">
		Thoughts on accessibility, frontend development, and building inclusive web experiences.
	</p>

	{#if data.posts.length > 0}
		<div class="space-y-8">
			{#each data.posts as post (post.slug)}
				<BlogCard
					title={post.title}
					date={post.date}
					description={post.description}
					slug={post.slug}
					tags={post.tags}
				/>
			{/each}
		</div>
	{:else}
		<p class="text-muted-foreground">
			No blog posts yet. Check back soon!
		</p>
	{/if}
</div>
