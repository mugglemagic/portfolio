---
ref: FR-0003
title: "The 44px Illusion"
description: "Why WCAG's 44px touch target requirement is more nuanced than it seems, and how we built components that actually meet the intent."
author: "Mark Basford"
date: 2025-01-18
tags: [accessibility, components, themis, wcag, touch-targets]
series: "Architecting for Everything"
part: 4
word_count: 1467
estimated_reading_time: "10 min"
published: true
research_sources:
  - 0003-component-library-hybrid-approach.md
  - switch-prd.md
  - packages/ui/components/themis/elements/Switch/Switch.tsx
---

In 1839, a French clockmaker named Jean-Eugène Robert-Houdin unveiled something that shouldn't have been possible. A clock with transparent glass faces, no visible gears, no apparent mechanism - yet the hands moved precisely, as if by magic. The audience saw an elegant timepiece floating in space. What they couldn't see was the second glass dial, positioned behind the visible one, connected by a hidden rod running through the ornate base. The invisible layer did all the work. The visible layer got all the attention.

Robert-Houdin went on to become the father of modern stage magic, but his mystery clocks stayed with us. Not because we're building clocks, but because we kept encountering the same problem he solved: how do you make something work properly without making it look like it's working?

## The Design Contradiction

WCAG 2.2 Success Criterion 2.5.5 recommends touch targets of at least 44 by 44 CSS pixels. This isn't arbitrary - it's the size that accommodates users with motor impairments, people using devices in unstable environments, anyone whose fingers aren't perfectly precise. Apple and Google both recommend similar dimensions for their platforms.

But designers, reasonably, want compact interfaces. A toggle switch that's 44 pixels tall looks chunky. A small, sleek 20-pixel switch looks modern. The usual compromise forces a choice: accessible or stylish.

Most solutions we evaluated accepted this trade-off. Either the component looked clunky to meet accessibility requirements, or it looked good but failed users who needed larger touch targets. Some libraries offered an "accessibility mode" - as if accessibility were an optional feature rather than a baseline requirement.

We weren't willing to accept that trade-off.

## The Frustrating First Attempt

When building the Switch component for our Themis library, I started with the obvious approach. React Aria provides the accessible primitives - keyboard handling, focus management, ARIA attributes, screen reader announcements. We'd wrap that in our styling. Simple enough.

The first implementation used two layers: the interactive switch track and the sliding thumb inside it. To meet the 44-pixel requirement, I made the track 44 pixels tall.

It looked terrible. Genuinely clunky. The kind of toggle you'd expect from enterprise software that treats accessibility as a compliance checkbox rather than a design constraint. We could have shipped it - it would have passed every audit - but it wasn't something we'd be proud of.

I was frustrated, honestly. We'd chosen React Aria specifically because Adobe's accessibility team handles the hard problems. But even React Aria's own Select component only meets WCAG Level AA, not AAA. We're trying to build a component library that aims higher. "Fairer, faster, better hiring" isn't just a tagline - it's a constraint that shapes every decision. If someone with motor impairments can't complete a job application because we prioritised aesthetics over usability, that's on us.

Then I started thinking about Robert-Houdin's clocks. The visible dial wasn't the mechanism. The mechanism was invisible.

## The Three-Layer Architecture

What if the touch target isn't the visual element?

The insight was simple once it arrived: separate the interactive layer from the visual layer entirely. The thing you tap doesn't have to be the thing you see.

**Layer 1: The Invisible Stage**

The outermost layer is always 44 by 44 pixels minimum. It's transparent. Sighted users don't know it exists. But it's the actual interactive element - the thing that receives clicks, taps, and focus.

```typescript
const switchOuterVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center min-h-[44px] min-w-[44px]",
  { variants: {} }
);
```

**Layer 2: The Visual Track**

Inside the invisible touch target sits the visual switch - the track that changes colour when toggled. This can be any size the design requires: 20 pixels for a compact switch, 24 for default, 28 for large. The visual size is independent of the touch target size.

```typescript
const switchTrackVariants = cva(
  "relative inline-flex shrink-0 items-center rounded-full border-2 transition-colors",
  {
    variants: {
      size: {
        sm: "h-5 w-9",      // 20x36px - looks compact
        default: "h-6 w-11", // 24x44px - standard
        lg: "h-7 w-14",      // 28x56px - large
      },
    },
  }
);
```

**Layer 3: The Sliding Thumb**

The innermost layer is the circular thumb that slides to indicate state. Pure visual feedback, no interaction handling.

```typescript
const switchThumbVariants = cva(
  "pointer-events-none absolute rounded-full bg-background shadow-lg transition-transform",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
  }
);
```

The assembled component nests these layers:

```tsx
<Switch className={switchOuterVariants()}>
  {(renderProps) => (
    <div className={switchTrackVariants({ size })}>
      <span className={switchThumbVariants({ size })} />
    </div>
  )}
</Switch>
```

Designers see a sleek 20-pixel switch. Users with motor impairments get a 44-pixel touch target. Same component, different experiences based on what each person needs.

## Why 44 and Not 24?

WCAG 2.5.8 at Level AA requires only 24 pixels minimum. We could have met that standard with less effort.

But AA is the floor, not the ceiling.

We're building recruitment software. The entire point is helping people find jobs. If we're going to solve the accessibility problem, we should solve it properly - not scrape past the minimum requirement. Level AAA's 44-pixel recommendation exists because it genuinely helps more people: those with motor impairments, users on bumpy commutes, anyone tapping quickly on mobile.

Being mobile-first makes this practical as well as principled. Our users are recruiters reviewing applications between meetings, candidates applying from their phones. Larger touch targets aren't just an accessibility feature - they're better design for everyone using a touchscreen.

## The Pattern Scales

The three-layer approach isn't specific to switches. Any interactive element can use the same architecture:

- **Buttons**: The visible button can be any size; the touch target stays 44 pixels
- **Checkboxes**: Small visual checkbox, full-size interactive area
- **Radio buttons**: Same principle
- **Close buttons on dialogs**: The tiny X icon sits inside a properly-sized touch target

Once you separate "what you see" from "what you touch," the false choice between accessibility and aesthetics dissolves.

## Testing the Illusion

The three-layer architecture creates an interesting testing situation. Visual regression tests verify the component looks right - the compact switch, the smooth animations, the theme integration. Accessibility tests verify the touch target is 44 pixels. Both pass because they're testing different layers.

```typescript
// Visual test: Switch looks compact
expect(track).toHaveClass('h-5'); // 20px visual height

// Accessibility test: Touch target is adequate
expect(outer).toHaveStyle({ minHeight: '44px', minWidth: '44px' });
```

Screen readers interact with the outer layer and announce the switch properly. Sighted users interact with what appears to be the visual layer. Everyone gets what they need.

## The Quiet Part

Passing the WCAG checklist is one thing. Whether someone can actually use the component is another question entirely. Audits check the specification; they don't check the experience. A 44-pixel target that's technically present but visually obscured still passes automated testing while failing real users.

The three-layer pattern works because it treats accessibility as a design problem, not a compliance problem. The solution isn't "make the switch bigger" - it's "separate the concerns so each layer can do its job properly."

Robert-Houdin understood this. The visible clock face did its job: looking elegant. The hidden mechanism did its job: keeping time. Neither compromised for the other because they operated on different layers.

## The Takeaway

Accessibility and aesthetics aren't opposing forces. They're different layers of the same component. When you stop trying to make one layer do both jobs, the conflict disappears.

The small switch users see is real. The large touch target users touch is also real. They're just not the same element - and they don't need to be.

Sometimes the best solution is the one nobody notices.

---

## Technical Notes

**Component Location:** `packages/ui/components/themis/elements/Switch/`

**Key Dependencies:**
- `react-aria-components` - Accessible primitives (FR-0002)
- `class-variance-authority` - Variant styling (CVA)
- Tailwind CSS with semantic tokens

**WCAG Compliance:**
- Level AAA touch targets (44x44px minimum)
- 7:1 contrast ratio in high-contrast theme
- Full keyboard navigation (Space, Enter to toggle)
- Screen reader announcements via React Aria

**Related Posts:**
- FR-0002: Why React Aria Won
- FR-0004: The Compliance Trap (coming soon)
- FR-0012: Data Attributes Over React State (coming soon)

**References:**
- [WCAG 2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- [React Aria Switch](https://react-spectrum.adobe.com/react-aria/Switch.html)
- [Switch PRD](../../packages/ui/components/themis/docs/prd/switch-prd.md)

---

## A Note on How This Was Written

As with all posts in this series, this was written with AI assistance. The frustration with the two-layer approach, the Robert-Houdin connection, and the architectural decisions are mine. The words came together faster with help. Every code example has been verified against the actual implementation.
