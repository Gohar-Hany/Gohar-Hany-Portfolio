# Loading Screen Master Spec

This document is a complete, reusable package you can send to another coding project/agent.
It contains:

1. A strict copy/paste prompt.
2. A skill-style version.
3. Ready implementation code.
4. Stack-specific guidance.
5. Validation, QA, and troubleshooting.

Goal:
Build a first-open loading screen that is project-aware, accessible, visually aligned with the existing design system, and production-ready.

---

## Table of Contents

1. Quick Start
2. Master Prompt (Copy/Paste)
3. Skill Version
4. Exact Implementation Rules
5. React + Vite Full Reference Implementation
6. Next.js App Router Guidance
7. Vue/Nuxt Guidance
8. Validation Commands
9. Manual QA Checklist
10. Automated QA Snippet (Optional)
11. Troubleshooting Guide
12. Agent Output Template
13. Visual Direction Notes (Deep Space Neon Preset)

---

## 1) Quick Start

1. If you want one prompt to send immediately, use Section 2.
2. If your system supports skills, use Section 3.
3. If your target stack is React + Vite, apply Section 5 directly.
4. Use Sections 8-11 for quality control.

---

## 2) Master Prompt (Copy/Paste)

```text
You are a senior frontend engineer with strong motion and accessibility expertise.

Mission:
Analyze the target project first, then implement a first-open loading screen that appears immediately when the website starts.

Mandatory process:

PHASE 1 - Understand project context before coding
1) Detect stack/runtime:
- Framework (React, Next.js, Vue, Nuxt, etc.)
- Bundler/runtime (Vite, Webpack, Turbopack)
- Styling approach (Tailwind, CSS modules, global CSS, design system)

2) Read these files first:
- README
- package.json
- App/root layout/main entry
- Global CSS or Tailwind config
- Theme/token files
- Existing loader/preloader components

3) Summarize:
- Visual identity: typography, colors, spacing, radius, border, shadow, motion language
- Architecture conventions: folder pattern, naming style
- Whether a loader already exists and should be upgraded/refactored

PHASE 2 - Implement behavior exactly
- Loader appears on first app open before main content is interactive.
- Loader shows once per browser session using sessionStorage key: app_loader_seen.
- Minimum visible duration: 1200ms.
- Maximum visible duration: 3500ms.
- Dismiss only after app-ready signal and min duration elapsed.
- Force-dismiss at max duration as fallback.
- Lock body scroll while loader is active, restore original body overflow when done.
- No visual flicker, no white flash, no layout shift.

PHASE 3 - Accessibility requirements
- Loader root includes:
  - role="status"
  - aria-live="polite"
  - aria-busy="true" while loading
- Ensure readable contrast for text and progress indicator.
- Respect prefers-reduced-motion with low-motion fallback.

PHASE 4 - Motion and design quality
- Match target project visual identity exactly.
- Reuse existing design tokens/variables/components.
- Use meaningful motion only: entry, progress, exit.
- Prefer transform + opacity for performance.
- Avoid heavy dependencies unless already present in project.

PHASE 5 - Engineering quality
- Use deterministic state flow (loading -> closing -> done).
- Clean up all timers, RAF handlers, listeners.
- Guard browser APIs in SSR with typeof window !== "undefined".
- Keep code style and naming aligned with project.

PHASE 6 - Integration
- Integrate at root render path for first-paint visibility.
- Ensure behavior is correct on desktop and mobile.

PHASE 7 - Validation
- Run lint/typecheck/build if available.
- Confirm no new warnings/errors introduced.

Required final response format:
1) Project understanding summary
2) Files changed + why
3) Code changes (snippets/diff)
4) Why design matches project identity
5) QA checklist pass/fail:
   - first-open behavior
   - one-time per session
   - min/max timing
   - reduced-motion behavior
   - responsive behavior
   - no console errors
   - no flicker/CLS regression
```

---

## 3) Skill Version

```md
---
name: project-aware-first-open-loader
description: Analyze a frontend project and implement an accessible, deterministic, design-system-aligned first-open loading screen.
---

# Skill Behavior

## Phase A: Context Scan (required)
- Read: README, package.json, entry/root file, global styles, theme tokens, existing loader files.
- Detect: framework, styling strategy, motion style, architecture patterns.
- Provide short summary before editing.

## Phase B: Build Rules
- Show on first open only.
- Session key: app_loader_seen.
- Min 1200ms, max 3500ms.
- Close after app-ready + min elapsed.
- Hard-stop at max elapsed.
- Lock scroll while active and restore on close.
- No flicker and no layout shift.
- Add role=status, aria-live=polite, aria-busy=true while active.
- Respect prefers-reduced-motion.

## Phase C: Design Rules
- Match existing design system.
- Reuse existing tokens and component style language.
- Keep motion meaningful and performant.

## Phase D: Integration and Validation
- Integrate at root rendering path.
- Validate mobile and desktop behavior.
- Run lint/typecheck/build when available.
- Report any command not available.

## Output Contract
1. Understanding summary
2. Change list with rationale
3. File-level updates
4. Validation summary
5. Final QA checklist
```

---

## 4) Exact Implementation Rules

Use these rules in any stack:

1. Session key:
- app_loader_seen = "1" means loader already shown in current browser session.

2. Timing:
- Min visible: 1200ms.
- Max visible: 3500ms.
- Exit animation (recommended): 200-320ms.

3. State model:
- loading: visible and active.
- closing: exit animation in progress.
- done: unmounted/hidden.

4. Close conditions:
- Normal close: app-ready is true AND min time elapsed.
- Safety close: max time reached.

5. Scroll locking:
- Save existing document.body.style.overflow.
- Set overflow to hidden while loader active.
- Restore original value in cleanup and on unmount.

6. Accessibility:
- role=status.
- aria-live=polite.
- aria-busy=true while loading, false after closing/done.
- Keep readable text contrast.

7. Performance:
- Prefer opacity/transform transitions.
- Avoid excessive blur/filter animation.
- Avoid random values that can cause SSR hydration mismatches.

8. SSR safety:
- Guard all window/document/sessionStorage access.

---

## 5) React + Vite Full Reference Implementation

### 5.1 File Map

- src/hooks/useFirstOpenLoader.ts
- src/components/LoadingScreen.tsx
- src/components/LoadingScreen.css
- src/AppBootstrap.tsx
- src/main.tsx

### 5.2 Hook: src/hooks/useFirstOpenLoader.ts

```ts
import { useEffect, useMemo, useRef, useState } from "react";

type LoaderPhase = "loading" | "closing" | "done";

type LoaderOptions = {
  sessionKey?: string;
  minVisibleMs?: number;
  maxVisibleMs?: number;
  exitDurationMs?: number;
};

const DEFAULTS: Required<LoaderOptions> = {
  sessionKey: "app_loader_seen",
  minVisibleMs: 1200,
  maxVisibleMs: 3500,
  exitDurationMs: 260,
};

export function useFirstOpenLoader(
  isAppReady: boolean,
  options: LoaderOptions = {}
): { phase: LoaderPhase; isVisible: boolean } {
  const cfg = useMemo(
    () => ({ ...DEFAULTS, ...options }),
    [
      options.sessionKey,
      options.minVisibleMs,
      options.maxVisibleMs,
      options.exitDurationMs,
    ]
  );

  const isBrowser = typeof window !== "undefined";

  const showOnFirstLoad =
    isBrowser && window.sessionStorage.getItem(cfg.sessionKey) !== "1";

  const [phase, setPhase] = useState<LoaderPhase>(
    showOnFirstLoad ? "loading" : "done"
  );

  const [minElapsed, setMinElapsed] = useState<boolean>(!showOnFirstLoad);
  const closedRef = useRef(false);

  const requestClose = () => {
    if (closedRef.current) return;
    closedRef.current = true;

    if (!isBrowser) {
      setPhase("done");
      return;
    }

    window.sessionStorage.setItem(cfg.sessionKey, "1");
    setPhase("closing");

    window.setTimeout(() => {
      setPhase("done");
    }, cfg.exitDurationMs);
  };

  useEffect(() => {
    if (!isBrowser) return undefined;
    if (phase !== "loading") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const minTimer = window.setTimeout(() => {
      setMinElapsed(true);
    }, cfg.minVisibleMs);

    const maxTimer = window.setTimeout(() => {
      requestClose();
    }, cfg.maxVisibleMs);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [cfg.maxVisibleMs, cfg.minVisibleMs, isBrowser, phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    if (!isAppReady) return;
    if (!minElapsed) return;
    requestClose();
  }, [isAppReady, minElapsed, phase]);

  return {
    phase,
    isVisible: phase !== "done",
  };
}
```

### 5.3 Component: src/components/LoadingScreen.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import "./LoadingScreen.css";

type LoadingScreenProps = {
  phase: "loading" | "closing" | "done";
  title?: string;
};

export function LoadingScreen({
  phase,
  title = "Preparing your experience...",
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase !== "loading") {
      setProgress(100);
      return;
    }

    let raf = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const next = Math.min(96, Math.floor((elapsed / 1400) * 100));
      setProgress(next);
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [phase]);

  const rootClass = useMemo(() => {
    return phase === "closing" ? "loader-overlay is-closing" : "loader-overlay";
  }, [phase]);

  return (
    <div
      className={rootClass}
      role="status"
      aria-live="polite"
      aria-busy={phase === "loading" ? "true" : "false"}
      aria-label={title}
    >
      <div className="loader-card">
        <p className="loader-title">{title}</p>

        <div className="loader-track" aria-hidden="true">
          <div className="loader-fill" style={{ width: `${progress}%` }} />
        </div>

        <p className="loader-percent">{progress}%</p>
      </div>
    </div>
  );
}
```

### 5.4 Styles: src/components/LoadingScreen.css

```css
.loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background:
    radial-gradient(
      circle at 20% 20%,
      color-mix(in oklab, var(--primary, #00d4ff) 16%, transparent),
      transparent 45%
    ),
    radial-gradient(
      circle at 80% 80%,
      color-mix(in oklab, var(--accent, #00ff88) 12%, transparent),
      transparent 45%
    ),
    var(--background, #090d11);
  opacity: 1;
  transform: scale(1);
  transition: opacity 260ms ease, transform 260ms ease;
}

.loader-overlay.is-closing {
  opacity: 0;
  transform: scale(0.985);
}

.loader-card {
  width: min(520px, 92vw);
  border-radius: 18px;
  padding: 24px;
  border: 1px solid color-mix(in oklab, var(--primary, #00d4ff) 28%, transparent);
  background: color-mix(in oklab, var(--background, #090d11) 86%, black);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);
}

.loader-title {
  margin: 0 0 12px;
  color: var(--foreground, #fafafa);
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: 600;
}

.loader-track {
  width: 100%;
  height: 9px;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in oklab, var(--foreground, #fafafa) 12%, transparent);
}

.loader-fill {
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--primary, #00d4ff), var(--accent, #00ff88));
  box-shadow: 0 0 18px color-mix(in oklab, var(--primary, #00d4ff) 50%, transparent);
  transition: width 120ms linear;
}

.loader-percent {
  margin: 10px 0 0;
  color: var(--muted-foreground, #999999);
  font-size: 13px;
}

@media (prefers-reduced-motion: reduce) {
  .loader-overlay,
  .loader-fill {
    transition: none;
    animation: none;
  }
}
```

### 5.5 Root bootstrap: src/AppBootstrap.tsx

```tsx
import { useEffect, useState } from "react";
import App from "./App";
import { LoadingScreen } from "./components/LoadingScreen";
import { useFirstOpenLoader } from "./hooks/useFirstOpenLoader";

export function AppBootstrap() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setAppReady(true);
    });

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, []);

  const { phase, isVisible } = useFirstOpenLoader(appReady, {
    sessionKey: "app_loader_seen",
    minVisibleMs: 1200,
    maxVisibleMs: 3500,
    exitDurationMs: 260,
  });

  return (
    <>
      {isVisible ? <LoadingScreen phase={phase} /> : null}
      <div style={{ visibility: isVisible ? "hidden" : "visible" }}>
        <App />
      </div>
    </>
  );
}
```

### 5.6 Entry update: src/main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AppBootstrap } from "./AppBootstrap";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppBootstrap />
  </React.StrictMode>
);
```

### 5.7 Optional real app-ready signal

If the app depends on real initialization, replace the one-frame ready signal with:

- font loading complete
- critical API/config complete
- essential image preload complete

Still keep max timer as fallback.

---

## 6) Next.js App Router Guidance

Important:
Route-level loading.tsx by itself does not guarantee one-time global loader behavior per session.

Recommended:

1. Use a client provider wrapper in app/providers.
2. Put session key logic there.
3. Wrap children inside app/layout.tsx.
4. Keep browser APIs inside useEffect only.

Minimal provider sample:

```tsx
"use client";

import { useEffect, useState } from "react";

export function FirstOpenLoaderProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem("app_loader_seen") === "1";
    if (seen) return;

    setShow(true);

    const minTimer = window.setTimeout(() => {
      window.sessionStorage.setItem("app_loader_seen", "1");
      setShow(false);
    }, 1200);

    const maxTimer = window.setTimeout(() => {
      window.sessionStorage.setItem("app_loader_seen", "1");
      setShow(false);
    }, 3500);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
    };
  }, []);

  return (
    <>
      {show ? (
        <div role="status" aria-live="polite" aria-busy="true">
          Loading...
        </div>
      ) : null}
      <div style={{ visibility: show ? "hidden" : "visible" }}>{children}</div>
    </>
  );
}
```

---

## 7) Vue/Nuxt Guidance

Use the same behavior rules with:

1. A composable for timing and session logic.
2. A global LoadingScreen component.
3. Root app/layout wrapper to gate children.

Core rule remains identical:

- first open only
- min/max timing
- app-ready + min elapsed close
- hard-stop at max
- scroll lock and cleanup

---

## 8) Validation Commands

Run only commands that exist in target project.

### npm

```bash
npm run lint
npm run typecheck
npm run build
```

### pnpm

```bash
pnpm lint
pnpm typecheck
pnpm build
```

### bun

```bash
bun run lint
bun run typecheck
bun run build
```

If script is missing, state that clearly and continue with available checks.

---

## 9) Manual QA Checklist

1. Open app in a fresh browser session.
2. Loader appears before content interaction.
3. Loader stays at least 1200ms.
4. Loader disappears by 3500ms maximum.
5. Refresh same tab/session: loader does not reappear.
6. New session: loader appears once again.
7. Reduced-motion enabled: low-motion behavior verified.
8. Mobile and desktop both pass.
9. No console errors.
10. No flicker or visible layout shift.

---

## 10) Automated QA Snippet (Optional, Playwright)

```ts
import { test, expect } from "@playwright/test";

test("first-open loader behavior", async ({ page, context }) => {
  await page.goto("/");

  const loader = page.getByRole("status");
  await expect(loader).toBeVisible();

  await page.waitForTimeout(1400);
  await expect(loader).not.toBeVisible({ timeout: 3000 });

  await page.reload();
  await expect(loader).toHaveCount(0);

  await context.clearCookies();
});
```

---

## 11) Troubleshooting Guide

### Issue: Loader shows every refresh

Cause:
Session key not being written.

Fix:
Set app_loader_seen to "1" when closing starts or ends.

### Issue: Loader never closes

Cause:
Only waiting for app-ready event.

Fix:
Keep max timeout force-close path.

### Issue: White flash before loader

Cause:
Global background is undefined early.

Fix:
Set body/root background token in global CSS before app render.

### Issue: Scroll remains locked

Cause:
No overflow cleanup.

Fix:
Store and restore original body overflow in cleanup.

### Issue: Jank on low-end devices

Cause:
Expensive animated effects.

Fix:
Reduce blur/filter usage and keep animation to transform/opacity.

---

## 12) Agent Output Template

Require the implementation agent to return:

1. Understanding summary.
2. What changed and why.
3. Files touched and code highlights.
4. Validation command summary.
5. QA checklist pass/fail.
6. Known limitations (if any).

---

## 13) Visual Direction Notes (Deep Space Neon Preset)

Use this preset when target project style is similar to AI/futuristic dark themes:

- Background: deep near-black blue
- Primary accent: neon cyan/blue
- Secondary accent: neon green
- Surfaces: glass-like dark cards with subtle borders
- Motion: smooth and intentional, not noisy
- Typography: strong display heading + clean body text

Do not switch to generic styles that conflict with existing brand identity.
