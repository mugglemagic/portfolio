---
ref: FR-0006
title: "The Observability Iceberg"
description: "Building full-stack observability with OpenTelemetry - from browser spans to backend traces, and everything in between."
author: "Mark Basford"
date: 2025-01-21
tags: [observability, telemetry, opentelemetry, tracing, performance, debugging]
series: "Architecting for Everything"
part: 7
word_count: 1467
estimated_reading_time: "10 min"
published: true
research_sources:
  - TELEMETRY_GUIDE.md
  - BROWSER_TELEMETRY_GUIDE.md
  - packages/ui/providers/TelemetryProvider/
  - services/modules/telemetry/
---

On August 1st, 2012, Knight Capital deployed new trading software to their production servers. Within forty-five minutes, they'd lost $440 million. The company was effectively bankrupt by lunchtime.

The cause was almost mundane: old code accidentally reactivated during deployment. A function that hadn't run in years suddenly started executing, making bizarre trades at machine speed. Knight Capital had monitoring. They had alerts. What they didn't have was any way to correlate the behaviour - to see the flow of orders through their system and understand *why* the numbers were going wrong.

By the time humans pieced together what was happening, it was over. Distributed tracing showing the journey of each order would have made the anomaly obvious within minutes. Instead, engineers were staring at dashboards full of red indicators, trying to manually reconstruct a story the system should have been telling them.

We think about Knight Capital more than we probably should.

## The 10% Problem

Here's the uncomfortable truth about traditional logging: you're seeing maybe 10% of what you need to understand a problem. An error message tells you something broke. It doesn't tell you why, or what happened in the fifteen steps before the break, or whether those steps took milliseconds or minutes, or which user action triggered the whole chain.

Logs are snapshots. Production issues are movies.

We've lived this in legacy systems. An error appears in the logs. We know it happened. We know roughly when. But replicating it? Understanding the state that led to it? That's where hours disappear. Someone starts adding temporary logging statements. Someone else tries to reproduce the issue locally. A third person is cross-referencing timestamps across different log files, building a mental model of what *might* have occurred.

Meanwhile, users are still hitting the problem. And we're still guessing.

The development team loses half a day on something that proper tracing would have revealed in five minutes. Multiply that across a year, across every hard-to-reproduce bug, every "works on my machine" investigation, every cross-team finger-pointing session about whether the frontend or backend caused the issue. The cost isn't dramatic like Knight Capital. It's the slow erosion of velocity, the accumulated friction of debugging blind.

## Tracing the Journey

The principle that changed our approach: the journey matters, not just the destination.

When a user clicks "Sign Up" and something fails, the error message is the destination. But the journey - form submission, validation, API call, database write, response handling - that's where the actual problem lives. Tracing captures the journey.

```
Trace ID: abc123 (Duration: 850ms)
│
├─ eventbus.publish [auth.signup.submit] (50ms)
│  └─ eventbus.handler_execution (35ms)
│     └─ auth.signup (600ms)
│        ├─ HTTP POST /api/auth/user-check (400ms)
│        │  └─ [Backend] Database query (50ms)
│        └─ eventbus.publish [auth.user-check.received] (50ms)
└─ navigation.redirect (5ms)
```

One trace ID. The complete story. Every step timed, every handoff recorded, every service connected. When that signup fails, we don't ask "what happened?" We look at trace `abc123` and *see* what happened.

The backend team doesn't need to defend themselves. The frontend team doesn't need to prove they sent the right data. Everyone looks at the same trace and the bottleneck - or the failure point - is simply visible.

## The Dual-Layer Architecture

Problems happen in two places: the server and the browser. Traditional observability often ignores the browser entirely. But the user's experience happens in the browser. Network issues, slow renders, client-side errors - these are invisible if you're only watching the server.

We instrument both.

**Server-side**: Next.js provides automatic instrumentation for server actions, API routes, and middleware. Every request that hits our server generates spans without us writing instrumentation code.

**Browser-side**: A custom OpenTelemetry implementation that captures what happens in the user's actual environment. Page loads, component renders, API calls from the client, user interactions that trigger chains of events.

The magic is in the correlation. When the browser makes an HTTP request, it includes a `traceparent` header:

```
traceparent: 00-{trace-id}-{span-id}-01
```

That header tells the backend: "I'm part of trace `abc123`." The backend extracts the ID, creates its own spans as children, and suddenly you have one trace spanning browser, API, and database. The user's click, the server's processing, the database's query - all connected, all visible, all timed.

When the frontend team says "we sent the request" and the backend team says "we never received it," the trace settles it instantly. Either the browser span shows the request was sent, or it doesn't. Either the server span shows it arrived, or it doesn't. No more archaeology through timestamp correlations across separate log files.

## The Sampling Reality

Here's where theory meets economics.

Tracing everything in production would generate terabytes of data. The bandwidth costs alone would be significant. The storage costs would be worse. And most of that data would be perfectly normal requests that nobody ever looks at.

So we sample. But sampling naively creates its own problems. If you randomly sample 5% of spans, you get fragments - the beginning of a trace without the end, a database query without the API call that triggered it. Useless for debugging.

Our approach: session-based sampling with error overrides.

**In development**: 100% sampling. Every trace, every span. You're debugging, you need to see everything.

**In production**: 5% of sessions are sampled. The key word is *sessions*. We hash the session ID deterministically, and if that session falls in the sampled 5%, every span in that session is kept. You get complete traces, not random fragments. A coherent 5% sample tells you more than an incoherent 100%.

**Errors**: 100% sampling, always. When something fails, we keep the trace regardless of the session sampling decision. You never lose visibility into problems because of sampling.

**Slow requests**: If a request takes more than a second, it's sampled. Performance problems are problems too.

```typescript
// Configuration
NEXT_PUBLIC_OTEL_TRACE_SAMPLE_RATE=0.05    // 5% in production
NEXT_PUBLIC_OTEL_ERROR_SAMPLE_RATE=1.0     // 100% of errors
```

The result: sustainable costs, coherent data, and guaranteed visibility into the things that matter.

## Performance Without Sacrifice

Observability that slows down the application is self-defeating. You can't measure performance while degrading it.

The browser telemetry is lazy-loaded. It doesn't block the initial page render. The user sees the application while the instrumentation initialises in the background. Bundle impact is under 150KB gzipped - substantial enough to take seriously, but not enough to noticeably affect load times.

Traces are batched and exported asynchronously. The act of recording a span doesn't block the operation being recorded. If the observability backend is unreachable, data is dropped silently rather than queued indefinitely or retried aggressively.

Graceful degradation throughout. If telemetry initialisation fails, the application continues normally. Components check whether telemetry is available before attempting to use it. No user ever sees an error because observability broke.

The overhead in production: under 2% with 5% sampling. Measurable if you're looking for it, invisible to users.

## What We Actually See Now

The dashboard shows services: `eos-frontend-browser`, `eos-frontend-main`, and downstream. You can search by trace ID, operation name, time range. Filter to errors only. Look at the waterfall view of a request's complete lifecycle.

When something breaks, we don't start the archaeology. We find the trace. Often the user's error report includes enough information to locate it - the time, the page, the action they were taking. Sometimes we search for error spans in the relevant time window.

Either way, the debugging starts from understanding rather than guessing.

The cross-team conversations changed too. "Check trace ID `abc123`" is a complete handoff. Frontend, backend, database - everyone sees the same story. The trace is the single source of truth about what happened.

## Knight Capital's Ghost

We're not trading millions of dollars per second. An observability gap won't bankrupt us in forty-five minutes. But the principle holds at any scale: when systems behave unexpectedly, the speed of understanding determines the cost of the problem.

Knight Capital had alerts. They had monitoring. What they lacked was the ability to see the journey - to correlate individual actions into a coherent story fast enough to act on it.

We can't guarantee we'll never have a production incident. But we can guarantee that when something goes wrong, we'll be looking at the trace, not staring at dashboard alerts trying to manually reconstruct what the system should have been telling us all along.

The error message is the tip of the iceberg. The trace shows you what's underneath.

---

## Technical Notes

**Architecture:**
- Server-side: Vercel OTEL integration for Next.js
- Browser-side: Custom OpenTelemetry with TelemetryProvider
- Trace correlation via `traceparent` header propagation
- Session-based sampling with error/slow-request overrides

**Key Files:**
- `packages/ui/providers/TelemetryProvider/` - React context and hooks
- `services/modules/telemetry/` - Browser instrumentation services
- `apps/*/instrumentation.ts` - Server-side OTEL registration

**Related Posts:**
- FR-0005: The Server-Side Shield (security events need observability)
- FR-0001: The Multizone Gambit (tracing across zones)

**References:**
- [Knight Capital Group Trading Loss](https://en.wikipedia.org/wiki/Knight_Capital_Group#2012_stock_trading_disruption)
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [W3C Trace Context Specification](https://www.w3.org/TR/trace-context/)

---

## A Note on How This Was Written

As with all posts in this series, this was written with AI assistance. The architectural decisions and the legacy debugging frustrations are real. Knight Capital's story informed our thinking about what observability actually means - not just having data, but being able to understand it fast enough to matter.
