# Task Breakdown
## Mark Basford Professional Portfolio Website

**Document Version**: 1.0
**Created**: December 2025
**Based on**: PRD.md, plan.md

---

## How to Use This Document

- Tasks are organised by phase and priority
- Check off tasks as completed: `- [x]`
- Each task includes acceptance criteria where applicable
- Blocked tasks should be noted with reason

---

## Phase 1: Project Setup

### Environment Setup

- [ ] Verify Node.js 25.x is installed (`node --version`)
- [ ] Enable corepack (`corepack enable`)
- [ ] Install pnpm 10.x (`corepack prepare pnpm@latest --activate`)
- [ ] Verify pnpm version (`pnpm --version`)

### Project Initialisation

- [ ] Create new SvelteKit project
  ```bash
  pnpm create svelte@latest markbasford-site
  ```
  - Select: Skeleton project
  - Select: TypeScript
  - Select: ESLint
  - Select: Prettier

- [ ] Navigate to project directory
- [ ] Add `engines` field to package.json
  ```json
  "engines": { "node": ">=25.0.0" }
  ```
- [ ] Add `packageManager` field to package.json
  ```json
  "packageManager": "pnpm@10.0.0"
  ```
- [ ] Create `.npmrc` with `engine-strict=true`
- [ ] Run initial install (`pnpm install`)
- [ ] Verify dev server runs (`pnpm dev`)

### Dependencies

- [ ] Install runtime dependencies
  ```bash
  pnpm add mode-watcher clsx tailwind-merge tailwind-variants bits-ui
  ```

- [ ] Install dev dependencies
  ```bash
  pnpm add -D mdsvex @sveltejs/adapter-static
  ```

### Tailwind CSS Setup

- [ ] Configure Tailwind CSS 4.x
- [ ] Create/update `app.css` with CSS custom properties
- [ ] Define light mode colour tokens (OKLCH)
- [ ] Define dark mode colour tokens (OKLCH)
- [ ] Configure typography scale
- [ ] Configure spacing scale
- [ ] Add focus indicator styles
- [ ] Add reduced motion media query

### shadcn-svelte Setup

- [ ] Initialise shadcn-svelte
  ```bash
  pnpm dlx shadcn-svelte@latest init
  ```
- [ ] Install Button component
- [ ] Install Card component
- [ ] Install Badge component
- [ ] Install Separator component
- [ ] Install Tooltip component

### mdsvex Configuration

- [ ] Update `svelte.config.js` with mdsvex
- [ ] Add `.md` and `.svx` extensions
- [ ] Configure blog layout path
- [ ] Test markdown file processing

### Static Adapter

- [ ] Install adapter-static (if not already)
- [ ] Configure adapter in `svelte.config.js`
- [ ] Set `pages: 'build'`
- [ ] Set `assets: 'build'`
- [ ] Enable `precompress: true`
- [ ] Set `strict: true`

### Verification

- [ ] Project builds without errors (`pnpm build`)
- [ ] Preview works (`pnpm preview`)
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Prettier formatting applied

---

## Phase 2: Core Components

### SkipLink Component

- [ ] Create `src/lib/components/SkipLink.svelte`
- [ ] Style hidden by default (off-screen)
- [ ] Style visible on focus (on-screen)
- [ ] Link to `#main-content`
- [ ] Add transition for appearance
- [ ] Respect `prefers-reduced-motion`
- [ ] Test keyboard focus

### Header Component

- [ ] Create `src/lib/components/Header.svelte`
- [ ] Use semantic `<header>` element
- [ ] Add `role="banner"`
- [ ] Create `<nav>` with `aria-label="Main navigation"`
- [ ] Add site name/logo
- [ ] Add Home link
- [ ] Add About link
- [ ] Add Blog link
- [ ] Include ModeToggle component
- [ ] Style for mobile responsiveness
- [ ] Ensure 44x44px touch targets

### Footer Component

- [ ] Create `src/lib/components/Footer.svelte`
- [ ] Use semantic `<footer>` element
- [ ] Add `role="contentinfo"`
- [ ] Include SocialLinks component
- [ ] Add copyright text with current year
- [ ] Style consistently with header

### ModeToggle Component

- [ ] Create `src/lib/components/ModeToggle.svelte`
- [ ] Import `toggleMode` and `mode` from mode-watcher
- [ ] Use Button component from shadcn-svelte
- [ ] Add Sun icon for dark mode
- [ ] Add Moon icon for light mode
- [ ] Dynamic `aria-label` based on current mode
- [ ] Ensure 44x44px minimum size
- [ ] Test keyboard activation (Enter/Space)

### SocialLinks Component

- [ ] Create `src/lib/components/SocialLinks.svelte`
- [ ] Add LinkedIn link
  - URL: `https://www.linkedin.com/in/mark-basford-78a43390/`
  - `target="_blank"`
  - `rel="noopener noreferrer"`
  - Accessible link text or aria-label
- [ ] Add GitHub link
  - URL: `https://github.com/mugglemagic`
  - `target="_blank"`
  - `rel="noopener noreferrer"`
  - Accessible link text or aria-label
- [ ] Add appropriate icons
- [ ] Ensure 44x44px touch targets

### SEO Component

- [ ] Create `src/lib/components/SEO.svelte`
- [ ] Accept props: title, description, url, image
- [ ] Render `<title>` tag
- [ ] Render meta description
- [ ] Render Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- [ ] Render Twitter card tags
- [ ] Render canonical URL
- [ ] Support JSON-LD structured data slot/prop

### BlogCard Component

- [ ] Create `src/lib/components/BlogCard.svelte`
- [ ] Accept props: title, date, description, slug, tags
- [ ] Use Card component from shadcn-svelte
- [ ] Display formatted date
- [ ] Display description
- [ ] Display tags as Badge components
- [ ] Entire card is clickable link
- [ ] Ensure accessible link text

### Component Documentation

- [ ] All components have TypeScript props defined
- [ ] All components pass axe DevTools audit
- [ ] All components keyboard navigable

---

## Phase 3: Layout & Theming

### Root Layout

- [ ] Update `src/routes/+layout.svelte`
- [ ] Import `../app.css`
- [ ] Import and add `<ModeWatcher />`
- [ ] Import and add `<SkipLink />`
- [ ] Import and add `<Header />`
- [ ] Add `<main id="main-content" tabindex="-1">`
- [ ] Render `{@render children()}`
- [ ] Import and add `<Footer />`

### Layout Configuration

- [ ] Create `src/routes/+layout.ts`
- [ ] Export `prerender = true`

### Global Styles

- [ ] Define `:root` CSS variables for light mode
- [ ] Define `.dark` CSS variables for dark mode
- [ ] Set base font family (system sans-serif)
- [ ] Set base font size (16px minimum)
- [ ] Set line-height for body (1.6)
- [ ] Style headings (H1-H4)
- [ ] Style focus-visible outline
- [ ] Style focus:not(:focus-visible) to remove outline
- [ ] Add prefers-reduced-motion styles

### Error Page

- [ ] Create `src/routes/+error.svelte`
- [ ] Display error status and message
- [ ] Provide link back to homepage
- [ ] Ensure accessible
- [ ] Style consistently with site

### Theme Testing

- [ ] Light mode displays correctly
- [ ] Dark mode displays correctly
- [ ] Mode toggle switches themes
- [ ] System preference respected on first load
- [ ] Theme persists across page navigation
- [ ] Theme persists across sessions

---

## Phase 4: Pages

### Homepage

- [ ] Create/update `src/routes/+page.svelte`
- [ ] Add SEO component with homepage meta
- [ ] Add H1: "Mark Basford"
- [ ] Add subtitle/tagline
- [ ] Add headshot image
  - src: `/headshot.jpg`
  - alt: descriptive text
  - width/height attributes
  - Rounded styling
- [ ] Add brief introduction paragraph
- [ ] Add expertise highlights section
- [ ] Add call-to-action: "Learn more about me" → /about
- [ ] Add call-to-action: "Read my blog" → /blog
- [ ] Include social links
- [ ] Responsive layout (mobile-first)

### About Page

- [ ] Create `src/routes/about/+page.svelte`
- [ ] Add SEO component with about page meta
- [ ] Add H1: "About Me" or similar
- [ ] Add mission statement (blockquote styling)
- [ ] Add professional background section
- [ ] Add technical skills breakdown
  - Frontend skills
  - Backend skills
  - Specialisations
- [ ] Add professional philosophy section
- [ ] Include social links
- [ ] Responsive layout

### Blog Listing Page

- [ ] Create `src/routes/blog/+page.svelte`
- [ ] Create `src/routes/blog/+page.server.ts`
- [ ] Load all posts using `getPosts()`
- [ ] Add SEO component with blog listing meta
- [ ] Add H1: "Blog"
- [ ] Add introductory text (optional)
- [ ] Render BlogCard for each post
- [ ] Sort posts by date (newest first)
- [ ] Handle empty state (no posts)
- [ ] Responsive grid/list layout

### Blog Post Page

- [ ] Create `src/routes/blog/[slug]/+page.svelte`
- [ ] Create `src/routes/blog/[slug]/+page.server.ts`
- [ ] Load single post by slug
- [ ] Handle 404 for invalid slugs
- [ ] Add SEO component with post-specific meta
- [ ] Add article structured data (JSON-LD)
- [ ] Display post title as H1
- [ ] Display publication date (formatted)
- [ ] Display reading time
- [ ] Display tags
- [ ] Render post content
- [ ] Add "Back to blog" link
- [ ] Responsive layout

### Static Assets

- [ ] Add `static/headshot.jpg` (headshot)
- [ ] Add `static/og-image.jpg` (1200x630 Open Graph image)
- [ ] Add `static/favicon.ico`
- [ ] Add `static/icon.svg`
- [ ] Add `static/apple-touch-icon.png`
- [ ] Add `static/manifest.webmanifest`

---

## Phase 5: Blog System

### Blog Utilities

- [ ] Create `src/lib/utils/blog.ts`
- [ ] Implement `getPosts()` function
  - Use `import.meta.glob`
  - Filter by `published: true`
  - Sort by date descending
  - Return array of post metadata
- [ ] Implement `getPost(slug)` function
  - Return single post with content
- [ ] Implement `formatDate(date)` function
  - Return UK-formatted date string
- [ ] Implement `calculateReadingTime(content)` function
  - Assume 200 words per minute
  - Return number of minutes

### Blog Types

- [ ] Create `src/lib/types/blog.ts`
- [ ] Define `BlogPost` interface
  - slug: string
  - title: string
  - date: string
  - description: string
  - tags: string[]
  - published: boolean
- [ ] Define `BlogPostWithContent` interface
  - Extends BlogPost
  - content: Component

### Blog Post Layout

- [ ] Create `src/lib/layouts/BlogPost.svelte`
- [ ] Accept frontmatter props
- [ ] Wrap content in `<article>`
- [ ] Display title, date, reading time
- [ ] Style prose content
- [ ] Ensure code blocks styled
- [ ] Ensure links styled and accessible

### Content Directory

- [ ] Create `src/content/blog/` directory
- [ ] Create sample post: `hello-world.md`
- [ ] Create sample post: `accessibility-matters.md`
- [ ] Verify frontmatter structure
- [ ] Verify posts render correctly

### Server Routes

- [ ] Implement `/blog/+page.server.ts`
  - Export `load` function
  - Call `getPosts()`
  - Return posts to page
- [ ] Implement `/blog/[slug]/+page.server.ts`
  - Export `load` function
  - Get slug from params
  - Load post content
  - Return 404 if not found

---

## Phase 6: SEO & Meta

### Global Meta (app.html)

- [ ] Set `<meta charset="utf-8">`
- [ ] Set viewport meta tag
- [ ] Add theme-color meta (light)
- [ ] Add theme-color meta (dark, with media query)
- [ ] Add favicon link (ico)
- [ ] Add icon link (svg)
- [ ] Add apple-touch-icon link
- [ ] Add manifest link

### Page Meta

- [ ] Homepage: title, description, OG tags
- [ ] About page: title, description, OG tags
- [ ] Blog listing: title, description, OG tags
- [ ] Blog posts: dynamic title, description, OG tags

### Structured Data

- [ ] Create Person schema (JSON-LD)
- [ ] Add to layout or homepage
- [ ] Create BlogPosting schema template
- [ ] Add to blog post pages
- [ ] Validate with Google Rich Results Test

### Sitemap

- [ ] Create `src/routes/sitemap.xml/+server.ts`
- [ ] Generate XML sitemap dynamically
- [ ] Include homepage, about, blog listing
- [ ] Include all blog post URLs
- [ ] Set appropriate lastmod dates
- [ ] Set priority values

### robots.txt

- [ ] Create `src/routes/robots.txt/+server.ts`
- [ ] Allow all crawlers
- [ ] Reference sitemap URL

### Canonical URLs

- [ ] Add canonical link to all pages
- [ ] Use absolute URLs
- [ ] Verify no duplicate content issues

---

## Phase 7: Accessibility Audit (WCAG 2.2 AAA)

### Automated Testing

- [ ] Run axe DevTools on homepage
- [ ] Run axe DevTools on about page
- [ ] Run axe DevTools on blog listing
- [ ] Run axe DevTools on blog post
- [ ] Enable AAA rules in axe
- [ ] Fix all violations
- [ ] Run WAVE on all pages
- [ ] Verify 7:1 contrast ratios
- [ ] Run IBM Equal Access
- [ ] Fix all issues

### Colour Contrast

- [ ] Verify body text: 7:1 ratio minimum
- [ ] Verify large text: 4.5:1 ratio minimum
- [ ] Verify UI components: 3:1 ratio minimum
- [ ] Verify focus indicators: 3:1 ratio minimum
- [ ] Test in light mode
- [ ] Test in dark mode

### Keyboard Navigation

- [ ] Tab through entire homepage
- [ ] Tab through about page
- [ ] Tab through blog listing
- [ ] Tab through blog post
- [ ] Verify logical tab order
- [ ] Verify no focus traps
- [ ] Verify skip link works
- [ ] Verify Enter/Space activates buttons
- [ ] Verify Escape closes any modals

### Screen Reader Testing

- [ ] Test with VoiceOver (macOS)
  - [ ] Homepage
  - [ ] About page
  - [ ] Blog listing
  - [ ] Blog post
- [ ] Test with VoiceOver (iOS)
- [ ] Test with NVDA (Windows)
- [ ] Test with TalkBack (Android)
- [ ] Verify heading hierarchy announced
- [ ] Verify landmarks announced
- [ ] Verify links have clear text
- [ ] Verify images have alt text

### Touch Targets

- [ ] Verify all buttons ≥44x44px
- [ ] Verify all links ≥44x44px
- [ ] Verify adequate spacing between targets
- [ ] Test on actual mobile device

### Motion & Preferences

- [ ] Test with `prefers-reduced-motion: reduce`
- [ ] Verify animations disabled/reduced
- [ ] Test Windows High Contrast Mode
- [ ] Verify content remains legible

### Focus Indicators

- [ ] Verify focus visible on all interactive elements
- [ ] Verify focus indicator ≥2px
- [ ] Verify focus contrast ≥3:1
- [ ] Test in both light and dark modes

### Content Accessibility

- [ ] Verify reading level is accessible
- [ ] Verify no orphaned form labels
- [ ] Verify error messages accessible
- [ ] Verify no auto-playing media

---

## Phase 8: Device & Browser Testing

### Mobile Phones

- [ ] iPhone SE (320px width)
  - Layout correct
  - Text readable
  - Touch targets adequate
- [ ] iPhone 14/15 standard
- [ ] iPhone Pro Max
- [ ] Android phone (Pixel or Samsung)
- [ ] Test portrait orientation
- [ ] Test landscape orientation

### Tablets

- [ ] iPad Mini
- [ ] iPad Air/Pro
- [ ] Android tablet
- [ ] Test portrait orientation
- [ ] Test landscape orientation

### Desktop

- [ ] 1366px width (laptop)
- [ ] 1920px width (full HD)
- [ ] 2560px width (QHD)
- [ ] Test window resize behaviour

### Browsers

- [ ] Chrome (latest) - Desktop
- [ ] Chrome (latest) - Android
- [ ] Firefox (latest) - Desktop
- [ ] Firefox (latest) - Android
- [ ] Safari (latest) - macOS
- [ ] Safari (latest) - iOS
- [ ] Edge (latest) - Desktop
- [ ] Samsung Internet - Android

### Zoom Levels

- [ ] 100% zoom (default)
- [ ] 150% zoom
- [ ] 200% zoom
- [ ] 400% zoom
- [ ] Verify no horizontal scroll
- [ ] Verify all content accessible
- [ ] Verify no text truncation

### Special Conditions

- [ ] Test print stylesheet (Ctrl/Cmd + P)
- [ ] Test slow 3G connection (DevTools throttling)
- [ ] Test offline (service worker if implemented)
- [ ] Test with images disabled
- [ ] Test with JavaScript disabled (graceful degradation)

---

## Phase 9: Performance & Launch

### Lighthouse Audit

- [ ] Run Lighthouse on homepage
- [ ] Run Lighthouse on about page
- [ ] Run Lighthouse on blog listing
- [ ] Run Lighthouse on blog post
- [ ] Achieve Performance: 100
- [ ] Achieve Accessibility: 100
- [ ] Achieve Best Practices: 100
- [ ] Achieve SEO: 100

### Core Web Vitals

- [ ] LCP < 1.5s
- [ ] INP < 100ms
- [ ] CLS < 0.05
- [ ] Test on mobile
- [ ] Test on desktop

### Asset Optimisation

- [ ] Convert images to WebP format
- [ ] Set appropriate image dimensions
- [ ] Add width/height to prevent CLS
- [ ] Lazy load below-fold images
- [ ] Verify precompression enabled
- [ ] Check bundle sizes
  - HTML < 20KB gzipped
  - CSS < 30KB gzipped
  - JS < 80KB gzipped

### Final Checks

- [ ] All internal links work
- [ ] All external links work
- [ ] No console errors
- [ ] No 404 errors
- [ ] Forms work (if any)
- [ ] Analytics tracking (if any)

### Build & Deploy

- [ ] Run production build (`pnpm build`)
- [ ] Test production build locally (`pnpm preview`)
- [ ] Deploy to hosting provider
- [ ] Configure custom domain (if applicable)
- [ ] Verify SSL certificate active
- [ ] Verify HTTPS redirect works

### Post-Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify pages are indexable
- [ ] Test Open Graph previews (social sharing)
- [ ] Monitor Core Web Vitals in real-world

---

## Summary Statistics

| Phase | Total Tasks |
|-------|-------------|
| 1. Project Setup | 35 |
| 2. Core Components | 45 |
| 3. Layout & Theming | 25 |
| 4. Pages | 40 |
| 5. Blog System | 30 |
| 6. SEO & Meta | 25 |
| 7. Accessibility Audit | 55 |
| 8. Device Testing | 40 |
| 9. Performance & Launch | 35 |
| **Total** | **~330** |

---

## Notes

- Tasks may be completed in parallel where dependencies allow
- Accessibility tasks should be addressed throughout, not just in Phase 7
- Device testing should occur incrementally during development
- Update this document as tasks are completed
