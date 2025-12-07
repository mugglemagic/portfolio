<script lang="ts">
	import SocialLinks from './SocialLinks.svelte'

	const currentYear = new Date().getFullYear()
</script>

<footer class="border-t border-border">
	<div class="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between">
		<p class="text-sm text-muted-foreground">
			&copy; {currentYear} Mark Basford
		</p>
		<SocialLinks />
	</div>
</footer>
