// @ts-nocheck
import { getPosts } from '$lib/utils/blog'
import type { PageServerLoad } from './$types'

export const load = async () => {
	const posts = await getPosts()
	return { posts }
}
;null as any as PageServerLoad;