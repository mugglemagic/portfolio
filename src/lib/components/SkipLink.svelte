<script lang="ts">
	// Skip link for keyboard navigation
	// Hidden by default, visible on focus
</script>

<a href="#main-content" class="skip-link">
	Skip to main content
</a>

<style>
	.skip-link {
		position: absolute;
		top: -100px;
		left: 0;
		z-index: 100;
		min-height: 44px;
		padding: 0.75rem 1.5rem;
		background-color: var(--color-background);
		color: var(--color-foreground);
		border: 2px solid var(--color-foreground);
		font-weight: 600;
		text-decoration: none;
		transition: top 0.2s ease;
		display: inline-flex;
		align-items: center;
	}

	.skip-link:focus {
		top: 0;
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.skip-link {
			transition: none;
		}
	}
</style>
