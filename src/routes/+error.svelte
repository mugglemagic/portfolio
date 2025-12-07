<script lang="ts">
	import { page } from '$app/stores'
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
	<p class="label mb-4">Error</p>
	<h1 class="mb-6">{$page.status}</h1>
	<p class="mb-12 max-w-md text-xl text-muted-foreground">
		{#if $page.status === 404}
			The page you're looking for doesn't exist.
		{:else}
			Something went wrong. Please try again later.
		{/if}
	</p>
	<a
		href="/"
		class="label inline-flex min-h-[44px] items-center gap-2 border border-border px-6 py-3 transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
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
		Return home
	</a>
</div>
