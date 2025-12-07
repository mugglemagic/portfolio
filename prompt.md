# Claude Code Prompt: Mark Basford Professional Website

## Project Overview

Build a professional portfolio website for Mark Basford - a frontend architect specialising in accessibility, and senior PHP developer. The site should be minimal, elegant, and fully accessible, reflecting Mark's mission that the internet should be available to all.

## Technical Stack

- **Framework**: SvelteKit (latest stable version)
- **Styling**: shadcn-svelte with Tailwind CSS
- **Markdown Processing**: mdsvex for blog posts
- **Theme**: Black and white colour palette with light/dark mode toggle
- **Deployment**: Static adapter (prerendered)

## Setup Instructions

### 1. Initialise SvelteKit Project

```bash
npx sv create mark-basford-site
# Select: SvelteKit minimal, TypeScript, Tailwind CSS
cd mark-basford-site
```

### 2. Install Dependencies

```bash
# shadcn-svelte
npx shadcn-svelte@latest init

# Dark mode support
npm install mode-watcher

# Markdown blog support
npm install -D mdsvex

# Additional utilities
npm install clsx tailwind-merge
```

### 3. Configure mdsvex

Update `svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md', '.svx'],
      layout: {
        blog: './src/lib/layouts/BlogPost.svelte'
      }
    })
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
};

export default config;
```

## Professional Information

### About Mark Basford

- **Role**: Frontend Architect & Senior PHP Developer
- **Specialisation**: Accessibility-first development and inclusive user experiences
- **Mission**: "I believe the internet should be available to all. It's our job as engineers to create journeys and experiences that are enjoyable and stress-free for everyone."

### Technical Expertise

**Frontend**:
- React, Vue, NextJS
- TypeScript
- SvelteKit (learning)
- Accessibility (WCAG compliance, ARIA, semantic HTML)
- Design Systems & Component Libraries

**Backend**:
- PHP, Laravel

**Approach**:
- Accessibility at the forefront of all development decisions
- Building inclusive, performant user experiences
- Component-driven architecture

### Social Links

- **LinkedIn**: https://www.linkedin.com/in/mark-basford-78a43390/
- **GitHub**: https://github.com/mugglemagic

## Design Requirements

### Theme System

Create a black and white theme using CSS custom properties. The theme should support both light and dark modes.

**Light Mode**:
- Background: white (`oklch(1 0 0)`)
- Foreground/text: black (`oklch(0.145 0 0)`)
- Muted elements: grey tones
- Borders: subtle grey

**Dark Mode**:
- Background: near-black (`oklch(0.145 0 0)`)
- Foreground/text: white (`oklch(0.985 0 0)`)
- Muted elements: dark grey tones
- Borders: subtle dark grey

### Typography

- Clean, readable sans-serif system font stack
- Strong hierarchy with clear heading levels
- Generous line-height for body text (accessibility)
- Minimum font size of 16px for body text

### Layout

- Maximum content width of ~70ch for readability
- Generous whitespace
- Mobile-first responsive design
- Skip-to-content link for keyboard navigation

## Site Structure

```
src/
├── routes/
│   ├── +layout.svelte          # Root layout with nav, footer, ModeWatcher
│   ├── +layout.js              # Enable prerendering
│   ├── +page.svelte            # Homepage
│   ├── about/
│   │   └── +page.svelte        # About page with detailed bio
│   └── blog/
│       ├── +page.svelte        # Blog listing page
│       ├── +page.server.js     # Load all blog posts
│       └── [slug]/
│           ├── +page.svelte    # Individual blog post
│           └── +page.server.js # Load single blog post
├── lib/
│   ├── components/
│   │   ├── ui/                 # shadcn-svelte components
│   │   ├── Header.svelte       # Site header with navigation
│   │   ├── Footer.svelte       # Site footer with social links
│   │   ├── ModeToggle.svelte   # Light/dark mode toggle
│   │   ├── SkipLink.svelte     # Skip to main content
│   │   └── SocialLinks.svelte  # LinkedIn & GitHub links
│   ├── layouts/
│   │   └── BlogPost.svelte     # mdsvex layout for blog posts
│   └── utils/
│       └── blog.js             # Blog post utilities
├── content/
│   └── blog/                   # Markdown blog posts go here
│       └── *.md
└── app.css                     # Global styles with CSS variables
static/
└── headshot.jpg            # Headshot image
```

## Component Specifications

### Root Layout (`+layout.svelte`)

```svelte
<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import SkipLink from "$lib/components/SkipLink.svelte";
  
  let { children } = $props();
</script>

<ModeWatcher />
<SkipLink />
<Header />
<main id="main-content" tabindex="-1">
  {@render children()}
</main>
<Footer />
```

### Mode Toggle Component

Use `mode-watcher` with a button that toggles between light/dark themes:

```svelte
<script lang="ts">
  import { toggleMode, mode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
</script>

<Button 
  onclick={toggleMode} 
  variant="ghost" 
  size="icon"
  aria-label={$mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  <!-- Sun/Moon icons -->
</Button>
```

### Blog Post Loading

Create a utility to load markdown blog posts:

```javascript
// src/lib/utils/blog.js
export async function getPosts() {
  const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });
  
  return Object.entries(posts)
    .map(([path, post]) => ({
      slug: path.split('/').pop().replace('.md', ''),
      ...post.metadata
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

### Blog Post Frontmatter Structure

```yaml
---
title: "Post Title"
date: "2025-01-15"
description: "Brief description for SEO and listings"
tags: ["accessibility", "frontend", "react"]
---
```

## Accessibility Requirements

This is non-negotiable - the site must be fully accessible:

1. **Semantic HTML**: Use appropriate landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`)
2. **Skip Link**: Visible on focus, jumps to main content
3. **Keyboard Navigation**: All interactive elements focusable and operable
4. **Focus Indicators**: Visible focus states on all interactive elements
5. **Colour Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA)
6. **Alt Text**: All images have descriptive alt text
7. **ARIA Labels**: Where semantic HTML isn't sufficient
8. **Reduced Motion**: Respect `prefers-reduced-motion`
9. **Screen Reader Testing**: Ensure logical reading order

### Headshot Image

```svelte
<img 
  src="/headshot.jpg" 
  alt="Mark Basford" 
  class="rounded-full"
  width="200"
  height="200"
/>
```

## Pages Content

### Homepage

- Brief introduction
- Headshot image
- Key skills/expertise highlights
- Links to About and Blog
- Social links

### About Page

- Detailed professional background
- Mission statement about accessibility
- Technical skills breakdown
- Professional philosophy

### Blog Listing

- List of all blog posts
- Post title, date, and description
- Tags/categories

### Blog Post

- Full article content
- Reading time estimate
- Back to blog link
- Related posts (optional)

## shadcn-svelte Components to Install

```bash
npx shadcn-svelte@latest add button
npx shadcn-svelte@latest add card
npx shadcn-svelte@latest add badge
npx shadcn-svelte@latest add separator
```

## Enable Prerendering

```javascript
// src/routes/+layout.js
export const prerender = true;
```

## Reference Project Structure

The following folder structure from Mark's Eos project can be used as architectural inspiration:

```
[INSERT YOUR EOS PROJECT FOLDER STRUCTURE HERE]
```

## Final Checklist

- [ ] SvelteKit project initialised
- [ ] shadcn-svelte configured with black/white theme
- [ ] mode-watcher dark mode toggle working
- [ ] mdsvex processing markdown files
- [ ] Homepage with headshot and introduction
- [ ] About page with full bio
- [ ] Blog listing and individual post pages
- [ ] LinkedIn and GitHub links in footer/header
- [ ] Skip-to-content link
- [ ] All images have alt text
- [ ] Keyboard navigation works throughout
- [ ] Focus states visible
- [ ] Colour contrast meets WCAG AA
- [ ] Responsive design works on mobile
- [ ] Site builds and prerenders successfully

## LinkedIn Reference

Pull additional professional details from: https://www.linkedin.com/in/mark-basford-78a43390/

Use this to populate the About page with work history, skills endorsements, and any additional context about Mark's professional background.