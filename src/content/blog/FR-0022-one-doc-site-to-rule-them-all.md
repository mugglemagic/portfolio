---
ref: FR-0022
title: "One Doc Site to Rule Them All"
description: "How we built a unified documentation site that serves engineers, product, and AI assistants equally well."
author: "Mark Basford"
date: 2025-12-01
tags: [architecture, developer-experience, documentation, nextjs, mdx]
series: "Developer Experience"
part: 4
word_count: 1150
estimated_reading_time: "8 min"
published: true
research_sources:
  - apps/docs/manifest.json
  - apps/docs/next.config.ts
  - BLOG-GUIDELINES.md
---

In 1086, William the Conqueror had a problem. He'd won England, but he didn't know what he owned.

Twenty years after Hastings, the kingdom was his in name, but the details were scattered across a thousand local records, held by a thousand local lords, written in formats nobody had standardised. What manors existed? How many ploughs worked the land? How many pigs? What was it all worth? William needed to know, and the only way to know was to count.

So he sent commissioners to every corner of England. They surveyed every manor, recorded every acre, catalogued every pig. The result was the Domesday Book - a complete inventory of the realm. But here's the thing: William didn't move any of it. The pigs stayed in their fields. The manors stayed where they'd always been. The land didn't relocate to Winchester. He simply created a manifest of what existed and where to find it.

Nine centuries later, we faced a similar problem with documentation.

## The Duplication Trap

Documentation lives where it's written. ADRs sit in `docs/adr/`. Guides live in `docs/guides/`. Component PRDs nest inside `packages/ui/components/themis/docs/prd/`. Blog posts accumulate in `docs/blogs/`. Each document placed deliberately, close to the code it describes, where developers actually look for it.

This works brilliantly for development. Need to understand the theme system? The guide is right there in `docs/guides/THEMES_GUIDE.md`. Working on the Button component? The PRD is in the same directory tree. AI assistants pick up context naturally because the documentation sits alongside the code they're helping you write.

But then you want a documentation site.

The obvious approach: copy everything into the docs app. Create a `content/` directory, duplicate all the markdown, build your pages. The problem is immediate and permanent: you now maintain two copies of every document. Update the telemetry guide? Update it twice. Add a new ADR? Remember to copy it over. Forget once, and your docs site drifts from reality.

We've seen this pattern before. It never ends well.

## The Insight

The documents don't need to move. They just need to be surveyed.

Next.js handles MDX natively. The framework doesn't care where the markdown lives - it just needs a path to read. A file at `../../docs/guides/TELEMETRY_GUIDE.md` renders exactly the same as one at `content/guides/telemetry.md`. The only difference is who maintains the path.

So we built our own Domesday Book.

```json
{
  "guides": [
    {
      "title": "Frontend",
      "items": [
        {
          "title": "Telemetry Guide",
          "slug": "frontend/telemetry",
          "path": "../../docs/guides/TELEMETRY_GUIDE.md"
        },
        {
          "title": "Themes Guide",
          "slug": "frontend/themes",
          "path": "../../docs/guides/THEMES_GUIDE.md"
        }
      ]
    }
  ],
  "blog": [
    {
      "title": "The Multizone Gambit",
      "path": "../../docs/blogs/FR-0001-the-multizone-gambit.md",
      "slug": "fr-0001-the-multizone-gambit",
      "badge": "Series"
    }
  ]
}
```

The manifest is a survey, not a container. It records where documents live without moving them. Add a new guide to `docs/guides/`, add a line to the manifest, done. The source of truth remains singular. The pigs stay in their fields.

## Two Hours

This took two hours to implement. Not two days, not two sprints. Two hours, working with Claude.

That's not a boast about speed. It's a statement about preparation.

When we chose Next.js, documentation was part of the evaluation. Could we integrate MDX directly? Could we reference files outside the app directory? Could we build a docs site without duplicating content? The answer to all three was yes. We knew this before writing a line of application code.

The multizone architecture (FR-0001) meant adding another zone was mechanical. Create the app, configure the port, add the nginx route. The pattern was established. The docs zone just followed it.

The MDX support was native. No complex build pipelines, no static site generator bolted onto the side. Next.js reads markdown, renders it, done.

Two hours because the hard decisions were already made.

## Three Audiences, One Source

The docs site serves three distinct audiences from the same source files:

**Developers** get documentation where they work. The guides live in `docs/guides/`, right where you'd look for them. When you're implementing telemetry, the guide is in context. When AI tools help you write code, they read the same guides you do. The files are positioned for maximum discoverability during development.

**The Team** gets a searchable, browsable documentation site. No more "where's that ADR about theme management?" - it's in the sidebar, organised, linked. New team members can explore the architecture without knowing where to look in the codebase first.

**Customers** - eventually - get product documentation that lives separately from the code but integrates seamlessly. A training guide can be written by the product team, stored wherever makes sense for them, and pulled into the customer-facing docs through the same manifest pattern. The content updates without deployments.

Same files. Different presentations. Zero duplication.

## The Kingdom, Catalogued

William's commissioners didn't just count pigs for the sake of counting. The Domesday Book let him tax accurately, settle disputes definitively, and understand his kingdom completely. The act of surveying created value that the scattered records never could.

Our manifest does the same. The documents existed before. They were useful before. But scattered across directories, they were only useful to those who already knew where to look. The manifest brings them together without moving them, makes them discoverable without duplicating them, presents them professionally without maintaining them twice.

Documentation stays current because it lives with the code. It stays useful because it's presented alongside related docs. It stays maintained because there's only one copy to maintain.

One survey. One source of truth. One doc site to rule them all.

---

## Technical Notes

**Docs Zone Location:** `apps/docs/`

**Key Files:**
- `manifest.json` - Maps document paths to slugs and navigation structure
- `next.config.ts` - MDX configuration with Turbopack compatibility
- `lib/mdx.ts` - Functions to read and parse MDX from manifest paths

**Pattern:**
- Documents remain in original locations (`docs/`, `packages/*/docs/`)
- Manifest provides navigation structure and URL slugs
- MDX files rendered via `next-mdx-remote` for flexibility

**Related Posts:**
- FR-0001: The Multizone Gambit (zone architecture)
- FR-0009: Writing for AI Assistants (documentation as context)
- FR-0011: The Shared Package Strategy (workspace organisation)

**Stack:** Next.js 16, MDX, next-mdx-remote, Turbopack

---

## A Note on How This Was Written

As with all posts in this series, this was written with AI assistance. The architectural decisions, the Domesday Book parallel, and the reasoning are mine. The clarity, hopefully, comes from the collaboration. Every technical claim has been verified against the actual codebase.
