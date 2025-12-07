<script lang="ts">
	import { page } from '$app/stores'
	import ModeToggle from './ModeToggle.svelte'
	import { cn } from '$lib/utils/cn'

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/blog', label: 'Blog' }
	] as const

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') {
			return pathname === '/'
		}
		return pathname.startsWith(href)
	}
</script>

<header class="border-b border-border">
	<div class="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
		<a
			href="/"
			class="text-lg font-medium tracking-tight transition-opacity hover:opacity-60"
		>
			Mark Basford
		</a>

		<nav aria-label="Main navigation" class="flex items-center gap-1">
			{#each navLinks as link (link.href)}
				<a
					href={link.href}
					class={cn(
						'min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 text-sm transition-opacity',
						'hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
						isActive(link.href, $page.url.pathname)
							? 'opacity-100'
							: 'opacity-60'
					)}
					aria-current={isActive(link.href, $page.url.pathname) ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
			<ModeToggle />
		</nav>
	</div>
</header>
