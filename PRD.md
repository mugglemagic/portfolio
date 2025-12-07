# Product Requirements Document
## Mark Basford Professional Portfolio Website

**Version**: 1.0
**Last Updated**: December 2025
**Author**: Mark Basford
**Status**: Draft

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [User Personas & Stories](#user-personas--stories)
3. [Technical Requirements](#technical-requirements)
4. [Design System](#design-system)
5. [Accessibility Requirements](#accessibility-requirements)
6. [SEO & Meta Strategy](#seo--meta-strategy)
7. [Success Metrics](#success-metrics)
8. [Site Architecture](#site-architecture)
9. [Component Specifications](#component-specifications)
10. [Implementation Checklist](#implementation-checklist)

---

## Executive Summary

### Project Overview

Build a professional portfolio website for Mark Basford—a frontend architect specialising in accessibility and senior PHP developer. The site will serve as a central hub for professional presence, thought leadership through blogging, and demonstration of accessibility-first development principles.

### Goals

1. **Professional Visibility**: Establish an authoritative online presence showcasing expertise in frontend architecture and accessibility
2. **Thought Leadership**: Provide a platform for sharing insights on accessibility, frontend development, and inclusive design
3. **Lead by Example**: Demonstrate accessibility best practices through the site's own implementation
4. **Career Advancement**: Serve as a living portfolio for potential employers and collaborators

### Mission Statement

> "I believe the internet should be available to all. It's our responsibiltiy as engineers to create journeys and experiences that are usable and enjoyable for everyone."

### Key Differentiators

- Accessibility-first design philosophy baked into every decision
- Minimal, elegant black-and-white aesthetic
- Fast, statically-generated pages with excellent Core Web Vitals
- Clean, semantic markup that serves as a reference implementation

---

## User Personas & Stories

### Persona 1: Technical Recruiter (Sarah)

**Background**: Senior technical recruiter at a large tech company, sourcing frontend architects
**Goals**: Quickly assess candidate qualifications and cultural fit
**Pain Points**: Slow-loading portfolio sites, unclear skill presentations

#### User Stories

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-1.1 | As a recruiter, I want to quickly understand Mark's expertise so I can determine fit for open roles | Homepage displays key skills and specialisations within 3 seconds of page load |
| US-1.2 | As a recruiter, I want to access Mark's LinkedIn profile so I can review work history | LinkedIn link is prominently displayed and opens in new tab with proper accessibility |
| US-1.3 | As a recruiter, I want to read about Mark's professional philosophy so I can assess cultural alignment | About page clearly articulates mission and values |

### Persona 2: Fellow Developer (James)

**Background**: Mid-level frontend developer seeking to improve accessibility skills
**Goals**: Learn accessibility best practices from experienced practitioners
**Pain Points**: Finding practical, real-world accessibility guidance

#### User Stories

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-2.1 | As a developer, I want to read blog posts about accessibility so I can improve my skills | Blog listing shows posts with clear titles, dates, and descriptions |
| US-2.2 | As a developer, I want to view the site's source code so I can learn implementation patterns | Code is clean, well-commented, and follows best practices |
| US-2.3 | As a developer, I want to filter blog posts by topic so I can find relevant content | Tags/categories are displayed and filterable |

### Persona 3: User with Visual Impairment (Maria)

**Background**: Software tester who uses a screen reader (NVDA/VoiceOver)
**Goals**: Access content without barriers
**Pain Points**: Sites with poor heading structure, missing alt text, inaccessible components

#### User Stories

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-3.1 | As a screen reader user, I want logical heading hierarchy so I can navigate by headings | Single H1 per page, sequential heading levels, no skipped levels |
| US-3.2 | As a screen reader user, I want skip links so I can bypass navigation | Skip link visible on focus, jumps to main content |
| US-3.3 | As a screen reader user, I want descriptive link text so I understand link destinations | No "click here" or "read more" without context |
| US-3.4 | As a screen reader user, I want form labels so I know what inputs require | All form elements have associated labels |

### Persona 4: User with Motor Impairment (David)

**Background**: Developer who navigates exclusively via keyboard due to motor impairment
**Goals**: Complete all interactions without a mouse
**Pain Points**: Focus traps, invisible focus states, mouse-dependent interactions

#### User Stories

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-4.1 | As a keyboard user, I want visible focus indicators so I know where I am | Focus states visible with minimum 3:1 contrast ratio |
| US-4.2 | As a keyboard user, I want logical tab order so navigation is predictable | Tab order follows visual layout, no unexpected jumps |
| US-4.3 | As a keyboard user, I want to toggle dark mode with keyboard so I can adjust the theme | Mode toggle button is keyboard accessible with Enter/Space activation |

### Persona 5: User with Vestibular Disorder (Emma)

**Background**: Content writer with vestibular sensitivity to motion
**Goals**: Browse without triggering vertigo or nausea
**Pain Points**: Excessive animations, parallax effects, auto-playing content

#### User Stories

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-5.1 | As a motion-sensitive user, I want reduced animations when I've set that preference | Site respects `prefers-reduced-motion` media query |
| US-5.2 | As a motion-sensitive user, I want no auto-playing animations so I control my experience | No animations play automatically without user initiation |

---

## Technical Requirements

### Technology Stack (December 2025)

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 25.x | JavaScript runtime |
| pnpm | 10.x | Package manager |
| SvelteKit | 2.x (latest) | Full-stack framework |
| Svelte | 5.x | Component framework with runes |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| shadcn-svelte | latest | Component library |
| mdsvex | 0.12.x | Markdown processing |
| mode-watcher | 0.5.x | Theme switching |
| @sveltejs/adapter-static | 3.x | Static site generation |

### Runtime & Package Manager

**Node.js 25.x** is required. **pnpm 10.x** is the required package manager.

```bash
# Verify Node.js version
node --version  # Should be v25.x.x

# Enable and install pnpm via corepack (recommended)
corepack enable
corepack prepare pnpm@latest --activate

# Verify pnpm version
pnpm --version  # Should be 10.x.x
```

**Why pnpm:**
- Faster installation times via content-addressable storage
- Strict dependency resolution prevents phantom dependencies
- Disk space efficient through hard links
- Native workspace support for monorepos
- Compatible with npm registry and package.json

### Development Dependencies

```json
{
  "engines": {
    "node": ">=25.0.0"
  },
  "packageManager": "pnpm@10.0.0",
  "devDependencies": {
    "@sveltejs/adapter-static": "^3.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^4.0.0",
    "autoprefixer": "^10.4.0",
    "mdsvex": "^0.12.0",
    "postcss": "^8.4.0",
    "svelte": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^6.0.0"
  },
  "dependencies": {
    "bits-ui": "^1.0.0",
    "clsx": "^2.1.0",
    "mode-watcher": "^0.5.0",
    "tailwind-merge": "^2.5.0",
    "tailwind-variants": "^0.3.0"
  }
}
```

**Common pnpm commands:**

| npm command | pnpm equivalent |
|-------------|-----------------|
| `npm install` | `pnpm install` |
| `npm install <pkg>` | `pnpm add <pkg>` |
| `npm install -D <pkg>` | `pnpm add -D <pkg>` |
| `npm run <script>` | `pnpm <script>` |
| `npx <command>` | `pnpm dlx <command>` |
| `npm update` | `pnpm update` |

### Browser & Device Support

The site must work flawlessly across all devices, screen sizes, and browsers.

#### Desktop Browsers

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| Chrome | 90+ | Including Chromium-based browsers |
| Firefox | 90+ | Including Firefox ESR |
| Safari | 15+ | macOS Monterey and later |
| Edge | 90+ | Chromium-based |
| Opera | 80+ | Chromium-based |
| Brave | All versions | Chromium-based |

#### Mobile Browsers

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| Safari iOS | iOS 15+ | iPhone and iPad |
| Chrome iOS | All versions | Uses WebKit |
| Chrome Android | 90+ | |
| Firefox Android | 90+ | |
| Samsung Internet | 15+ | Popular on Samsung devices |
| Opera Mobile | Latest | |

#### Device Categories

| Device Type | Requirements |
|-------------|--------------|
| Desktop (1920px+) | Full experience, optimal layout |
| Laptop (1024-1919px) | Full experience, responsive adjustments |
| Tablet Landscape (768-1023px) | Adapted layout, touch-optimised |
| Tablet Portrait (600-767px) | Single-column layout, larger touch targets |
| Mobile Large (414-599px) | Mobile-first layout |
| Mobile Standard (375-413px) | Optimised for iPhone SE and similar |
| Mobile Small (320-374px) | Minimum supported width, no horizontal scroll |

#### Assistive Technology Support

| Technology | Tested Versions |
|------------|-----------------|
| VoiceOver (macOS) | Latest |
| VoiceOver (iOS) | iOS 15+ |
| NVDA (Windows) | 2023.1+ |
| JAWS (Windows) | 2023+ |
| TalkBack (Android) | Latest |
| Windows Narrator | Windows 10/11 |
| Dragon NaturallySpeaking | 15+ |
| Switch Access (Android/iOS) | Latest |
| Voice Control (macOS/iOS) | Latest |

#### Input Methods

| Input Type | Support Level |
|------------|---------------|
| Mouse/trackpad | Full support |
| Touch (single finger) | Full support |
| Touch (multi-touch) | Graceful handling |
| Keyboard only | Full support, all features accessible |
| Screen reader | Full support |
| Voice control | Full support |
| Switch devices | Full support |
| Eye tracking | Compatible |
| Stylus/pen | Full support |

#### Display Conditions

| Condition | Requirement |
|-----------|-------------|
| High contrast mode | Full support |
| Inverted colours | Content remains legible |
| Dark mode (OS-level) | Respects system preference |
| Large text (200% zoom) | No loss of functionality |
| 400% zoom | All content accessible |
| Portrait orientation | Fully responsive |
| Landscape orientation | Fully responsive |
| Print | Optimised print stylesheet |
| Low bandwidth | Functional on 2G/slow 3G |
| Offline | Core pages cached via service worker |

### Performance Budgets

| Metric | Budget |
|--------|--------|
| Total Page Weight | < 500KB |
| JavaScript Bundle | < 100KB (compressed) |
| CSS Bundle | < 50KB (compressed) |
| Largest Contentful Paint | < 1.5s |
| First Input Delay | < 100ms |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 2s |

### Build Configuration

#### svelte.config.js

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
      precompress: true,
      strict: true
    }),
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;
```

---

## Design System

### Colour Palette

The site uses a monochromatic black-and-white palette with OKLCH colour space for perceptual uniformity.

#### Light Mode

| Token | OKLCH Value | Hex Equivalent | Usage |
|-------|-------------|----------------|-------|
| `--background` | `oklch(1 0 0)` | #FFFFFF | Page background |
| `--foreground` | `oklch(0.145 0 0)` | #1A1A1A | Primary text |
| `--muted` | `oklch(0.96 0 0)` | #F5F5F5 | Muted backgrounds |
| `--muted-foreground` | `oklch(0.45 0 0)` | #6B6B6B | Secondary text |
| `--border` | `oklch(0.9 0 0)` | #E5E5E5 | Borders |
| `--ring` | `oklch(0.145 0 0)` | #1A1A1A | Focus rings |

#### Dark Mode

| Token | OKLCH Value | Hex Equivalent | Usage |
|-------|-------------|----------------|-------|
| `--background` | `oklch(0.145 0 0)` | #1A1A1A | Page background |
| `--foreground` | `oklch(0.985 0 0)` | #FAFAFA | Primary text |
| `--muted` | `oklch(0.2 0 0)` | #2E2E2E | Muted backgrounds |
| `--muted-foreground` | `oklch(0.65 0 0)` | #9A9A9A | Secondary text |
| `--border` | `oklch(0.25 0 0)` | #3D3D3D | Borders |
| `--ring` | `oklch(0.985 0 0)` | #FAFAFA | Focus rings |

### Typography

#### Font Stack

```css
--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
```

#### Type Scale

| Level | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| H1 | 2.5rem (40px) | 1.2 | 700 | Page titles |
| H2 | 2rem (32px) | 1.25 | 600 | Section headings |
| H3 | 1.5rem (24px) | 1.3 | 600 | Subsection headings |
| H4 | 1.25rem (20px) | 1.4 | 600 | Card headings |
| Body | 1rem (16px) | 1.6 | 400 | Paragraph text |
| Small | 0.875rem (14px) | 1.5 | 400 | Captions, meta |

#### Readability Guidelines

- Maximum line width: 70 characters (~700px)
- Minimum body font size: 16px
- Paragraph spacing: 1.5em
- Letter spacing: Normal (no tracking adjustments)

### Spacing Scale

Based on 4px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Component padding |
| `--space-3` | 12px | Small gaps |
| `--space-4` | 16px | Standard gaps |
| `--space-6` | 24px | Section spacing |
| `--space-8` | 32px | Large gaps |
| `--space-12` | 48px | Section margins |
| `--space-16` | 64px | Page sections |

### Component Library

Install the following shadcn-svelte components:

```bash
pnpm dlx shadcn-svelte@latest add button
pnpm dlx shadcn-svelte@latest add card
pnpm dlx shadcn-svelte@latest add badge
pnpm dlx shadcn-svelte@latest add separator
pnpm dlx shadcn-svelte@latest add tooltip
```

---

## Accessibility Requirements

### Compliance Target

**WCAG 2.2 Level AAA** compliance is mandatory. This is the highest level of accessibility conformance, ensuring the site is usable by the widest possible audience.

### Semantic Structure

#### Landmarks

Every page must include:

```html
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">...</nav>
  </header>
  <main id="main-content" role="main" tabindex="-1">...</main>
  <footer role="contentinfo">...</footer>
</body>
```

#### Heading Hierarchy

- Single `<h1>` per page (page title)
- Sequential heading levels (no skipping h2 to h4)
- Headings must describe content structure
- Use CSS for visual styling, not heading levels

### Keyboard Navigation

| Requirement | Implementation |
|-------------|----------------|
| All interactive elements focusable | Native HTML elements or `tabindex="0"` |
| Logical tab order | DOM order matches visual order |
| Focus visible | Minimum 3:1 contrast, 2px outline |
| No focus traps | Escape key always works |
| Skip links | Visible on focus, jumps to `#main-content` |

### Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Colour & Contrast (AAA Enhanced)

| Element | Minimum Ratio | Notes |
|---------|---------------|-------|
| Normal text (< 18pt) | 7:1 | AAA requirement |
| Large text (≥ 18pt or 14pt bold) | 4.5:1 | AAA requirement |
| UI components & graphics | 3:1 | Non-text contrast |
| Focus indicators | 3:1 | Visible against all backgrounds |
| Placeholder text | 7:1 | Must meet same standard as body text |

### Images & Media

```svelte
<!-- Informative images -->
<img
  src="/headshot.jpg"
  alt="Mark Basford, smiling, wearing a casual shirt"
  width="200"
  height="200"
/>

<!-- Decorative images -->
<img src="/decorative.svg" alt="" role="presentation" />
```

### Motion & Animation

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### AAA-Specific Requirements

These additional criteria elevate the site from AA to AAA compliance:

#### Sign Language (1.2.6)
- Provide sign language interpretation for video content if added in future

#### Extended Audio Description (1.2.7)
- Extended audio descriptions for any video content

#### Live Captions (1.2.9)
- Real-time captions for any live audio content

#### Reading Level (3.1.5)
- Content should be written at lower secondary education reading level
- Provide summaries for complex technical content
- Use plain language wherever possible

#### Pronunciation (3.1.6)
- Provide pronunciation guides for ambiguous words when meaning is unclear

#### Change on Request (3.2.5)
- Context changes only occur on user request
- No automatic redirects or content changes

#### Help (3.3.5)
- Context-sensitive help available where needed
- Clear instructions for any interactive elements

#### Error Prevention - All (3.3.6)
- All form submissions are reversible, checked, or confirmed
- Users can review and correct information before final submission

#### Timeouts (2.2.6)
- Warn users of any data loss due to inactivity
- Minimum 20-hour data retention or no timeouts

#### Target Size Minimum (2.5.8)
- All interactive targets minimum 44x44 CSS pixels
- Adequate spacing between clickable elements

#### Focus Appearance (2.4.13)
- Focus indicator area at least as large as 2px perimeter
- Minimum 3:1 contrast between focused and unfocused states

#### Dragging Movements (2.5.7)
- Any drag functionality has single-pointer alternative

#### Consistent Help (3.2.6)
- Help mechanisms appear in consistent locations across pages

### ARIA Usage Guidelines

1. Use semantic HTML first; ARIA is a last resort
2. Every ARIA role must have required properties
3. Interactive ARIA widgets need keyboard support
4. Never use `aria-hidden="true"` on focusable elements

### Testing Requirements

#### Automated Testing

| Tool | Purpose | Frequency |
|------|---------|-----------|
| axe DevTools | Automated accessibility testing | Every PR |
| WAVE | Visual accessibility review | Every PR |
| IBM Equal Access | Comprehensive a11y checks | Weekly |
| Pa11y | CI/CD accessibility gate | Every build |
| Lighthouse CI | Performance & accessibility | Every build |

#### Manual Screen Reader Testing

| Screen Reader | Platform | Frequency |
|---------------|----------|-----------|
| VoiceOver | macOS | Before release |
| VoiceOver | iOS | Before release |
| NVDA | Windows | Before release |
| JAWS | Windows | Before major release |
| TalkBack | Android | Before release |
| Narrator | Windows | Before major release |

#### Device Testing Matrix

| Device Category | Examples | Frequency |
|-----------------|----------|-----------|
| iPhone | SE, 14/15 standard, Pro Max | Every PR |
| Android Phone | Pixel, Samsung Galaxy | Every PR |
| iPad | Mini, Air, Pro | Before release |
| Android Tablet | Samsung Tab | Before release |
| Desktop (Windows) | Various resolutions | Every PR |
| Desktop (macOS) | Various resolutions | Every PR |
| Desktop (Linux) | Ubuntu, Fedora | Before major release |

#### Input Method Testing

| Input Method | Frequency |
|--------------|-----------|
| Keyboard-only navigation | Every PR |
| Touch-only navigation | Every PR |
| Voice Control (macOS/iOS) | Before release |
| Switch Access | Before major release |

#### Browser Testing

| Browser | Frequency |
|---------|-----------|
| Chrome (latest) | Every PR |
| Firefox (latest) | Every PR |
| Safari (latest) | Every PR |
| Edge (latest) | Every PR |
| Safari iOS | Every PR |
| Chrome Android | Every PR |
| Samsung Internet | Before release |

---

## SEO & Meta Strategy

### Global Meta Tags

```svelte
<!-- src/app.html -->
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.webmanifest" />
  %sveltekit.head%
</head>
```

### Page-Specific Meta

#### Homepage

```svelte
<svelte:head>
  <title>Mark Basford | Frontend Architect & Accessibility Specialist</title>
  <meta name="description" content="Frontend architect specialising in accessibility-first development. Building inclusive web experiences with React, Vue, and modern JavaScript." />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://markbasford.com/" />
  <meta property="og:title" content="Mark Basford | Frontend Architect & Accessibility Specialist" />
  <meta property="og:description" content="Frontend architect specialising in accessibility-first development. Building inclusive web experiences with React, Vue, and modern JavaScript." />
  <meta property="og:image" content="https://markbasford.com/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter/X -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Mark Basford | Frontend Architect & Accessibility Specialist" />
  <meta name="twitter:description" content="Frontend architect specialising in accessibility-first development." />
  <meta name="twitter:image" content="https://markbasford.com/og-image.jpg" />
</svelte:head>
```

#### Blog Posts

```svelte
<svelte:head>
  <title>{post.title} | Mark Basford</title>
  <meta name="description" content={post.description} />
  <meta name="author" content="Mark Basford" />
  <meta property="article:published_time" content={post.date} />
  <meta property="article:author" content="Mark Basford" />
  <meta property="article:tag" content={post.tags.join(', ')} />
</svelte:head>
```

### Structured Data (JSON-LD)

#### Person Schema (Global)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mark Basford",
  "url": "https://markbasford.com",
  "jobTitle": "Frontend Architect",
  "description": "Frontend architect specialising in accessibility-first development",
  "sameAs": [
    "https://www.linkedin.com/in/mark-basford-78a43390/",
    "https://github.com/mugglemagic"
  ],
  "knowsAbout": [
    "Web Accessibility",
    "Frontend Development",
    "React",
    "Vue",
    "TypeScript",
    "PHP",
    "Laravel"
  ]
}
```

#### BlogPosting Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ post.title }}",
  "description": "{{ post.description }}",
  "datePublished": "{{ post.date }}",
  "author": {
    "@type": "Person",
    "name": "Mark Basford",
    "url": "https://markbasford.com"
  },
  "publisher": {
    "@type": "Person",
    "name": "Mark Basford"
  }
}
```

### Technical SEO

#### Sitemap

Generate `sitemap.xml` during build:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://markbasford.com/</loc>
    <lastmod>2025-12-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://markbasford.com/about</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://markbasford.com/blog</loc>
    <priority>0.9</priority>
  </url>
  <!-- Blog posts dynamically added -->
</urlset>
```

#### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://markbasford.com/sitemap.xml
```

#### Canonical URLs

Every page must include a canonical URL:

```svelte
<link rel="canonical" href="https://markbasford.com{$page.url.pathname}" />
```

---

## Success Metrics

### Lighthouse Scores

| Category | Target Score |
|----------|--------------|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

### Core Web Vitals

| Metric | Target | Measurement |
|--------|--------|-------------|
| Largest Contentful Paint (LCP) | < 1.5s | 75th percentile |
| Interaction to Next Paint (INP) | < 100ms | 75th percentile |
| Cumulative Layout Shift (CLS) | < 0.05 | 75th percentile |

### Accessibility Audits (WCAG 2.2 AAA)

| Tool | Target |
|------|--------|
| axe DevTools | 0 violations (A, AA, AAA rules enabled) |
| WAVE | 0 errors, 0 contrast errors (7:1 ratio) |
| IBM Equal Access | 0 violations |
| Pa11y | 0 errors at AAA level |
| Manual WCAG 2.2 audit | Full AAA conformance |

### Device Compatibility

| Category | Target |
|----------|--------|
| Mobile responsiveness | Pass on all device sizes 320px-2560px |
| Touch accessibility | All targets ≥44x44px |
| Orientation support | Full functionality in portrait and landscape |
| Zoom support | Functional at 400% zoom |
| High contrast mode | Full support on Windows |
| Reduced motion | All animations respect preference |

### Page Load Metrics

| Metric | Target |
|--------|--------|
| Time to First Byte (TTFB) | < 200ms |
| First Contentful Paint (FCP) | < 1.0s |
| Time to Interactive (TTI) | < 1.5s |
| Total Blocking Time (TBT) | < 50ms |

### Bundle Size

| Asset | Maximum Size (gzipped) |
|-------|------------------------|
| HTML | < 20KB |
| CSS | < 30KB |
| JavaScript | < 80KB |
| Fonts | 0KB (system fonts) |

### User Experience

| Metric | Target |
|--------|--------|
| Mobile-friendly | Yes (Google Mobile-Friendly Test) |
| Print stylesheet | Optimised for printing |
| Offline support | Service worker for core pages |

---

## Site Architecture

### Route Structure

```
src/routes/
├── +layout.svelte          # Root layout (nav, footer, theme)
├── +layout.ts              # Enable prerendering
├── +page.svelte            # Homepage
├── +error.svelte           # Error page
├── about/
│   └── +page.svelte        # About page
├── blog/
│   ├── +page.svelte        # Blog listing
│   ├── +page.server.ts     # Load all posts
│   └── [slug]/
│       ├── +page.svelte    # Individual post
│       └── +page.server.ts # Load single post
├── sitemap.xml/
│   └── +server.ts          # Dynamic sitemap
└── robots.txt/
    └── +server.ts          # Robots.txt
```

### Library Structure

```
src/lib/
├── components/
│   ├── ui/                 # shadcn-svelte components
│   │   ├── button/
│   │   ├── card/
│   │   ├── badge/
│   │   └── ...
│   ├── Header.svelte       # Site header
│   ├── Footer.svelte       # Site footer
│   ├── ModeToggle.svelte   # Theme switcher
│   ├── SkipLink.svelte     # Skip to content
│   ├── SocialLinks.svelte  # LinkedIn, GitHub
│   ├── BlogCard.svelte     # Blog post preview
│   └── SEO.svelte          # Meta tags component
├── layouts/
│   └── BlogPost.svelte     # mdsvex blog layout
├── utils/
│   ├── blog.ts             # Blog utilities
│   └── cn.ts               # Class name utility
└── types/
    └── blog.ts             # TypeScript interfaces
```

### Content Structure

```
src/content/
└── blog/
    ├── getting-started-with-accessibility.md
    ├── building-inclusive-design-systems.md
    └── ...
```

### Static Assets

```
static/
├── headshot.jpg        # Headshot
├── og-image.jpg            # Open Graph image (1200x630)
├── favicon.ico             # Favicon
├── icon.svg                # SVG icon
├── apple-touch-icon.png    # Apple touch icon
└── manifest.webmanifest    # PWA manifest
```

---

## Component Specifications

### Component Architecture Pattern

All interactive components follow a **3-layer architecture** for accessibility and flexibility:

```
┌─────────────────────────────────────┐
│  Layer 1: Touch Target (44×44px)    │  ← Accessibility hit area
│  ┌─────────────────────────────┐    │
│  │  Layer 2: Visual Appearance │    │  ← Styled element
│  │  ┌─────────────────────┐    │    │
│  │  │  Layer 3: Content   │    │    │  ← Text, icons, effects
│  │  └─────────────────────┘    │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Implementation:**

```svelte
<!-- Layer 1: Touch target ensures 44x44px minimum -->
<button
  class="inline-flex items-center justify-center min-h-[44px] min-w-[44px]
         focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
>
  <!-- Layer 2: Visual appearance (can be smaller than touch target) -->
  <span
    class={cn(
      'inline-flex items-center justify-center gap-2 rounded-md transition-colors',
      variant === 'default' && 'bg-primary text-primary-foreground',
      variant === 'outline' && 'border border-input bg-background',
      size === 'default' && 'h-10 px-4 py-2',
      size === 'sm' && 'h-9 px-3'
    )}
  >
    <!-- Layer 3: Content -->
    {@render children?.()}
  </span>
</button>
```

This pattern ensures:
- Touch targets always meet 44×44px minimum (WCAG 2.5.8)
- Visual appearance can be customised independently
- Focus indicators are properly positioned
- Content is semantically correct

### SkipLink Component

```svelte
<!-- src/lib/components/SkipLink.svelte -->
<script lang="ts">
  // Skip link for keyboard navigation
</script>

<a
  href="#main-content"
  class="skip-link"
>
  Skip to main content
</a>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    padding: 8px 16px;
    background: var(--background);
    color: var(--foreground);
    border: 2px solid var(--foreground);
    z-index: 100;
    transition: top 0.2s;
  }

  .skip-link:focus {
    top: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .skip-link {
      transition: none;
    }
  }
</style>
```

### ModeToggle Component

```svelte
<!-- src/lib/components/ModeToggle.svelte -->
<script lang="ts">
  import { toggleMode, mode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
</script>

<Button
  onclick={toggleMode}
  variant="ghost"
  size="icon"
  aria-label={$mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if $mode === 'dark'}
    <Sun class="h-5 w-5" />
  {:else}
    <Moon class="h-5 w-5" />
  {/if}
</Button>
```

### Blog Post Frontmatter

```yaml
---
title: "Building Accessible React Components"
date: "2025-01-15"
description: "A practical guide to creating React components that work for everyone"
tags: ["accessibility", "react", "frontend"]
published: true
---
```

### Class Name Utility

The `cn()` utility combines `clsx` and `tailwind-merge` for conditional class handling:

```typescript
// src/lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**

```svelte
<div
  class={cn(
    'base-styles',
    isActive && 'active-styles',
    variant === 'primary' && 'bg-primary text-primary-foreground',
    className
  )}
>
```

### Blog Utilities

```typescript
// src/lib/utils/blog.ts
export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  published: boolean
}

export async function getPosts(): Promise<BlogPost[]> {
  const posts = import.meta.glob<{ metadata: BlogPost }>(
    '/src/content/blog/*.md',
    { eager: true }
  )

  return Object.entries(posts)
    .map(([path, post]) => ({
      slug: path.split('/').pop()!.replace('.md', ''),
      ...post.metadata
    }))
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
```

---

## Implementation Checklist

### Phase 1: Project Setup

- [ ] Ensure Node.js 25.x and pnpm 10.x are installed (`corepack enable && corepack prepare pnpm@latest --activate`)
- [ ] Initialise SvelteKit project with TypeScript (`pnpm create svelte@latest`)
- [ ] Install dependencies with pnpm (`pnpm install`)
- [ ] Configure Tailwind CSS 4.x
- [ ] Install and configure shadcn-svelte (`pnpm dlx shadcn-svelte@latest init`)
- [ ] Set up mdsvex for markdown processing
- [ ] Configure mode-watcher for theming
- [ ] Set up static adapter
- [ ] Configure CSS custom properties for theming
- [ ] Add `packageManager` field to package.json

### Phase 2: Core Components

- [ ] Create SkipLink component
- [ ] Create Header with navigation
- [ ] Create Footer with social links
- [ ] Create ModeToggle component
- [ ] Create SocialLinks component
- [ ] Create SEO component for meta tags
- [ ] Set up root layout

### Phase 3: Pages

- [ ] Build Homepage with introduction and headshot
- [ ] Build About page with professional details
- [ ] Build Blog listing page
- [ ] Build Blog post template
- [ ] Create 404 error page

### Phase 4: Blog System

- [ ] Configure mdsvex layouts
- [ ] Create blog utilities (getPosts, formatDate, etc.)
- [ ] Implement blog post loading
- [ ] Add reading time calculation
- [ ] Implement tag display

### Phase 5: SEO & Meta

- [ ] Add Open Graph meta tags
- [ ] Add Twitter/X card meta tags
- [ ] Implement JSON-LD structured data
- [ ] Create dynamic sitemap
- [ ] Add robots.txt
- [ ] Configure canonical URLs

### Phase 6: Accessibility Audit (WCAG 2.2 AAA)

- [ ] Test with axe DevTools (AAA rules enabled)
- [ ] Test with WAVE (verify 7:1 contrast ratios)
- [ ] Test with IBM Equal Access
- [ ] Test with Pa11y at AAA level
- [ ] Test keyboard navigation on all pages
- [ ] Test with VoiceOver (macOS)
- [ ] Test with VoiceOver (iOS)
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with TalkBack (Android)
- [ ] Verify colour contrast meets AAA (7:1 normal, 4.5:1 large)
- [ ] Test reduced motion preference
- [ ] Test high contrast mode (Windows)
- [ ] Verify all touch targets are 44x44px minimum
- [ ] Test Voice Control (macOS/iOS)
- [ ] Verify reading level is accessible (plain language)
- [ ] Complete manual WCAG 2.2 AAA conformance audit

### Phase 7: Device & Browser Testing

- [ ] Test on iPhone SE (320px)
- [ ] Test on iPhone 14/15 standard
- [ ] Test on iPhone Pro Max
- [ ] Test on Android phone (Pixel/Samsung)
- [ ] Test on iPad Mini
- [ ] Test on iPad Pro
- [ ] Test on Android tablet
- [ ] Test on Desktop (1920px+)
- [ ] Test Chrome (latest)
- [ ] Test Firefox (latest)
- [ ] Test Safari (latest)
- [ ] Test Edge (latest)
- [ ] Test Safari iOS
- [ ] Test Chrome Android
- [ ] Test Samsung Internet
- [ ] Test at 200% zoom
- [ ] Test at 400% zoom
- [ ] Test in portrait orientation
- [ ] Test in landscape orientation
- [ ] Test print stylesheet

### Phase 8: Performance Optimisation

- [ ] Run Lighthouse audit
- [ ] Optimise images (WebP, proper sizing)
- [ ] Enable precompression
- [ ] Verify Core Web Vitals
- [ ] Test on slow 3G connection

### Phase 9: Final Polish

- [ ] Final cross-browser verification
- [ ] Final mobile responsive verification
- [ ] Final accessibility review (AAA confirmation)
- [ ] Performance regression check
- [ ] Deploy to production

---

## Appendix

### Professional Information

**Name**: Mark Basford
**Role**: Frontend Architect & Senior PHP Developer
**Specialisation**: Accessibility-first development

**Technical Skills**:
- Frontend: React, Vue, NextJS, TypeScript, SvelteKit
- Backend: PHP, Laravel
- Speciality: WCAG compliance, ARIA, semantic HTML, design systems

**Social Links**:
- LinkedIn: https://www.linkedin.com/in/mark-basford-78a43390/
- GitHub: https://github.com/mugglemagic

### Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [mdsvex](https://mdsvex.pngwn.io/)
