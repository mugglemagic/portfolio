<script lang="ts">
	import { cn } from '$lib/utils/cn'

	interface Props {
		class?: string
	}

	let { class: className }: Props = $props()

	const links = [
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/mark-basford-78a43390/',
			icon: 'linkedin'
		},
		{
			name: 'GitHub',
			url: 'https://github.com/mugglemagic',
			icon: 'github'
		}
	] as const
</script>

<nav aria-label="Social links" class={cn('flex items-center gap-2', className)}>
	{#each links as link (link.name)}
		<a
			href={link.url}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
			aria-label="{link.name} (opens in new tab)"
		>
			{#if link.icon === 'linkedin'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
					<rect width="4" height="12" x="2" y="9" />
					<circle cx="4" cy="4" r="2" />
				</svg>
			{:else if link.icon === 'github'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
					<path d="M9 18c-4.51 2-5-2-7-2" />
				</svg>
			{/if}
		</a>
	{/each}
</nav>
