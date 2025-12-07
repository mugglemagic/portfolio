<script lang="ts">
	import '../app.css'
	import { ModeWatcher } from 'mode-watcher'
	import SkipLink from '$lib/components/SkipLink.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'

	let { children } = $props()
</script>

<ModeWatcher />
<SkipLink />

<div class="flex min-h-screen flex-col">
	<Header />
	<main id="main-content" tabindex="-1" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
