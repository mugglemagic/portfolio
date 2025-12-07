---
ref: FR-0000
title: "Why We're Writing This (And Why Now)"
description: "Why we decided to rebuild our recruitment platform from scratch - and document every decision along the way."
author: "Mark Basford"
date: 2025-01-15
tags: [architecture, accessibility, enterprise, ai-assisted-development]
series: "Architecting for Everything"
part: 1
word_count: 1487
estimated_reading_time: "10 min"
published: true
---

In 2017, Scotland opened the Queensferry Crossing. Not because the Forth Road Bridge had failed - it hadn't. The old bridge still stands, still carries traffic, still does the job it was designed for decades ago. But the demands had changed. The volume of traffic, the weight of modern vehicles, the expectations of what a crossing should handle - the original bridge couldn't grow into that future. So they built a new one alongside it.

We found ourselves thinking about that bridge quite a lot last year.

## The System That Works

At Tribepad, we have a product that works. Customers use it daily. It's reliable, it's popular, and it does what recruitment software needs to do. We're not writing this because we escaped from something broken.

But if you've ever maintained software that evolved over a decade, you'll recognise the pattern. Procedural PHP that grew into Laravel. Twig templates sitting next to Smarty, sitting next to React components, sitting next to Vue. Each layer made sense at the time. Each decision was reasonable given what we knew then.

The system isn't bad. It's just... full. Every feature touches three different paradigms. Every change requires archaeology. Bespoke permissions and customer-specific branches that seemed manageable at ten clients become labyrinthine at a hundred. The velocity slows not because anyone made mistakes, but because the structure wasn't built for this scale.

And then there's the thing nobody planned for: we weren't building for a world where AI could help us write, review, and maintain code.

## The Moment Everything Shifted

We'd been watching AI tooling evolve for years. Copilot suggesting autocomplete. ChatGPT explaining stack traces. Interesting, occasionally useful, not transformative.

Then something changed. The suggestions got better. The context windows got larger. The tools started understanding not just syntax but intent. And we noticed a pattern during experiments: AI assistance was dramatically more effective on well-structured code.

Not clever code. Not complex abstractions. Just code with clear boundaries. Consistent patterns. Explicit types. Separation of concerns that meant context could be gathered without reading everything.

The messy corners of our legacy codebase? AI struggled. The cleaner modules? AI accelerated us noticeably.

This wasn't about "vibe coding" - letting AI generate features while developers nod along. That path leads somewhere unpleasant, probably a production incident at 3am with nobody understanding what the code actually does. This was about AI as a genuine tool for skilled developers. The kind of tool that multiplies velocity when you know exactly what you're building.

The realisation came gradually, over dog walks and too many coffees: if we structured things deliberately, AI could help us move faster. And if we were going to restructure anyway, why patch the old bridge? Why not build the crossing we actually needed?

## Writing for Two Audiences

We made a decision early: this new architecture would be written for two audiences.

The first audience is obvious - developers. Us, today. Future team members who'll inherit this codebase. The patterns need to be learnable, the conventions consistent, the reasoning documented.

The second audience is less obvious but equally important: AI assistants.

Not because we think AI replaces developers. It doesn't. But because AI that understands your codebase is dramatically more useful than AI that's guessing. So we write detailed CLAUDE.md files. We enforce strict typing. We maintain clear module boundaries. We document not just what the code does, but why we chose this approach over alternatives.

It sounds like overhead. In practice, it's an investment that pays back constantly. The AI makes better suggestions. New developers onboard faster. The documentation that helps AI also helps humans. Turns out writing clearly for machines forces you to write clearly, full stop.

## The Four Pillars

We kept encountering false trade-offs. Enterprise software that was accessible or fast. Maintainable or feature-rich. Scalable or developer-friendly. As if quality was a zero-sum game where you had to sacrifice something.

We decided to reject the premise.

**Performance** - Not as an afterthought or an optimisation pass before release. Baked into the architecture. Lazy loading by default. Bundle splitting that happens automatically. The kind of speed that doesn't require heroics because the structure makes slowness difficult.

**Scalability** - Not "we'll cross that bridge when we come to it." Built for multi-tenant enterprise from day one. Microservice-separable architecture even if we're not splitting services yet. The ability to grow without rewriting, because we've done enough rewrites.

**Accessibility** - This one's personal. I've spent time with people who rely on screen readers, who navigate with keyboards alone, who need high contrast or different colour palettes to use software at all. I've watched them struggle with websites that technically passed audits but were practically unusable.

We build recruitment software. The point is helping people find jobs. If someone can't complete an application because we couldn't be bothered with proper focus management, that's on us. That's a person who didn't get a fair shot because we were lazy. "Fairer, faster, better hiring" isn't just the company tagline - it's a constraint that shapes every component we build.

**Maintainability** - Code that teaches itself. Patterns so consistent that understanding one module means understanding them all. Tests that catch regressions before they ship. Documentation that stays current because it's part of the development process, not an afterthought someone writes reluctantly before a release.

Four pillars. Not four options where you pick two.

## Why Document This Publicly

The architecture we're building isn't specific to recruitment software. The patterns - multizone micro-frontends, accessible component libraries, event-driven systems, multi-tenant theming - they're applicable anywhere you're building enterprise software that needs to scale.

We learned from others who documented their decisions. Now it's our turn.

This blog series is partly for the developer community. Here's what we tried, here's what worked, here's what we'd do differently. Take what's useful, ignore what isn't, improve on our approaches.

It's partly for our team. When someone joins six months from now and wonders why we structured authentication this way, the reasoning is documented. Not just what we built, but the trade-offs we considered and rejected.

And it's partly for anyone who cares how their software is built. Not every customer reads technical blogs. But for those who do, for those who want to know that the platform they're trusting with their hiring actually considered accessibility and security and maintainability - here's the evidence.

## What's Coming

This is the first post in an ongoing series. We'll cover architecture decisions like why we split one application into five independent zones. Component library philosophy - building accessible primitives that don't make you choose between delight and inclusion. The event system that decouples everything. How we structured code so AI assistants can genuinely help.

Each post follows a simple pattern: here's the problem, here's what we considered, here's what we built, here's what we learned. No fluff, no self-congratulation, just reasoning you can evaluate and adapt.

Some of it will be wrong. We'll find better approaches. When we do, we'll document those too. This isn't a monument to our brilliance - it's a journal of decisions made with the best information we had at the time.

## The Bridge We're Building

The Forth Road Bridge still works. It still carries traffic. Nobody demolished it when the Queensferry Crossing opened - they just redirected the demands it couldn't handle.

That's roughly our situation. The legacy system continues. Customers depend on it. But alongside it, we're building something that can handle what's coming. Enterprise scale. AI-assisted development. Accessibility that isn't an afterthought. The kind of architecture you'd design if you knew then what we know now.

We're writing this because we hope it helps someone. Maybe you're facing the same decision - patch forever or build fresh. Maybe you're wrestling with accessibility in a codebase that wasn't designed for it. Maybe you're wondering how to structure code so AI tooling actually helps rather than hallucinates.

We don't have all the answers. But we've got some decisions we're confident about, some experiments that worked, and some failures that taught us things. Seems worth sharing.

The dogs heard a lot about software architecture on our walks this year. Now it's your turn.

---

## Technical Notes

This post is part of the "Architecting for Everything" series, documenting the frontend architecture decisions for a modern enterprise application.

**Coming up:**
- Multizone architecture and why we split into independent deployable zones
- Component library philosophy with React Aria primitives
- Accessibility patterns that don't compromise on design
- Event-driven systems for decoupled, testable code
- AI-assisted development practices that actually work

All code and patterns discussed in this series are production implementations, not theoretical exercises.

---

## A Note on How This Was Written

In the spirit of transparency - and because it rather proves the point - this blog series was written with AI assistance. The ideas, experiences, and architectural decisions are mine. The writing style was sculpted through detailed guidelines to match how I'd explain things if I were better at putting words together. I'm an architect, not a writer, and keeping with the bridge analogy, AI helps bridge that gap.

Every post has been checked for accuracy against the actual codebase and reviewed by a colleague before publishing. Nothing here is AI hallucination dressed up as expertise. But the fluency? The structure? That's AI doing what we've been talking about: multiplying the output of someone who knows what they want to say but struggles with saying it.
