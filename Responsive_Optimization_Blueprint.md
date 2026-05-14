# MISSION: WORLD-CLASS RESPONSIVE & PERFORMANCE TRANSFORMATION
# Target: Gohar Hany Portfolio — "Deep Space Neon" Theme

---

## 🎯 PRIMARY OBJECTIVES (Non-Negotiable)
1. **60FPS on mobile and tablet** — no jank, no dropped frames, ever.
2. **Pixel-perfect responsiveness** — iPhone SE → 4K desktop, all orientations.
3. **Zero content deletion** — every project, skill, image, and entry stays; only restructured.
4. **Sub-3s LCP on 4G** — perceived performance must feel instant.

---

## 📱 PHASE 1 — MOBILE-FIRST RESPONSIVE ARCHITECTURE

### Typography & Spacing System
- Replace ALL hardcoded `px` font sizes and spacing with fluid `clamp()`:
```css
  /* Example pattern to follow everywhere */
  font-size: clamp(1rem, 2.5vw + 0.5rem, 1.5rem);
  padding: clamp(1rem, 4vw, 3rem);
```
- Establish a global spacing scale in `index.css` using CSS custom properties:
```css
  --space-xs: clamp(0.5rem, 1vw, 0.75rem);
  --space-sm: clamp(0.75rem, 2vw, 1.25rem);
  --space-md: clamp(1rem, 4vw, 2rem);
  --space-lg: clamp(2rem, 6vw, 4rem);
  --space-xl: clamp(3rem, 10vw, 7rem);
```
- Use these variables in every component — no raw pixel spacing.

### Navigation (Mobile)
- Hamburger menu must open with a **smooth slide-in or scale-reveal** (CSS transition, no GSAP overhead).
- All nav links: minimum `48px` tap target height with `padding: 12px 24px`.
- Trap focus inside mobile menu when open (accessibility + UX).
- On scroll in mobile: nav must be `position: sticky` with `backdrop-filter: blur()` — NOT fixed overlay that covers content.
- Close menu automatically on route/section change.

### Bento Grid — `ProjectsSection`
- Mobile (`< 640px`): Single column, full-width cards with 16px gutters.
- Tablet (`640px–1024px`): 2-column adaptive grid.
- Desktop (`> 1024px`): Restore full bento layout.
- Use CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr))` as the base pattern.
- Cards must have a minimum height defined by content, not fixed pixel heights.

### Modals — `ProjectsSection` & `PhotoGallerySection`
- Mobile: Full-screen modal (`width: 100vw; height: 100dvh`) with `overflow-y: auto` scroll.
- The close `×` button: always `position: fixed; top: 16px; right: 16px; z-index: 9999` — never scrolls out of view.
- Use `overscroll-behavior: contain` on modal scroll container to prevent body scroll bleed.
- Desktop: Centered overlay with max-width `900px` and `max-height: 90vh`.
- Animate open/close with `transform: translateY()` or `scale()` — never `height` or `opacity` on large containers.

### Orientation & Viewport Handling
- Use `100dvh` instead of `100vh` everywhere to handle mobile browser chrome correctly.
- Test and fix landscape mobile: hero section must not be taller than viewport in landscape.
- Add `@media (orientation: landscape) and (max-height: 500px)` breakpoint for compact landscape layouts.

---

## ⚡ PHASE 2 — PERFORMANCE ENGINEERING

### DomeGallery — Critical 3D Optimization
This is the single biggest performance bottleneck. Apply ALL of the following:

**Segment Reduction by Device:**
```javascript
const getSegments = () => {
  if (window.innerWidth < 640) return 12;    // Mobile: minimal tiles
  if (window.innerWidth < 1024) return 20;   // Tablet: moderate
  return 35;                                  // Desktop: full quality
};
```

**Touch Device Optimizations:**
- Detect touch via `'ontouchstart' in window` or `navigator.maxTouchPoints > 0`.
- On touch: Reduce drag sensitivity by 50%, disable momentum scroll, increase snap threshold.
- Add `touch-action: pan-y` where vertical scrolling is expected.
- Wrap the 3D dome container with:
```css
  .dome-container {
    will-change: transform;
    transform: translateZ(0);  /* Force GPU layer */
    backface-visibility: hidden;
    perspective: 1000px;
  }
```

**"Lite Mode" Fallback:**
- If `navigator.hardwareConcurrency <= 4` OR `deviceMemory <= 4`, automatically activate Lite Mode.
- Lite Mode: Render a flat CSS grid of images instead of the 3D dome. Same images, same click behavior — just no 3D transforms.
- Show a subtle "Switch to 3D" toggle button in Lite Mode for users who want the full experience.

**Image Lazy Loading:**
```jsx
<img 
  src={tile.src} 
  loading="lazy" 
  decoding="async"
  fetchpriority={index < 4 ? "high" : "low"}
  alt={tile.alt}
/>
```

### GSAP — Animation Audit & Mobile Optimization

**Use `gsap.matchMedia()` for ALL animation declarations:**
```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  // Full desktop animations: parallax, complex stagger, 3D rotations
});

mm.add("(max-width: 1023px)", () => {
  // Simplified: fade-in only, shorter durations, no parallax
  gsap.set(".decorative-particle", { display: "none" }); // Kill decorative elements
});
```

**Animation Property Rules (enforce strictly):**
- ✅ Animate ONLY: `transform`, `opacity`, `filter`
- ❌ NEVER animate: `width`, `height`, `top`, `left`, `margin`, `padding`
- Add `will-change: transform, opacity` to all animated elements — but REMOVE it after animation completes via `onComplete` callback.

**Timeline Cleanup:**
- Store all GSAP timelines in refs: `const tl = useRef(gsap.timeline())`.
- In `useEffect` cleanup: `return () => tl.current.kill()`.
- This prevents memory leaks on route changes.

**Scroll Trigger Optimization:**
```javascript
ScrollTrigger.config({
  ignoreMobileResize: true,  // Prevents re-calc on mobile keyboard open
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});
```

### Preloader
- Preloader must complete in `max 2.5s` regardless of network speed (use a timeout fallback).
- Exit animation: `transform: scaleY(0)` wipe — GPU-accelerated, no layout reflow.
- After preloader exits: call `ScrollTrigger.refresh()` to recalculate all trigger positions.

---

## 🎨 PHASE 3 — VISUAL & CSS INTEGRITY

### CSS Variable Audit (`index.css`)
Add responsive overrides for all key variables:
```css
:root {
  --radius: 12px;
  --viewer-pad: 2rem;
  --card-gap: 1.5rem;
  --modal-pad: 2.5rem;
}

@media (max-width: 768px) {
  :root {
    --radius: 8px;
    --viewer-pad: 1rem;
    --card-gap: 0.75rem;
    --modal-pad: 1.25rem;
  }
}
```

### Z-Index Architecture (Fix all layer conflicts)
Establish a global z-index scale — never use arbitrary values:
```css
:root {
  --z-base: 1;
  --z-cards: 10;
  --z-sticky-nav: 100;
  --z-modal-backdrop: 200;
  --z-modal: 300;
  --z-cursor: 400;
  --z-preloader: 500;
  --z-toast: 600;
}
```
Apply these variables everywhere. `CustomCursor` must use `--z-cursor`. Modals use `--z-modal`. Navigation uses `--z-sticky-nav`.

### Touch Target Compliance
Every interactive element must meet:
```css
button, a, [role="button"] {
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### CustomCursor
- Hide on touch devices:
```css
  @media (hover: none) {
    .custom-cursor { display: none !important; }
  }
```
- On desktop: ensure cursor has `pointer-events: none` to avoid blocking clicks.

---

## 🔧 PHASE 4 — FUNCTIONAL ROBUSTNESS

### Scroll Lock Management
- When any modal opens: `document.body.style.overflow = 'hidden'` + save current `scrollY`.
- When modal closes: Restore `scrollY` via `window.scrollTo(0, savedY)` — prevents jump-to-top bug.
- Use a custom `useScrollLock` hook to manage this consistently across all modals.

### `HeroSection`
- Height: `min-height: 100dvh` — never fixed `height: 100vh`.
- CTA buttons: full-width on mobile (`width: 100%`), auto-width on desktop.
- Particle/star background: Reduce particle count by 60% on mobile using the same `matchMedia` pattern.

### `PhotoGallerySection`
- Grid: `grid-template-columns: repeat(2, 1fr)` on mobile, `repeat(3, 1fr)` on tablet, `repeat(4, 1fr)` on desktop.
- Lightbox: Full-screen on mobile with swipe-to-navigate support (use pointer events to detect swipe direction).
- Image aspect ratio: enforce `aspect-ratio: 4/3` on all grid thumbnails — no layout shift.

---

## ✅ DEFINITION OF DONE

The implementation is complete when:
- [ ] Lighthouse Mobile score ≥ 85 (Performance), ≥ 90 (Accessibility)
- [ ] No horizontal scroll on any screen width from 320px to 4K
- [ ] All modals fully functional and reachable on iPhone SE (375px)
- [ ] DomeGallery runs at stable 60FPS on a mid-range Android (test via Chrome DevTools CPU throttle 4x)
- [ ] Zero console errors or warnings in production build
- [ ] All animations respect `prefers-reduced-motion`:
```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
```
- [ ] Scroll position is preserved perfectly across modal open/close cycles
- [ ] Every project, skill, and gallery image is visible and accessible on 375px viewport

---

## 📦 DELIVERABLES
Refactor and return the following files (only what changed):
- `src/index.css` — updated CSS variables and global responsive rules
- `src/components/Navigation.jsx`
- `src/components/HeroSection.jsx`
- `src/components/ProjectsSection.jsx`
- `src/components/DomeGallery.jsx`
- `src/components/PhotoGallerySection.jsx`
- `src/hooks/useScrollLock.js` (new)
- Any additional utility files created

For each file, add a comment block at the top:
```js
// OPTIMIZED: [list of changes made]
// BREAKPOINTS: [breakpoints this component responds to]
// PERFORMANCE: [specific performance improvements applied]
```