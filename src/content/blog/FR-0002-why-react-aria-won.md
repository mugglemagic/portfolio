---
ref: FR-0002
title: "Why React Aria Won"
description: "Our journey evaluating component libraries and why React Aria's headless approach was the right choice for accessibility-first development."
author: "Mark Basford"
date: 2025-01-17
tags: [architecture, accessibility, react-aria, components, performance]
series: "Architecting for Everything"
part: 3
word_count: 1438
estimated_reading_time: "10 min"
published: true
research_sources:
  - 0003-component-library-hybrid-approach.md
  - packages/ui/components/themis/
  - react-spectrum.adobe.com
  - ui.shadcn.com/docs/registry
---

There's an IKEA table called the Lack. Costs about fifteen quid, looks decent enough, fits in any room. Millions sold. What most people don't realise until they try to move it is that the legs are hollow - cardboard honeycomb inside a thin veneer. It does the job right up until it doesn't.

We found ourselves thinking about that table quite a lot when evaluating component libraries.

## The False Choice

Every component library we evaluated seemed to force a trade-off. Accessibility or style - pick one. Lightweight or feature-rich - pick one. Customisable or well-maintained - pick one.

We'd been through this before with the legacy system. Layers of UI decisions made at different times, each reasonable in isolation, each creating friction with the others. jQuery plugins sitting next to React components sitting next to hand-rolled accessibility patches. The kind of situation where fixing one thing breaks three others.

The new system needed foundations that wouldn't crack under pressure. Not the cheapest option, not the flashiest - the one that would still be standing in five years.

## The Research

This wasn't a gut decision. We built evaluation matrices, weighted criteria, tested implementations. Weeks of work before writing a single production component.

Our criteria, in order of importance:

**Accessibility that's architectural, not cosmetic.** We needed WCAG 2.2 compliance baked into the primitives, not bolted on afterwards. There's a future blog post about why this matters so deeply to us, but for now: we build recruitment software, and if someone can't complete a job application because we were lazy about focus management, that's on us.

**Performance that doesn't require heroics.** Bundle size matters. Tree-shaking matters more. We didn't want a library where keeping things fast required constant vigilance and import discipline.

**Long-term sustainability.** Who maintains this? What's their incentive to keep maintaining it? Will this still exist and improve in 2027, or will we be migrating again?

**Styling flexibility.** We have our own design language. Whatever we chose needed to get out of the way and let us build what we actually wanted.

## What We Evaluated

The landscape is crowded. Material UI, Chakra UI, Radix, Headless UI, various Tailwind component collections. Each with advocates, each with genuine strengths.

Material UI is battle-tested - Netflix uses it, Amazon uses it. But 133KB gzipped is substantial, and Material Design's aesthetic would require significant customisation to match our brand. More importantly, its CSS-in-JS approach would conflict with our Tailwind and Theme Provider architecture. We'd be running two parallel styling systems.

Chakra UI v3 genuinely impressed us. The team did remarkable work on the rewrite - 50% bundle reduction, proper tree-shaking, accessibility that's clearly a priority. For a while, it was our leading candidate.

Radix and the various ShadCN implementations looked promising. Copy-paste ownership, Tailwind-native, active community. But professional accessibility audits we reviewed found issues that would require fixing. Why volunteer for extra work when other options handle it properly?

The Tailwind-native libraries like Preline had the styling flexibility we wanted but accessibility gaps we couldn't accept.

## The Sustainability Question

Here's where Chakra started to concern us.

Chakra is maintained by talented people doing excellent work. But it's a smaller team, and the jump from v2 to v3 - while impressive - also demonstrated how much can change between major versions. We'd seen this pattern before: promising library, great momentum, then the maintainers move on or priorities shift.

React Aria is Adobe.

That sounds like corporate allegiance, which isn't quite the point. The point is incentive structure. Adobe uses React Aria to build their own products - Creative Cloud, Experience Cloud, the Spectrum design system that powers their enterprise software. They have a dedicated accessibility team testing these components. They're not maintaining this as a side project; it's infrastructure they depend on.

When we looked at who would still be investing in accessibility improvements in five years, the answer seemed clearer.

## The Headless Advantage

React Aria is headless. No styles, no opinions about how things should look - just behaviour. Keyboard navigation, focus management, screen reader announcements, touch handling, all the invisible complexity that makes components actually accessible.

This initially seemed like more work. Other libraries give you styled components; React Aria gives you primitives that do nothing visual at all.

But we started seeing it differently. The Lack table looks good because IKEA designed it to look good. You get their design, their compromises, their hollow legs. React Aria is more like buying quality oak and building your own table. More effort upfront, but you end up with exactly what you need, built to last.

The headless architecture meant we could use our existing Tailwind setup, our Theme Provider, our design tokens. No fighting against someone else's styling opinions. No parallel systems. Just behaviour primitives that handle the hard accessibility work while we handle the visual layer.

## The ShadCN Insight

This is where things got interesting.

ShadCN isn't really a component library - it's a philosophy and a registry pattern. Components you copy into your codebase, styled with Tailwind and CSS variables, following consistent conventions. No package to depend on, no version updates to manage. The code becomes yours.

We'd seen JollyUI, which combines React Aria with ShadCN's styling approach. It demonstrated the hybrid was viable - React Aria for the accessible behaviour, ShadCN's patterns for the styling architecture. JollyUI deserves credit for proving the concept.

But JollyUI is a personal project, and we needed something we could build on long-term. What we took from it was the pattern: React Aria as the behavioural foundation, ShadCN's registry and styling conventions as the visual layer.

The insight was that we didn't need ShadCN's components - we needed ShadCN's approach. The registry pattern. The CSS variable integration. The way it plays nicely with design systems and, increasingly, with AI tooling that can understand consistent patterns.

## The Hybrid Approach

So we built a hybrid.

React Aria handles everything interactive. Buttons, dialogs, selects, menus, date pickers, form controls. Anywhere keyboard navigation matters, anywhere focus management matters, anywhere screen reader announcements matter - that's React Aria territory.

For components that don't need that level of accessibility machinery - cards, badges, separators, purely visual elements - we build them ourselves following ShadCN's styling patterns.

The result is a component library where the complex stuff is handled by Adobe's accessibility experts, and the simple stuff follows a consistent, repeatable pattern that integrates with our design system.

Bundle impact: around 20-30KB gzipped for everything we use. Material UI's baseline is 80-100KB before you've done anything.

## What We Actually Got

Looking at where we are now:

Components that are WCAG 2.2 accessible without us having to think about it. React Aria handles the edge cases - the mobile touch events, the right-to-left support, the screen reader announcements. We focus on making things look right and work well.

A styling architecture that uses CSS custom properties consistently. Our Theme Provider controls everything. Light mode, dark mode, high contrast, colourblind-safe palettes - one system, no conflicts.

A foundation that should scale. When React Aria improves - and it does, regularly - we get those improvements. When our design evolves, we update our styling layer without touching the accessibility machinery.

And, perhaps most practically: a pattern that AI tools can understand. Consistent file structures, consistent prop patterns, consistent styling conventions. Claude Code actually helps us build components faster because the patterns are learnable.

## The Table We're Building

The Lack table works until you need to move it, or someone leans on it too hard, or you try to use it for something it wasn't designed for. Then you discover the hollow legs.

We're not building IKEA furniture. We're building something we'll be maintaining and extending for years, something that needs to handle enterprise scale, something that has to work for everyone who uses it.

React Aria gave us the oak. ShadCN showed us the joinery patterns. The table we're building is ours - styled our way, structured our way, but standing on foundations that won't collapse when we lean on them.

Sometimes the right choice isn't the quickest or the cheapest. Sometimes it's the one that's still working properly in five years.

---

## Technical Notes

**Component Library Location:** `packages/ui/components/themis/`

**Key Dependencies:**
- `react-aria-components` - Accessible primitives
- `class-variance-authority` - Variant styling (CVA)
- Tailwind CSS with CSS custom properties

**Related Posts:**
- FR-0000: Why We're Writing This (And Why Now)
- FR-0001: The Multizone Gambit
- FR-0003: The 44px Illusion (coming soon)
- FR-0012: Data Attributes Over React State (coming soon)

**References:**
- [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/)
- [ShadCN Registry Pattern](https://ui.shadcn.com/docs/registry)
- [JollyUI](https://www.jollyui.dev/) - Honourable mention for proving the hybrid approach

---

## A Note on How This Was Written

As with all posts in this series, this was written with AI assistance. The evaluation process, the decision-making, and the reasoning are mine. The research took weeks; the writing took considerably less time with help. Every technical claim has been verified against our actual implementation.
