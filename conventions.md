# Coding Conventions
## Derived from EOS Frontend Architecture

This document captures coding patterns, conventions, and standards from Mark Basford's EOS frontend project for use in this portfolio site.

---

## Component Architecture

### 3-Layer Component Pattern

All interactive components follow a 3-layer architecture for accessibility and flexibility:

```
┌─────────────────────────────────────┐
│  Layer 1: Touch Target (44×44px)    │  ← Accessibility hit area
│  ┌─────────────────────────────┐    │
│  │  Layer 2: Visual Appearance │    │  ← Styled element (CVA)
│  │  ┌─────────────────────┐    │    │
│  │  │  Layer 3: Content   │    │    │  ← Text, icons, effects
│  │  └─────────────────────┘    │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Example Implementation:**

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn'

  let { variant = 'default', size = 'default', children } = $props()
</script>

<!-- Layer 1: Touch target -->
<button
  class={cn(
    'inline-flex items-center justify-center',
    'min-h-[44px] min-w-[44px]',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
  )}
>
  <!-- Layer 2: Visual appearance -->
  <span
    class={cn(
      'inline-flex items-center justify-center gap-2',
      'rounded-md transition-colors',
      variant === 'default' && 'bg-primary text-primary-foreground',
      variant === 'outline' && 'border border-input bg-background',
      size === 'default' && 'h-10 px-4 py-2',
      size === 'sm' && 'h-9 px-3',
      size === 'lg' && 'h-11 px-8'
    )}
  >
    <!-- Layer 3: Content -->
    {@render children?.()}
  </span>
</button>
```

---

## TypeScript Patterns

### Strict Mode Requirements

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true
  }
}
```

### Type Definitions

Define types in dedicated files:

```typescript
// src/lib/types/blog.ts
export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  published: boolean
}

export interface BlogPostWithContent extends BlogPost {
  content: string
  readingTime: number
}
```

### Component Props Pattern

```typescript
// Define base props for accessibility
interface BaseComponentProps {
  class?: string
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-labelledby'?: string
}

// Extend for specific components
interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  loading?: boolean
}
```

---

## Styling Conventions

### Class Name Utility

Always use the `cn()` utility for conditional classes:

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
    'base-styles here',
    isActive && 'active-styles',
    variant === 'primary' && 'primary-styles',
    className
  )}
>
```

### CSS Custom Properties

Use CSS custom properties for theming, not Tailwind colour classes directly:

```css
/* Correct */
.button {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

/* Avoid */
.button {
  @apply bg-black text-white dark:bg-white dark:text-black;
}
```

### OKLCH Colour Space

Define colours in OKLCH for perceptual uniformity:

```css
:root {
  --primary: oklch(0.145 0 0);
  --primary-foreground: oklch(0.985 0 0);
}

.dark {
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.145 0 0);
}
```

---

## Accessibility Patterns

### Touch Targets

All interactive elements must have a minimum 44×44px touch target:

```svelte
<button class="min-h-[44px] min-w-[44px] ...">
  <!-- Visual button can be smaller, touch target stays 44px -->
</button>
```

### Focus Indicators

Consistent focus styles across all interactive elements:

```css
.focus-ring {
  @apply focus-visible:outline-none
         focus-visible:ring-2
         focus-visible:ring-ring
         focus-visible:ring-offset-2
         focus-visible:ring-offset-background;
}
```

### Icon Buttons

Icon-only buttons must have accessible labels:

```svelte
<button aria-label="Close menu">
  <XIcon aria-hidden="true" />
</button>
```

### Skip Link

Always include a skip link as the first focusable element:

```svelte
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
         focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground
         focus:ring-2 focus:ring-ring"
>
  Skip to main content
</a>
```

### Reduced Motion

Always respect user motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### High Contrast Support

Use the `hc:` prefix for high contrast mode overrides (if configured):

```svelte
<button class="border border-border hc:border-2 hc:border-foreground">
```

---

## File Organisation

### Component File Structure

```
src/lib/components/
├── ui/                     # shadcn-svelte primitives
│   ├── button/
│   │   ├── index.ts        # Barrel export
│   │   └── button.svelte   # Component
│   └── card/
│       ├── index.ts
│       └── card.svelte
├── Header.svelte           # App-specific components
├── Footer.svelte
└── BlogCard.svelte
```

### Barrel Exports

Use index.ts files for clean imports:

```typescript
// src/lib/components/ui/button/index.ts
export { default as Button } from './button.svelte'
export type { ButtonProps } from './button.svelte'
```

**Usage:**

```typescript
import { Button } from '$lib/components/ui/button'
```

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BlogCard.svelte` |
| Hooks/utilities | camelCase | `useTheme.ts`, `formatDate.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_POSTS_PER_PAGE` |
| CSS classes | kebab-case | `blog-card-header` |
| Types/Interfaces | PascalCase | `BlogPost`, `ButtonProps` |
| Files (non-component) | camelCase | `blog.ts`, `cn.ts` |

---

## Code Style

### Prettier Configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"]
}
```

### ESLint Rules

Key rules to enforce:

```javascript
{
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'prefer-const': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
}
```

---

## Svelte 5 Patterns

### Props with Defaults

```svelte
<script lang="ts">
  interface Props {
    title: string
    description?: string
    variant?: 'default' | 'featured'
  }

  let {
    title,
    description = '',
    variant = 'default'
  }: Props = $props()
</script>
```

### Children and Snippets

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
    header?: Snippet
  }

  let { children, header }: Props = $props()
</script>

{#if header}
  <header>
    {@render header()}
  </header>
{/if}

<main>
  {@render children()}
</main>
```

### Reactive State

```svelte
<script lang="ts">
  // State
  let count = $state(0)

  // Derived
  let doubled = $derived(count * 2)

  // Effects
  $effect(() => {
    console.log('Count changed:', count)
  })
</script>
```

### Event Handlers

```svelte
<script lang="ts">
  interface Props {
    onclick?: (event: MouseEvent) => void
  }

  let { onclick }: Props = $props()
</script>

<button {onclick}>Click me</button>
```

---

## Testing Patterns

### Component Testing

```typescript
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import Button from './Button.svelte'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  it('renders with correct text', () => {
    render(Button, { props: { children: 'Click me' } })
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(Button, { props: { onclick: handleClick } })

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(Button, { props: { children: 'Click' } })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

### Accessibility Testing

Always include axe tests for components:

```typescript
it('meets WCAG AAA contrast requirements', async () => {
  const { container } = render(Component)
  const results = await axe(container, {
    rules: {
      'color-contrast': { enabled: true }
    }
  })
  expect(results).toHaveNoViolations()
})
```

---

## Performance Patterns

### Lazy Loading

```svelte
<script lang="ts">
  import { onMount } from 'svelte'

  let Component: typeof import('./HeavyComponent.svelte').default

  onMount(async () => {
    const module = await import('./HeavyComponent.svelte')
    Component = module.default
  })
</script>

{#if Component}
  <Component />
{:else}
  <div>Loading...</div>
{/if}
```

### Image Optimisation

```svelte
<img
  src="/headshot.jpg"
  alt="Mark Basford"
  width="200"
  height="200"
  loading="lazy"
  decoding="async"
/>
```

---

## JSDoc Comments

Use JSDoc for public APIs and complex functions:

```typescript
/**
 * Formats a date string for display.
 *
 * @param date - ISO date string (e.g., "2025-12-01")
 * @returns Formatted date string (e.g., "1 December 2025")
 *
 * @example
 * ```ts
 * formatDate('2025-12-01') // "1 December 2025"
 * ```
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
```

---

## Summary Checklist

When writing code, ensure:

- [ ] TypeScript strict mode compliance (no `any`)
- [ ] 44×44px minimum touch targets
- [ ] Focus indicators on all interactive elements
- [ ] ARIA labels on icon-only buttons
- [ ] `cn()` utility for conditional classes
- [ ] CSS custom properties for colours
- [ ] Reduced motion support
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy
- [ ] No semicolons (Prettier)
- [ ] Single quotes (Prettier)
- [ ] Component tests with axe
