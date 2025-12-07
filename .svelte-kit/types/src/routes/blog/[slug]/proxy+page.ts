// @ts-nocheck
import { getPost } from '$lib/utils/blog'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
	const post = await getPost(params.slug)

	if (!post) {
		throw error(404, 'Post not found')
	}

	return {
		content: post.content,
		...post.metadata
	}
}
