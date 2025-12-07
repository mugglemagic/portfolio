# Mark Basford - Professional Portfolio

A professional portfolio and blog website for a frontend architect specialising in accessibility.

## Tech Stack

- **Framework**: SvelteKit 2.x with Svelte 5 (runes syntax)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.x
- **Components**: shadcn-svelte
- **Content**: mdsvex for Markdown processing
- **Deployment**: Static site generation via `@sveltejs/adapter-static`

## Getting Started

### Prerequisites

- Node.js 25.x
- pnpm 10.x

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Linting & Formatting

```bash
pnpm lint
pnpm format
```

## Project Structure

```
src/
├── routes/           # SvelteKit routes
│   ├── about/        # About page
│   ├── blog/         # Blog listing and posts
│   └── sitemap.xml/  # Dynamic sitemap
├── lib/
│   ├── components/   # Svelte components
│   │   └── ui/       # shadcn-svelte components
│   ├── utils/        # Utility functions
│   └── types/        # TypeScript types
├── content/
│   └── blog/         # Markdown blog posts
└── app.css           # Global styles
static/               # Static assets
```

## Accessibility

This site targets WCAG 2.2 Level AAA compliance:

- 7:1 contrast ratio for text
- 44x44px minimum touch targets
- Full keyboard navigation
- Screen reader optimised
- Respects `prefers-reduced-motion`

## Adding Content

### New Blog Post

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter:

```yaml
---
title: 'Post Title'
date: '2025-12-07'
description: 'Brief description for SEO'
tags: ['accessibility', 'frontend']
published: true
---
```

3. Write content in Markdown
4. Run `pnpm build` to verify

## Links

- [LinkedIn](https://www.linkedin.com/in/mark-basford-78a43390/)
- [GitHub](https://github.com/mugglemagic)

## License

All rights reserved.
