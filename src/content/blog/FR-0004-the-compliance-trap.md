---
ref: FR-0004
title: "The Compliance Trap"
description: "Why passing automated accessibility tests doesn't mean your app is accessible, and what real accessibility testing looks like."
author: "Mark Basford"
date: 2025-01-19
tags: [accessibility, testing, wcag, screen-readers, automation]
series: "Architecting for Everything"
part: 5
word_count: 1498
estimated_reading_time: "10 min"
published: true
research_sources:
  - 0003-component-library-hybrid-approach.md
  - Button.test.tsx
  - OTPInput.accessibility.test.tsx
  - eslint.config.js (jsx-a11y rules)
  - frontend-ci.yml
---

In 1824, a fifteen-year-old French student named Louis Braille invented a reading system for blind people. It was elegant, efficient, and - most importantly - it worked. Blind students at the Royal Institute for Blind Youth in Paris could finally read and write independently. The system spread. Other blind people learned it, taught it to each other, and for the first time had genuine literacy within reach.

The sighted administrators hated it.

Director Pierre-Armand Dufau banned the system, burned Braille books, and punished students caught using it. The official objection was that Braille didn't resemble printed letters - sighted teachers couldn't read it, which meant they couldn't control it. A writing system designed specifically for blind people was rejected because it didn't work for sighted people.

Louis Braille died in 1852. France officially adopted his system two years later. The UK followed in 1870. The United States, after decades of infighting between competing tactile systems in what became known as the "War of the Dots," didn't adopt Braille until 1932 - eighty years after his death.

We found ourselves thinking about Braille when reviewing our accessibility testing strategy. Not because anyone was burning books, but because we kept encountering the same underlying problem: systems designed to help disabled users, evaluated by people who don't use assistive technology.

## The Audit That Changed Everything

A few years ago, on a different product, we commissioned an accessibility review from the BBC. We'd done the work - or thought we had. Alt attributes on images. Labels on form inputs. ARIA labels where they seemed appropriate. The automated tools reported no critical violations. We were compliant.

Then we watched actual users navigate the interface.

One of the testers opened a feature I hadn't known existed: the screen reader's heading navigation menu. Most screen reader users don't laboriously tab through every element on a page. They pull up a list of headings and jump directly to the section they need. It's the equivalent of scanning a document visually - except it only works if the heading structure makes sense.

Ours didn't.

We had `<h1>` tags, `<h2>` tags, even some `<h3>` tags. Each one had proper text content. An automated tool would check each heading in isolation and find nothing wrong. But the hierarchy was jumbled - an `<h3>` appearing before its parent `<h2>`, headings used for visual styling rather than document structure, landmarks missing entirely. The shortcut menu that should have provided quick navigation instead led users to the wrong places or missed sections altogether.

Every individual element was compliant. The structure that made it usable was broken.

As someone without disabilities, it's hard to understand these problems unless you witness them firsthand. We'd tested with automated tools. We'd checked our ARIA attributes. We'd followed the guidelines. But we'd never actually watched someone who depends on assistive technology try to use what we'd built.

## The Compliance Trap

A year or so later, I attended a presentation by Craig Abbott at Frontend North that put language to what we'd experienced. His core argument was simple and uncomfortable: WCAG compliance isn't the same as accessibility.

Automated tools check the specification. They verify that your button has an accessible name, that your images have alt text, that your form inputs have labels. These checks are valuable - they catch the obvious failures, the things you'd be embarrassed to ship. But they test attributes in isolation. They don't navigate your page like a user would.

axe-core can tell you that a button exists and has proper ARIA attributes. It cannot tell you that the button is visually obscured by a modal overlay that appeared after the audit ran. It cannot tell you that the heading structure makes navigation impossible. It cannot tell you that your focus management traps keyboard users in an inescapable loop.

The trap is treating compliance as the destination rather than the starting point. Passing an automated audit feels like success. You get a green checkmark, maybe a badge for your footer. But the checkmark measures conformance to a specification, not usability for actual humans.

## What Automated Testing Misses

After the BBC review, we started cataloguing the gaps:

**Structural navigation.** Screen readers provide shortcut menus for headings, landmarks, and form controls. If your heading hierarchy is illogical or landmarks are missing, these menus become useless. No automated tool checks whether your structure makes navigational sense.

**Focus flow.** Automated tests verify that an element is focusable. They cannot verify that focus moves logically, isn't trapped in an invisible container, or returns sensibly after a modal closes.

**Dynamic content.** Most audits run against a static snapshot. They miss content that appears after interaction - dropdowns that announce incorrectly, error messages that appear visually but aren't announced.

**Obscured elements.** A 44x44 pixel button is compliant. A 44x44 pixel button with 43 pixels hidden behind an overlay is technically compliant but practically unusable. Automated tools check properties, not reachability.

## The Five Layers

We designed our testing strategy around a simple principle: different methods catch different problems. No single approach is sufficient.

**Layer 1: Automated checks.** axe-core in unit tests, jsx-a11y in ESLint, Lighthouse in CI. These catch baseline failures - missing alt text, invalid ARIA, contrast violations. Fast, consistent, and they catch the embarrassing mistakes. But they're the floor, not the ceiling.

**Layer 2: Interaction testing.** We don't just check that a button exists; we check that clicking it does something. If a button can't receive a click event, the test fails regardless of what the DOM attributes say.

```typescript
it('button receives click events', async () => {
  const onPress = vi.fn();
  render(<Button onPress={onPress}>Submit</Button>);
  await userEvent.click(screen.getByRole('button'));
  expect(onPress).toHaveBeenCalled();
});
```

**Layer 3: Visual regression and element reachability.** Screenshots capture what users actually see. But we go further with a technique that doesn't get talked about enough: `elementFromPoint` testing.

```typescript
it('button is not obscured by other elements', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Submit' });
  const box = await button.boundingBox();

  // Check that the element at the button's center is the button itself
  const elementAtCenter = await page.evaluateHandle(
    ({ x, y }) => document.elementFromPoint(x, y),
    { x: box.x + box.width / 2, y: box.y + box.height / 2 }
  );

  await expect(elementAtCenter).toEqual(await button.elementHandle());
});
```

This verifies that clicking the centre of a button actually hits the button - not a transparent overlay, not a modal backdrop that appeared after render. The DOM says the button exists. `elementFromPoint` tells you whether a user can reach it.

**Layer 4: Real device testing.** Before release, we test with actual screen readers - VoiceOver, NVDA, JAWS. Keyboard-only navigation. Zoom to 200% and 400%. Mobile touch and gestures. Automated tools can't replicate hearing your interface announced aloud.

**Layer 5: User testing.** Nothing replaces actual users with disabilities. This isn't a nice-to-have - it's a gate before we ship. We're building recruitment software. If someone can't complete a job application because we optimised for audit scores instead of usability, we've failed at the fundamental purpose of what we're building.

We've implemented layers one through three in our codebase. Layers four and five are committed to before any public release, and we intend to share the results.

## The Braille Lesson

Louis Braille's system was rejected for decades because the people evaluating it weren't the people who needed it. Sighted administrators judged a blind reading system by whether sighted people could read it. The evaluation criteria missed the point entirely.

We do something similar when we judge accessibility by automated audit scores. The tools are built by sighted developers, run by sighted developers, and produce reports that sighted developers can understand. They measure what's easy to measure, not necessarily what matters.

The BBC review taught us that compliance is necessary but not sufficient. Craig Abbott's presentation gave us the framework to articulate why. The gap between "passes automated testing" and "actually usable" is where real accessibility work happens.

Braille was always the right system. It just needed to be evaluated by the people it was designed for.

---

## Technical Notes

**Testing Infrastructure:**
- axe-core via `jest-axe`, ESLint jsx-a11y, Playwright visual regression
- Interaction testing via `@testing-library/user-event`
- `elementFromPoint` reachability tests (coming to Playwright suite)

**Related Posts:**
- FR-0003: The 44px Illusion
- FR-0021: Testing in Three Dimensions (coming soon)

**References:**
- [Craig Abbott](https://www.craigabbott.co.uk/) - Accessibility specialist whose work influenced our testing philosophy
- [WCAG 2.2 Understanding Documents](https://www.w3.org/WAI/WCAG22/Understanding/)

---

## A Note on How This Was Written

As with all posts in this series, this was written with AI assistance. The BBC review experience, the lessons from Craig Abbott's presentation, and the testing philosophy are mine. The words came together faster with help. Every technical claim has been verified against our actual implementation.
