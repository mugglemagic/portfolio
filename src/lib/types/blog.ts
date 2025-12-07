import type { Component } from 'svelte'

export interface BlogPostMeta {
	slug: string
	title: string
	date: string
	description: string
	tags: string[]
	published: boolean
}

export interface BlogPost extends BlogPostMeta {
	content: Component
}
