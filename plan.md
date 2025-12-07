# Implementation Plan
## Mark Basford Professional Portfolio Website

**Document Version**: 1.0
**Created**: December 2025
**Based on**: PRD.md

---

## Overview

This plan outlines the implementation strategy for building Mark Basford's professional portfolio website. The project will be executed in 9 phases, with accessibility (WCAG 2.2 AAA) and universal device support as core requirements throughout.

---

## Phase 1: Project Setup

**Duration**: 1 day
**Goal**: Establish the development environment and project foundation

### Prerequisites

- Node.js 25.x installed
- pnpm 10.x installed via corepack
- Code editor with Svelte/TypeScript support

### Steps

1. **Initialise SvelteKit Project**
   ```bash
   pnpm create svelte@latest markbasford-site
   # Select: Skeleton project, TypeScript, ESLint, Prettier
   cd markbasford-site
   ```

2. **Configure Package Manager**
   - Add `engines` and `packageManager` fields to package.json
   - Create `.npmrc` with `engine-strict=true`

3. **Install Core Dependencies**
   ```bash
   pnpm add mode-watcher clsx tailwind-merge tailwind-variants bits-ui
   pnpm add -D mdsvex @sveltejs/adapter-static
   ```

4. **Configure Tailwind CSS 4.x**
   - Set up Tailwind with PostCSS
   - Configure custom OKLCH colour palette
   - Define typography and spacing scales

5. **Initialise shadcn-svelte**
   ```bash
   pnpm dlx shadcn-svelte@latest init
   pnpm dlx shadcn-svelte@latest add button card badge separator tooltip
   ```

6. **Configure mdsvex**
   - Update svelte.config.js with mdsvex preprocessor
   - Set up .md and .svx file extensions
   - Configure blog post layout

7. **Set Up Static Adapter**
   - Configure @sveltejs/adapter-static
   - Enable prerendering globally
   - Set up precompression

### Deliverables

- [ ] Working SvelteKit project with TypeScript
- [ ] Tailwind CSS configured with black/white theme
- [ ] shadcn-svelte components installed
- [ ] mdsvex processing markdown files
- [ ] Static adapter configured

---

## Phase 2: Core Components

**Duration**: 2 days
**Goal**: Build reusable accessible components

### Components to Build

1. **SkipLink.svelte**
   - Hidden by default, visible on focus
   - Links to `#main-content`
   - Respects reduced motion preference

2. **Header.svelte**
   - Site logo/name
   - Navigation links (Home, About, Blog)
   - Mode toggle button
   - Semantic `<header>` with `<nav>`

3. **Footer.svelte**
   - Social links (LinkedIn, GitHub)
   - Copyright notice
   - Semantic `<footer>`

4. **ModeToggle.svelte**
   - Toggle between light/dark modes
   - Accessible button with dynamic aria-label
   - Sun/Moon icons

5. **SocialLinks.svelte**
   - LinkedIn and GitHub links
   - Open in new tab with proper accessibility
   - `rel="noopener noreferrer"`

6. **SEO.svelte**
   - Reusable meta tag component
   - Open Graph and Twitter cards
   - JSON-LD structured data injection

7. **BlogCard.svelte**
   - Post preview card
   - Title, date, description, tags
   - Accessible link structure

### Accessibility Requirements

- All interactive elements have 44x44px minimum target size
- Focus indicators visible with 3:1 contrast
- Semantic HTML throughout
- ARIA labels where needed

### Deliverables

- [ ] All core components built and documented
- [ ] Components pass axe DevTools audit
- [ ] Keyboard navigation verified

---

## Phase 3: Layout & Theming

**Duration**: 1 day
**Goal**: Establish site-wide layout and theme system

### Tasks

1. **Root Layout (+layout.svelte)**
   - Import global styles
   - Add ModeWatcher
   - Structure: SkipLink → Header → Main → Footer
   - Main content has `id="main-content"` and `tabindex="-1"`

2. **Global Styles (app.css)**
   - CSS custom properties for colours
   - Light and dark mode variables
   - Typography styles
   - Focus indicator styles
   - Reduced motion media query

3. **Enable Prerendering (+layout.ts)**
   - Export `prerender = true`

4. **Error Page (+error.svelte)**
   - Accessible error display
   - Navigation back to home

### Theme Variables

```css
/* Light Mode */
--background: oklch(1 0 0);
--foreground: oklch(0.145 0 0);

/* Dark Mode */
--background: oklch(0.145 0 0);
--foreground: oklch(0.985 0 0);
```

### Deliverables

- [ ] Root layout complete
- [ ] Theme switching works
- [ ] Prerendering enabled
- [ ] Error page accessible

---

## Phase 4: Pages

**Duration**: 2 days
**Goal**: Build all site pages

### Homepage (+page.svelte)

- Hero section with introduction
- Headshot image with proper alt text
- Key expertise highlights
- Call-to-action links to About and Blog
- Social links

### About Page (/about/+page.svelte)

- Detailed professional background
- Mission statement prominently displayed
- Technical skills breakdown
- Professional philosophy
- Contact/social links

### Blog Listing (/blog/+page.svelte)

- List of all published blog posts
- BlogCard components for each post
- Sorted by date (newest first)
- Tags displayed

### Blog Post (/blog/[slug]/+page.svelte)

- Full article content from markdown
- Reading time estimate
- Publication date
- Tags/categories
- Back to blog link
- Author info

### Deliverables

- [ ] Homepage complete
- [ ] About page complete
- [ ] Blog listing page complete
- [ ] Blog post template complete
- [ ] All pages pass accessibility audit

---

## Phase 5: Blog System

**Duration**: 1 day
**Goal**: Implement markdown blog functionality

### Tasks

1. **Blog Utilities (src/lib/utils/blog.ts)**
   - `getPosts()` - fetch all published posts
   - `getPost(slug)` - fetch single post
   - `formatDate()` - format dates for display
   - `calculateReadingTime()` - estimate reading time

2. **Blog Post Layout (src/lib/layouts/BlogPost.svelte)**
   - mdsvex layout for blog posts
   - Semantic article structure
   - Reading time display
   - Date formatting
   - Tag display

3. **Content Directory**
   - Create src/content/blog/
   - Add sample blog posts
   - Define frontmatter structure

4. **Server Routes**
   - /blog/+page.server.ts - load all posts
   - /blog/[slug]/+page.server.ts - load single post

### Frontmatter Schema

```yaml
---
title: "Post Title"
date: "2025-12-01"
description: "Brief description for SEO"
tags: ["accessibility", "frontend"]
published: true
---
```

### Deliverables

- [ ] Blog utilities complete
- [ ] Blog posts render correctly
- [ ] Reading time displays
- [ ] Tags link/display properly
- [ ] Sample posts created

---

## Phase 6: SEO & Meta

**Duration**: 1 day
**Goal**: Implement comprehensive SEO strategy

### Tasks

1. **Global Meta (app.html)**
   - Charset, viewport, theme-color
   - Favicon and apple-touch-icon
   - Web manifest

2. **Page-Specific Meta**
   - Use SEO.svelte component on each page
   - Unique titles and descriptions
   - Open Graph tags
   - Twitter/X cards

3. **Structured Data**
   - Person schema (global)
   - BlogPosting schema (blog posts)
   - JSON-LD injection

4. **Technical SEO**
   - Dynamic sitemap (/sitemap.xml)
   - robots.txt
   - Canonical URLs on all pages

### Deliverables

- [ ] All pages have proper meta tags
- [ ] Open Graph previews work
- [ ] Structured data validates
- [ ] Sitemap generates correctly
- [ ] robots.txt in place

---

## Phase 7: Accessibility Audit (WCAG 2.2 AAA)

**Duration**: 2 days
**Goal**: Achieve full WCAG 2.2 AAA conformance

### Automated Testing

| Tool | Action |
|------|--------|
| axe DevTools | Run with AAA rules enabled |
| WAVE | Verify 7:1 contrast ratios |
| IBM Equal Access | Full audit |
| Pa11y | CI integration at AAA level |

### Manual Testing

| Test | Method |
|------|--------|
| Keyboard navigation | Tab through all pages |
| VoiceOver (macOS) | Full site navigation |
| VoiceOver (iOS) | Mobile navigation |
| NVDA (Windows) | Full site navigation |
| TalkBack (Android) | Mobile navigation |
| High contrast mode | Windows settings |
| Reduced motion | System preference |
| Voice Control | macOS/iOS |

### AAA Checklist

- [ ] 7:1 contrast ratio for normal text
- [ ] 4.5:1 contrast ratio for large text
- [ ] All targets 44x44px minimum
- [ ] Focus indicators visible (3:1 contrast)
- [ ] No keyboard traps
- [ ] Skip link functional
- [ ] Heading hierarchy correct
- [ ] Alt text on all images
- [ ] Reduced motion respected
- [ ] Reading level accessible

### Deliverables

- [ ] 0 violations in automated tools
- [ ] All screen readers navigate correctly
- [ ] Manual audit passed
- [ ] AAA conformance documented

---

## Phase 8: Device & Browser Testing

**Duration**: 1 day
**Goal**: Verify universal device support

### Device Matrix

| Category | Devices |
|----------|---------|
| iPhone | SE (320px), 14/15, Pro Max |
| Android | Pixel, Samsung Galaxy |
| iPad | Mini, Air, Pro |
| Android Tablet | Samsung Tab |
| Desktop | 1920px, 2560px |

### Browser Matrix

| Browser | Platforms |
|---------|-----------|
| Chrome | Desktop, Android |
| Firefox | Desktop, Android |
| Safari | macOS, iOS |
| Edge | Desktop |
| Samsung Internet | Android |

### Tests

- [ ] Responsive layout at all breakpoints
- [ ] Touch targets adequate on mobile
- [ ] 200% zoom functional
- [ ] 400% zoom functional
- [ ] Portrait orientation
- [ ] Landscape orientation
- [ ] Print stylesheet
- [ ] Slow 3G simulation

### Deliverables

- [ ] All devices pass visual review
- [ ] All browsers render correctly
- [ ] Zoom levels functional
- [ ] Print output acceptable

---

## Phase 9: Performance & Launch

**Duration**: 1 day
**Goal**: Optimise performance and deploy

### Performance Tasks

1. **Lighthouse Audit**
   - Target: 100 across all categories
   - Fix any identified issues

2. **Core Web Vitals**
   - LCP < 1.5s
   - INP < 100ms
   - CLS < 0.05

3. **Asset Optimisation**
   - Images: WebP format, proper sizing
   - Enable precompression (gzip/brotli)
   - Verify bundle sizes within budget

4. **Final Checks**
   - All links working
   - No console errors
   - Forms functional (if any)

### Deployment

1. Build static site: `pnpm build`
2. Test build locally: `pnpm preview`
3. Deploy to hosting provider
4. Verify production site
5. Submit sitemap to search engines

### Deliverables

- [ ] Lighthouse scores: 100/100/100/100
- [ ] Core Web Vitals pass
- [ ] Site deployed and live
- [ ] DNS configured
- [ ] SSL certificate active

---

## Timeline Summary

| Phase | Duration | Cumulative |
|-------|----------|------------|
| 1. Project Setup | 1 day | Day 1 |
| 2. Core Components | 2 days | Day 3 |
| 3. Layout & Theming | 1 day | Day 4 |
| 4. Pages | 2 days | Day 6 |
| 5. Blog System | 1 day | Day 7 |
| 6. SEO & Meta | 1 day | Day 8 |
| 7. Accessibility Audit | 2 days | Day 10 |
| 8. Device Testing | 1 day | Day 11 |
| 9. Performance & Launch | 1 day | Day 12 |

**Total Estimated Duration**: 12 working days

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| AAA compliance difficult | Build accessibility in from start, not as afterthought |
| Browser compatibility issues | Test early and often, use progressive enhancement |
| Performance regressions | Monitor bundle sizes, run Lighthouse in CI |
| mdsvex configuration issues | Follow official documentation, test with sample posts early |

---

## Success Criteria

1. Site is live and accessible at production URL
2. Lighthouse scores: 100 across all categories
3. WCAG 2.2 AAA conformance verified
4. Works on all tested devices and browsers
5. Blog system functional with sample posts
6. SEO optimised with valid structured data
