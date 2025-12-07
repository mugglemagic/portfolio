import type { BlogPostMeta } from '$lib/types/blog'

/**
 * Get all published blog posts, sorted by date (newest first)
 */
export async function getPosts(): Promise<BlogPostMeta[]> {
	const modules = import.meta.glob<{ metadata: BlogPostMeta }>(
		'/src/content/blog/*.md',
		{ eager: true }
	)

	const posts: BlogPostMeta[] = []

	for (const [path, module] of Object.entries(modules)) {
		if (module.metadata?.published) {
			const slug = path.split('/').pop()?.replace('.md', '') ?? ''
			posts.push({
				...module.metadata,
				slug
			})
		}
	}

	return posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	)
}

/**
 * Get a single blog post by slug
 */
export async function getPost(slug: string) {
	try {
		const post = await import(`../../content/blog/${slug}.md`)
		return {
			content: post.default,
			metadata: post.metadata as BlogPostMeta
		}
	} catch {
		return null
	}
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}

/**
 * Calculate estimated reading time in minutes
 */
export function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200
	const words = content.trim().split(/\s+/).length
	return Math.ceil(words / wordsPerMinute)
}
