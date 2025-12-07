# CLAUDE.md
## Project Context for Claude Code

This file provides context for Claude Code when working on this project.

---

## Project Overview

**Project**: Mark Basford Professional Portfolio Website
**Purpose**: Professional portfolio and blog for a frontend architect specialising in accessibility
**Status**: In development

### Key Documents

| Document | Purpose |
|----------|---------|
| `PRD.md` | Full product requirements specification |
| `plan.md` | Implementation plan with phases and timelines |
| `tasks.md` | Detailed task breakdown with checkboxes |
| `conventions.md` | Coding patterns and standards (from EOS project) |
| `prompt.md` | Original project brief |

### Reference Project

This project follows patterns established in the **EOS frontend** (`../eos/eos/frontend`), a production-grade Next.js application with exceptional accessibility and type safety standards.

---

## Technical Stack

| Technology | Version | Notes |
|------------|---------|-------|
| Node.js | 25.x | Required runtime |
| pnpm | 10.x | Package manager (not npm/yarn/bun) |
| SvelteKit | 2.x | Framework |
| Svelte | 5.x | Uses runes syntax (`$props()`, `$state()`, etc.) |
| TypeScript | 5.x | Strict mode |
| Tailwind CSS | 4.x | Utility-first CSS |
| shadcn-svelte | latest | Component library |
| mdsvex | 0.12.x | Markdown processing |
| mode-watcher | 0.5.x | Theme switching |

### Commands

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint

# Format code
pnpm format

# Add shadcn-svelte component
pnpm dlx shadcn-svelte@latest add <component>
```

---

## Project Structure

```
src/
├── routes/
│   ├── +layout.svelte      # Root layout
│   ├── +layout.ts          # Prerender config
│   ├── +page.svelte        # Homepage
│   ├── +error.svelte       # Error page
│   ├── about/
│   │   └── +page.svelte    # About page
│   ├── blog/
│   │   ├── +page.svelte    # Blog listing
│   │   ├── +page.server.ts
│   │   └── [slug]/
│   │       ├── +page.svelte
│   │       └── +page.server.ts
│   ├── sitemap.xml/
│   │   └── +server.ts
│   └── robots.txt/
│       └── +server.ts
├── lib/
│   ├── components/
│   │   ├── ui/             # shadcn-svelte components
│   │   ├── Header.svelte
│   │   ├── Footer.svelte
│   │   ├── ModeToggle.svelte
│   │   ├── SkipLink.svelte
│   │   ├── SocialLinks.svelte
│   │   ├── SEO.svelte
│   │   └── BlogCard.svelte
│   ├── layouts/
│   │   └── BlogPost.svelte # mdsvex layout
│   ├── utils/
│   │   ├── blog.ts
│   │   └── cn.ts
│   └── types/
│       └── blog.ts
├── content/
│   └── blog/               # Markdown blog posts
│       └── *.md
└── app.css                 # Global styles
static/
├── headshot.jpg
├── og-image.jpg
├── favicon.ico
└── manifest.webmanifest
```

---

## Coding Conventions

> **Full details**: See `conventions.md` for comprehensive coding standards.

### Code Style

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100
}
```

- **No semicolons**
- **Single quotes** for strings
- **No `any` type** - use proper TypeScript types

### Svelte 5 Syntax

This project uses Svelte 5 with runes:

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    title: string
    description?: string
    children: Snippet
  }

  let { title, description = '', children }: Props = $props()

  let count = $state(0)
  let doubled = $derived(count * 2)

  $effect(() => {
    console.log('count changed:', count)
  })
</script>

{@render children()}
```

### 3-Layer Component Pattern

All interactive components use 3 layers for accessibility:

```svelte
<!-- Layer 1: Touch target (44x44px) -->
<button class="min-h-[44px] min-w-[44px] focus-visible:ring-2">
  <!-- Layer 2: Visual appearance -->
  <span class={cn('rounded-md px-4 py-2', variantStyles)}>
    <!-- Layer 3: Content -->
    {children}
  </span>
</button>
```

### Class Name Utility

Always use `cn()` for conditional classes:

```typescript
// src/lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage
cn(
  'base-styles',
  isActive && 'active-styles',
  variant === 'primary' && 'bg-primary'
)
```

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BlogCard.svelte` |
| Utilities | camelCase | `blog.ts` |
| Types | PascalCase | `BlogPost` |
| Constants | UPPER_SNAKE | `MAX_POSTS` |

---

## Accessibility Requirements

**Compliance Target**: WCAG 2.2 Level AAA

### Non-Negotiables

1. **Contrast Ratios**
   - Normal text: 7:1 minimum
   - Large text: 4.5:1 minimum
   - UI components: 3:1 minimum

2. **Touch Targets**
   - All interactive elements: 44x44px minimum

3. **Keyboard Navigation**
   - All functionality accessible via keyboard
   - Visible focus indicators (3:1 contrast)
   - No keyboard traps
   - Logical tab order

4. **Screen Readers**
   - Semantic HTML (landmarks, headings)
   - ARIA labels where needed
   - Alt text on all images
   - Skip link to main content

5. **Motion**
   - Respect `prefers-reduced-motion`
   - No auto-playing animations

### Testing Tools

- axe DevTools (with AAA rules)
- WAVE
- VoiceOver (macOS/iOS)
- NVDA (Windows)
- Keyboard-only navigation

---

## Theme System

### Colour Tokens (OKLCH)

```css
/* Light Mode */
--background: oklch(1 0 0);           /* white */
--foreground: oklch(0.145 0 0);       /* near-black */
--muted: oklch(0.96 0 0);
--muted-foreground: oklch(0.45 0 0);
--border: oklch(0.9 0 0);

/* Dark Mode */
--background: oklch(0.145 0 0);       /* near-black */
--foreground: oklch(0.985 0 0);       /* near-white */
--muted: oklch(0.2 0 0);
--muted-foreground: oklch(0.65 0 0);
--border: oklch(0.25 0 0);
```

### Mode Switching

Use `mode-watcher` for theme management:

```svelte
<script>
  import { toggleMode, mode } from 'mode-watcher';
</script>

<button onclick={toggleMode}>
  {$mode === 'dark' ? 'Light' : 'Dark'}
</button>
```

---

## Blog System

### Frontmatter Schema

```yaml
---
title: "Post Title"
date: "2025-12-01"
description: "Brief description for SEO and listings"
tags: ["accessibility", "frontend"]
published: true
---
```

### Loading Posts

```ts
import { getPosts, getPost } from '$lib/utils/blog';

// Get all published posts (sorted by date)
const posts = await getPosts();

// Get single post by slug
const post = await getPost('my-post-slug');
```

---

## Important Links

- **LinkedIn**: https://www.linkedin.com/in/mark-basford-78a43390/
- **GitHub**: https://github.com/mugglemagic

---

## Common Tasks

### Adding a New Blog Post

1. Create `src/content/blog/post-slug.md`
2. Add frontmatter (title, date, description, tags, published)
3. Write content in markdown
4. Verify it appears on `/blog`

### Adding a New Page

1. Create `src/routes/page-name/+page.svelte`
2. Add SEO component with meta tags
3. Add link to navigation in Header.svelte
4. Ensure prerendering works

### Adding a shadcn-svelte Component

```bash
pnpm dlx shadcn-svelte@latest add <component-name>
```

Components are installed to `src/lib/components/ui/`.

---

## Performance Budgets

| Asset | Max Size (gzipped) |
|-------|-------------------|
| HTML | 20KB |
| CSS | 30KB |
| JavaScript | 80KB |
| Total page weight | 500KB |

### Core Web Vitals Targets

- LCP: < 1.5s
- INP: < 100ms
- CLS: < 0.05

---

## Do Not

- Use npm, yarn, or bun (use pnpm only)
- Use semicolons (Prettier config: `semi: false`)
- Use double quotes for strings (use single quotes)
- Use `any` type (use proper TypeScript types)
- Skip accessibility requirements
- Use Svelte 4 syntax (use Svelte 5 runes)
- Commit without running `pnpm build`
- Use contrast ratios below AAA standards (7:1 for text)
- Create touch targets smaller than 44x44px
- Add animations without reduced-motion support
- Use colour classes directly (use CSS custom properties)
- Forget focus indicators on interactive elements
- Use `aria-hidden="true"` on focusable elements

---

## Getting Help

- **SvelteKit docs**: https://kit.svelte.dev/docs
- **Svelte 5 docs**: https://svelte.dev/docs
- **shadcn-svelte**: https://www.shadcn-svelte.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **WCAG 2.2**: https://www.w3.org/TR/WCAG22/
