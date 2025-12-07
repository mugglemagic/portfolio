<script lang="ts">
	import { toggleMode } from 'mode-watcher'
	import { Button } from '$lib/components/ui/button'
</script>

<!--
	Using CSS-based icon switching for reliability.
	Both icons are always rendered, CSS shows/hides based on .dark class.
	This avoids SSR hydration mismatches and store timing issues.
-->
<Button
	onclick={toggleMode}
	variant="ghost"
	size="icon"
	aria-label="Toggle theme"
	class="min-h-[44px] min-w-[44px]"
>
	<!-- Sun icon - visible in dark mode -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
		class="hidden dark:block"
	>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2" />
		<path d="M12 20v2" />
		<path d="m4.93 4.93 1.41 1.41" />
		<path d="m17.66 17.66 1.41 1.41" />
		<path d="M2 12h2" />
		<path d="M20 12h2" />
		<path d="m6.34 17.66-1.41 1.41" />
		<path d="m19.07 4.93-1.41 1.41" />
	</svg>
	<!-- Moon icon - visible in light mode -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
		class="block dark:hidden"
	>
		<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
	</svg>
</Button>
