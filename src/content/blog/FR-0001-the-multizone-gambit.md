---
ref: FR-0001
title: "The Multizone Gambit"
description: "How we structured our Next.js monorepo with Turborepo zones for maximum scalability and team autonomy."
author: "Mark Basford"
date: 2025-01-16
tags: [architecture, scalability, performance, maintainability, turborepo, nextjs]
series: "Architecting for Everything"
part: 2
word_count: 1347
estimated_reading_time: "9 min"
published: true
research_sources:
  - 0002-frontend-module-structure.md
  - turbo.json
  - pnpm-workspace.yaml
  - frontend.conf
---

Delta Air Lines doesn't run one enormous airport. They run hubs - Atlanta, Detroit, Minneapolis, Salt Lake City. Each hub operates independently. Each has its own gates, its own ground crews, its own local operations. But they share the same booking system, the same baggage handling protocols, the same safety standards. A plane landing in Atlanta doesn't need to know how Minneapolis handles de-icing. It just needs to know that when it gets there, the infrastructure will work the same way.

We found ourselves thinking about hubs when we started architecting the frontend.

## The Monolith Problem

The natural way to build a Next.js application is as a single application. One `app/` directory, one build process, one deployment. It's simple, it works, and for many projects it's exactly right.

But we knew where this was heading. We'd seen it before.

A single codebase means a single bundle. Every user downloads code for features they'll never touch. The admin panel ships to candidates. The settings page ships to hiring managers who'll never visit it. As the application grows, so does everything - build times, bundle sizes, the blast radius of any change.

Then there's the team scaling problem. We don't have multiple teams today, but we're building for a future where we might. And if that future arrives, we'd rather not spend six months untangling a monolith. We've done that migration before. It's not fun.

So we faced a choice: build the obvious way and refactor later, or pay a small upfront cost for architecture that scales.

We chose the upfront cost.

## The Realisation

We didn't start with multizones. We started with a normal Next.js application and a reasonable plan. Then we hit internationalisation.

Recruitment software has a lot of words. Job descriptions, application forms, email templates, UI labels - thousands of translatable strings that multiply with every language you support. Our legacy product taught us this scales poorly if you're not careful.

The plan was sensible: segment the translation files. Load only the segments needed for each area. The dashboard doesn't need admin translations. The candidate portal doesn't need recruiter strings. Fetch what you need, nothing more.

We tried. Multiple i18n packages. Creative loading strategies. Hacks that technically worked but felt like we were fighting the framework.

The problem was structural. Next.js, by design, bundles everything together. You can code-split components, but configuration and resources want to be unified. We couldn't cleanly segment without either duplicating infrastructure or building increasingly baroque workarounds.

The huh moment came somewhere around the third i18n library: we were trying to make one application behave like several. What if we just... made it several?

## The Hub Architecture

We split the frontend into five independent Next.js applications - zones in Next.js terminology.

```
apps/
├── main/        # The landing pages, public content
├── auth/        # Login, registration, password reset
├── dashboard/   # The main recruiter workspace
├── admin/       # System administration
└── settings/    # User and tenant configuration
```

Each zone is a complete, independent Next.js application. Its own `package.json`, its own `next.config.ts`, its own build process. You can run dashboard without auth running. You can deploy admin without touching settings.

Nginx handles routing. Requests to `/auth` go to the auth zone on port 3001. Requests to `/dashboard` go to port 3002. The main zone catches everything else. From the user's perspective, it's one seamless application. From the architecture's perspective, it's five independent hubs.

```nginx
location /auth {
    proxy_pass http://frontend:3001;
}

location /dashboard {
    proxy_pass http://frontend:3002;
}

# ... and so on
```

## Shared Infrastructure

Independent hubs only work if they share common infrastructure. Delta's hubs work because they use the same booking system, not five incompatible ones.

Our shared infrastructure lives in workspace packages:

**@eos/ui** - The component library. Buttons, inputs, layouts, the Themis accessible components. Every zone imports from the same source. Change a button once, every zone gets the update.

**@eos/services** - Business logic. API clients, authentication helpers, event handling, utilities. The spokes that connect each hub to the backend.

**@eos/tsconfig** - TypeScript configuration. The migration to multizones caused TypeScript friction - paths that worked in a monolith broke when we had five `tsconfig.json` files. So we created shared base configurations. Each zone extends the common defaults, adding only zone-specific overrides. Consistency without duplication.

pnpm's workspace protocol makes this seamless. Zones depend on `"@eos/ui": "workspace:*"` - always the current local version, no publishing, no version mismatches. Change a shared component, save the file, the zone hot-reloads with the update.

## Event-Driven Consistency

Here's a question: if zones are independent, how do they communicate?

The short answer is they mostly don't need to. Users aren't running dashboard and admin simultaneously. Navigation between zones is a page load, not a state transfer.

But there's a subtler problem. The same events can originate from different places. A user updates their profile - that might happen from a form submission in the settings zone, or from a WebSocket push from the backend when an admin makes changes. Two sources, same logical event.

Without coordination, you end up duplicating logic. The settings zone has its own handler for profile updates. The dashboard has another. When the WebSocket delivers the same event, you write a third handler that does the same thing differently.

We use an event-driven pattern instead. Events are standardised across the application - `user.profile.updated` means the same thing regardless of where it originated. A zone publishes the event, subscribers react. A WebSocket delivers an event, the same subscribers react. One pattern, multiple sources, consistent behaviour.

```typescript
// Settings zone updates profile
eventBus.publish('user.profile.updated', { userId, changes });

// Dashboard subscribes once, handles all sources
eventBus.subscribe('user.profile.updated', (payload) => {
  refreshUserData(payload.userId);
});
```

This isn't about zones talking to each other in real-time. It's about maintaining consistency regardless of where events originate.

## The Trade-offs

We're not pretending this is free.

**More configuration.** Five `next.config.ts` files. Five `package.json` files. Nginx routing rules. Turborepo orchestration in `turbo.json`. There's more surface area to understand.

**Development setup.** Five processes running, plus nginx. The first time you run `pnpm dev` and watch five zones spin up in parallel, it feels like a lot. (Turborepo handles this gracefully, but it's still more than one process.)

**Learning curve.** Developers need to understand the zone boundaries. Where does this feature live? Which shared package should this utility go in? The decisions aren't hard, but they're decisions that don't exist in a monolith.

We accepted these trade-offs because the alternatives were worse. A monolith that becomes painful to change. Bundle sizes that grow unbounded. A future migration that takes months instead of never being necessary.

## What We Gained

Each zone only bundles what it needs. Dashboard users don't download admin code. The auth zone is tiny - just what's required to get someone logged in.

Turborepo caches aggressively. Change something in the dashboard zone, only dashboard rebuilds. The other four zones pull from cache. Incremental work stays incremental.

Team boundaries are physical, not just conventional. You can't accidentally import dashboard code into admin because they're separate applications. The architecture enforces what code review would have to catch.

And when - if - we ever need true microservices, the extraction path is clear. Each zone already deploys independently. Moving one to a separate repository would be a straightforward migration, not an archaeological expedition.

## The Decision That Made Itself

We started with a practical problem: we couldn't segment translations cleanly. The solution we found addressed problems we hadn't even prioritised yet - bundle size, team scaling, deployment independence.

Sometimes architecture decisions aren't grand strategic choices. Sometimes you're just trying to solve a specific problem, and the solution happens to unlock a better structure entirely.

Five hubs, shared spokes, independent operations, common standards. It's more complex than a monolith. It's less complex than the monolith would have eventually become.

The planes land at whichever hub they need. The infrastructure just works.

---

## Technical Notes

**Zone Locations:** `apps/{main,auth,dashboard,admin,settings}/`

**Shared Packages:** `packages/{ui,services,tsconfig}/`

**Key Configuration:**
- `turbo.json` - Task orchestration and caching
- `pnpm-workspace.yaml` - Workspace and dependency catalog
- `frontend.conf` - Nginx routing

**Related Posts:**
- FR-0000: Why We're Writing This (And Why Now)
- FR-0011: The Shared Package Strategy (coming soon)

**Stack:** Next.js 16, Turborepo, pnpm workspaces, nginx

---

## A Note on How This Was Written

As with all posts in this series, this was written with AI assistance. The architectural decisions, the i18n problem that triggered the change, and the reasoning are mine. The clarity, hopefully, comes from the collaboration. Every technical claim has been verified against the actual codebase.
