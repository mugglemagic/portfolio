<script lang="ts">
	import { page } from '$app/stores'

	interface Props {
		title?: string
		description?: string
		image?: string
		type?: 'website' | 'article'
		publishedTime?: string
		author?: string
		tags?: string[]
	}

	let {
		title = 'Mark Basford | Frontend Architect & Accessibility Specialist',
		description = 'Frontend architect specialising in accessibility-first development. Building inclusive web experiences with modern JavaScript frameworks.',
		image = '/headshot.jpg',
		type = 'website',
		publishedTime,
		author = 'Mark Basford',
		tags = []
	}: Props = $props()

	const siteUrl = 'https://markbasford.com'
	const fullUrl = $derived(`${siteUrl}${$page.url.pathname}`)
	const fullImageUrl = $derived(image.startsWith('http') ? image : `${siteUrl}${image}`)

	// JSON-LD structured data
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Mark Basford',
		url: siteUrl,
		jobTitle: 'Frontend Architect',
		description: 'Frontend architect specialising in accessibility-first development',
		sameAs: [
			'https://www.linkedin.com/in/mark-basford-78a43390/',
			'https://github.com/mugglemagic'
		],
		knowsAbout: [
			'Web Accessibility',
			'Frontend Development',
			'React',
			'Vue',
			'SvelteKit',
			'TypeScript',
			'PHP',
			'Laravel'
		]
	}

	const articleSchema = $derived(
		type === 'article' && publishedTime
			? {
					'@context': 'https://schema.org',
					'@type': 'BlogPosting',
					headline: title,
					description: description,
					datePublished: publishedTime,
					author: {
						'@type': 'Person',
						name: author,
						url: siteUrl
					},
					publisher: {
						'@type': 'Person',
						name: author
					}
				}
			: null
	)
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={fullUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter/X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullImageUrl} />

	<!-- Article-specific meta -->
	{#if type === 'article'}
		<meta name="author" content={author} />
		{#if publishedTime}
			<meta property="article:published_time" content={publishedTime} />
		{/if}
		<meta property="article:author" content={author} />
		{#if tags.length > 0}
			<meta property="article:tag" content={tags.join(', ')} />
		{/if}
	{/if}

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
	{#if articleSchema}
		{@html `<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>`}
	{/if}
</svelte:head>
