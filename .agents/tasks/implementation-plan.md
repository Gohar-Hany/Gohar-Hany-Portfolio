# Mobile Refactoring Implementation Plan
**Portfolio Website:** Gohar Hany — Deep Space Neon Theme  
**Plan Date:** January 2025  
**Estimated Total Effort:** 16-20 hours (across 6 phases)

---

## Phase 1 — Foundation (Global CSS Fixes)
**Estimated Effort:** 2-3 hours  
**Priority:** P0 (Critical)

### 1.1 Fix Responsive Breakpoint System in `index.css`
**Files to Edit:**
- `src/index.css`

**Code Pattern:**
```css
/* ═══ RESPONSIVE BREAKPOINT TOKENS ═══ */
:root {
  --breakpoint-xs: 320px;
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1440px;
}

/* Update responsive overrides for layout tokens */
@media (max-width: 480px) {
  :root {
    --radius: 0.5rem;           /* 8px */
    --viewer-pad: 0.75rem;      /* 12px */
    --card-gap: 0.5rem;         /* 8px */
    --modal-pad: 1rem;          /* 16px */
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  :root {
    --radius: 0.625rem;         /* 10px */
    --viewer-pad: 1.25rem;      /* 20px */
    --card-gap: 0.75rem;        /* 12px */
    --modal-pad: 1.5rem;        /* 24px */
  }
}

@media (min-width: 769px) {
  :root {
    --radius: 0.75rem;          /* 12px */
    --viewer-pad: 2rem;         /* 32px */
    --card-gap: 1.5rem;         /* 24px */
    --modal-pad: 2.5rem;        /* 40px */
  }
}
```

**Success Criteria:**
- All components referencing `var(--modal-pad)`, `var(--card-gap)`, etc. adapt correctly across viewports
- Visual inspection at 320px, 480px, 768px, 1024px shows consistent spacing

---

### 1.2 Z-Index Architecture (Already Defined — Verify Usage)
**Files to Verify:**
- `src/components/Navigation.tsx` → uses `--z-sticky-nav`
- `src/components/CustomCursor.tsx` → uses `--z-cursor`
- `src/components/Preloader.tsx` → uses `--z-preloader`
- `src/components/ProjectsSection.tsx` → modal backdrop should use `--z-modal-backdrop`, modal uses `--z-modal`
- `src/components/PhotoGallerySection.tsx` → same as above
- `src/components/ContactSection.tsx` → chat should use `--z-base`

**Code Pattern:**
```tsx
// Example: ProjectsSection modal
<div 
  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
  style={{ zIndex: 'var(--z-modal-backdrop)' }}
/>
<div 
  className="fixed inset-0 flex items-center justify-center"
  style={{ zIndex: 'var(--z-modal)' }}
>
  {/* Modal content */}
</div>
```

**Success Criteria:**
- No z-index conflicts when multiple modals/overlays active
- CustomCursor never blocks interactive elements
- Preloader always on top during initial load

---

### 1.3 Enforce Touch Target Compliance
**Files to Edit:**
- `src/index.css` (add global utility class)

**Code Pattern:**
```css
/* ═══ TOUCH TARGET UTILITIES ═══ */
.tap-target {
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Apply to all buttons and links */
button, a[href], [role="button"] {
  min-height: 44px;
  padding-inline: 0.75rem; /* minimum 12px horizontal padding */
}

/* Exception: icon-only buttons */
button.icon-only, a.icon-only {
  min-height: 44px;
  min-width: 44px;
  padding: 0.5rem;
}
```

**Files to Update:**
- `src/components/Navigation.tsx` → Desktop nav links: change `h-10` to `h-11`
- `src/components/ContactSection.tsx` → 3D interaction button: change `py-2` to `py-3`
- `src/components/SkillsSection.tsx` → Skill tags: if clickable, add `tap-target` class

**Success Criteria:**
- All interactive elements meet 44x44px minimum on mobile
- No accidental taps on adjacent elements

---

### 1.4 Refine `prefers-reduced-motion` Support
**Files to Edit:**
- `src/index.css`

**Code Pattern:**
```css
/* ═══ PREFERS-REDUCED-MOTION (REFINED) ═══ */
@media (prefers-reduced-motion: reduce) {
  /* Disable decorative animations */
  .animate-pulse,
  .animate-bounce,
  .animate-spin,
  .animate-spin-slow,
  .animate-float,
  .animate-fade-up,
  .animate-slide-left,
  .animate-scale-in,
  .animate-pulse-glow,
  .particle,
  #particles,
  .custom-cursor {
    animation: none !important;
    transition: none !important;
  }
  
  /* Preserve essential UI feedback (reduced duration) */
  button, a, [role="button"], 
  .modal, .menu, .dialog {
    animation-duration: 0.15s !important;
    transition-duration: 0.15s !important;
  }
  
  /* Disable GSAP animations via data attribute */
  [data-gsap] {
    animation: none !important;
    transition: none !important;
  }
}
```

**Files to Update:**
- `src/components/Preloader.tsx` → Check `matchMedia` before starting GSAP timeline
- `src/components/SkillsSection.tsx` → Check `matchMedia` before starting SVG animations

**Code Pattern (JS):**
```typescript
useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // Skip animation setup
  
  // Continue with animation setup...
}, []);
```

**Success Criteria:**
- With reduced motion enabled: decorative animations disabled, UI transitions fast but smooth
- Essential feedback (button press, modal open) still provides visual response

---

## Phase 2 — Typography System (Fluid Font Sizes)
**Estimated Effort:** 3-4 hours  
**Priority:** P0 (Critical)

### 2.1 Replace Hardcoded Font Sizes with `clamp()`
**Files to Edit:**
- `src/components/HeroSection.tsx`
- `src/components/AboutSection.tsx`
- `src/components/SkillsSection.tsx`
- `src/components/ProjectsSection.tsx`
- `src/components/ExperienceSection.tsx`
- `src/components/EducationSection.tsx`
- `src/components/ContactSection.tsx`
- `src/components/Footer.tsx`

**Code Pattern:**
```tsx
// BEFORE (HeroSection h1):
<h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold font-syne">

// AFTER:
<h1 
  className="font-bold font-syne leading-[1.05] tracking-tight"
  style={{ fontSize: 'clamp(2rem, 7vw + 0.5rem, 6.5rem)' }}
>
```

**Complete Mapping:**

| Component | Element | New `clamp()` Value |
|-----------|---------|---------------------|
| HeroSection | h1 title | `clamp(2rem, 7vw + 0.5rem, 6.5rem)` |
| HeroSection | Animated roles | `clamp(0.9375rem, 3vw, 1.875rem)` |
| HeroSection | Description | `clamp(0.875rem, 2vw + 0.25rem, 1.25rem)` |
| HeroSection | Stat values | `clamp(1.5rem, 4vw, 2rem)` |
| AboutSection | Section heading | `clamp(2rem, 5vw, 3.75rem)` |
| AboutSection | Blockquote | `clamp(1.125rem, 2.5vw, 1.5rem)` |
| AboutSection | Body text | `clamp(0.9375rem, 1.8vw, 1.125rem)` |
| SkillsSection | Section title | `clamp(2rem, 5vw, 3.75rem)` |
| SkillsSection | Card titles | `clamp(1.125rem, 2vw, 1.5rem)` |
| SkillsSection | Card descriptions | `clamp(0.8125rem, 1.5vw, 0.9375rem)` |
| ProjectsSection | Section heading | `clamp(2rem, 5vw, 3.75rem)` |
| ProjectsSection | Card titles | `clamp(1.25rem, 3vw, 1.875rem)` |
| ProjectsSection | Card subtitles | `clamp(0.9375rem, 1.8vw, 1.125rem)` |
| ExperienceSection | Section heading | `clamp(2rem, 5vw, 3.75rem)` |
| ExperienceSection | Experience titles | `clamp(1.25rem, 2.5vw, 1.875rem)` |
| EducationSection | Section heading | `clamp(2rem, 5vw, 3.75rem)` |
| EducationSection | Degree title | `clamp(1.25rem, 3vw, 2.25rem)` |
| ContactSection | Section heading | `clamp(2rem, 5vw, 3.75rem)` |
| ContactSection | Chat messages | `clamp(0.875rem, 1.5vw, 1rem)` |
| Footer | Brand name | `clamp(1.5rem, 3vw, 1.875rem)` |

**Implementation Strategy:**
1. Create a shared CSS file `src/styles/typography.css` with all fluid type scales as CSS custom properties:
   ```css
   :root {
     --font-hero-title: clamp(2rem, 7vw + 0.5rem, 6.5rem);
     --font-section-heading: clamp(2rem, 5vw, 3.75rem);
     --font-card-title: clamp(1.25rem, 3vw, 1.875rem);
     --font-body: clamp(0.9375rem, 1.8vw, 1.125rem);
     --font-small: clamp(0.8125rem, 1.5vw, 0.9375rem);
   }
   ```

2. Import in `index.css`:
   ```css
   @import './styles/typography.css';
   ```

3. Update components to use CSS variables:
   ```tsx
   <h1 
     className="font-bold font-syne leading-tight"
     style={{ fontSize: 'var(--font-hero-title)' }}
   >
   ```

**Success Criteria:**
- All text scales smoothly from 320px to 4K
- No awkward jumps in font size at breakpoints
- Titles readable at 320px without excessive wrapping
- Visual inspection confirms hierarchy preserved across viewports

---

### 2.2 Implement Fluid Heading Hierarchy
**Files to Edit:**
- `src/styles/typography.css` (new file)
- `src/index.css` (import typography.css)

**Code Pattern:**
```css
/* typography.css */
:root {
  /* ═══ FLUID TYPE SCALE ═══ */
  --font-display: clamp(2.5rem, 8vw, 7rem);        /* Hero display text */
  --font-h1: clamp(2rem, 5vw, 3.75rem);            /* Section headings */
  --font-h2: clamp(1.5rem, 3.5vw, 2.5rem);         /* Subsection headings */
  --font-h3: clamp(1.25rem, 2.5vw, 1.875rem);      /* Card titles */
  --font-h4: clamp(1.125rem, 2vw, 1.5rem);         /* Card subtitles */
  --font-body-lg: clamp(1rem, 1.8vw, 1.25rem);     /* Large body text */
  --font-body: clamp(0.9375rem, 1.6vw, 1.125rem);  /* Default body text */
  --font-body-sm: clamp(0.875rem, 1.4vw, 1rem);    /* Small body text */
  --font-caption: clamp(0.75rem, 1.2vw, 0.875rem); /* Captions, labels */
  --font-tiny: clamp(0.6875rem, 1vw, 0.75rem);     /* Tiny text (avoid if possible) */
  
  /* ═══ LINE HEIGHTS ═══ */
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}

/* Apply to semantic elements */
h1, .h1 { font-size: var(--font-h1); line-height: var(--leading-tight); }
h2, .h2 { font-size: var(--font-h2); line-height: var(--leading-snug); }
h3, .h3 { font-size: var(--font-h3); line-height: var(--leading-snug); }
h4, .h4 { font-size: var(--font-h4); line-height: var(--leading-normal); }

body { font-size: var(--font-body); line-height: var(--leading-normal); }
```

**Success Criteria:**
- Consistent type scale across all components
- No hardcoded `text-*` Tailwind classes for primary headings
- All headings use semantic HTML (`<h1>`, `<h2>`, etc.) with CSS variable sizing

---

## Phase 3 — Layout Refactoring (Mobile-First Grids)
**Estimated Effort:** 4-5 hours  
**Priority:** P0 (Critical)

### 3.1 Fix ProjectsSection Modal
**Files to Edit:**
- `src/components/ProjectsSection.tsx`

**Code Changes:**

**BEFORE (Modal container):**
```tsx
<DialogContent className="max-w-6xl w-full sm:w-[90vw] h-[100dvh] sm:h-auto sm:max-h-[85vh] p-0 bg-[#090d11] sm:bg-black/75">
```

**AFTER:**
```tsx
<DialogContent className="max-w-6xl w-[100vw] sm:w-[90vw] max-h-[100dvh] p-0 bg-[#090d11] sm:bg-black/75 overflow-hidden">
  <div className="flex flex-col md:flex-row h-full max-h-[100dvh] overflow-hidden">
    {/* Image section */}
    <div className="relative w-full md:w-[60%] lg:w-[65%] min-h-[200px] h-[38vh] sm:h-[45vh] md:h-full overflow-hidden shrink-0">
      {/* Image content */}
    </div>
    
    {/* Content section with independent scroll */}
    <div className="relative w-full md:w-[40%] lg:w-[35%] flex flex-col justify-start md:justify-center p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto custom-scroll">
      {/* Content */}
    </div>
  </div>
</DialogContent>
```

**Close Button Fix:**
```tsx
// BEFORE:
<button className="fixed sm:absolute top-4 right-4 sm:top-6 sm:right-6">

// AFTER:
<button className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[9999]">
```

**Add Overscroll Behavior:**
```css
/* In component or index.css */
.custom-scroll {
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}
```

**Success Criteria:**
- Modal never exceeds viewport dimensions at any size
- Close button always visible and reachable
- Content section scrolls independently without competing with body scroll
- Image section maintains aspect ratio with `min-h-[200px]` in landscape

---

### 3.2 Fix ContactSection 3D Iframe Scroll Trap
**Files to Edit:**
- `src/components/ContactSection.tsx`

**Code Changes:**

**BEFORE:**
```tsx
<iframe
  src="https://my.spline.design/..."
  className={`scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out ${is3DActive ? 'pointer-events-auto' : 'pointer-events-none lg:pointer-events-auto'}`}
/>
```

**AFTER:**
```tsx
<div className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px]">
  {/* Interaction blocker overlay (mobile only) */}
  {!is3DActive && (
    <div className="absolute inset-0 z-20 lg:hidden" />
  )}
  
  <iframe
    src="https://my.spline.design/..."
    className={`scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out`}
    style={{ pointerEvents: is3DActive ? 'auto' : 'none' }}
    // On desktop, always enable pointer events
    onLoad={(e) => {
      if (window.innerWidth >= 1024) {
        e.currentTarget.style.pointerEvents = 'auto';
      }
    }}
  />
</div>

{/* Mobile interaction button */}
<div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 lg:hidden">
  {!is3DActive ? (
    <button
      type="button"
      onClick={() => setIs3DActive(true)}
      className="px-5 py-3 rounded-full bg-[#040d1a]/95 border border-primary/50 text-primary text-sm font-syne font-bold shadow-[0_0_20px_rgba(0,212,255,0.4)] tap-target"
    >
      <Bot size={16} className="inline mr-2 text-accent" />
      Tap to Interact in 3D
    </button>
  ) : (
    <button
      type="button"
      onClick={() => setIs3DActive(false)}
      className="px-5 py-3 rounded-full bg-black/90 border border-white/30 text-white text-sm font-syne font-semibold tap-target"
    >
      ✕ Exit 3D (Resume Scroll)
    </button>
  )}
</div>
```

**Success Criteria:**
- On mobile, iframe blocked by default; user can scroll past without trap
- Tapping button enables 3D interaction; tapping "Exit" restores scroll
- On desktop (≥1024px), iframe always interactive (no button shown)
- Button meets 44px tap target height

---

### 3.3 Fix DomeGallery Touch Drag Sensitivity
**Files to Edit:**
- `src/components/DomeGallery.tsx`

**Code Changes:**

**BEFORE:**
```tsx
const effectiveDragSensitivity = isTouch ? dragSensitivity * 2 : dragSensitivity;
```

**AFTER:**
```tsx
// Reduce sensitivity 50% on touch (larger divisor = slower rotation)
const effectiveDragSensitivity = isTouch ? dragSensitivity * 1.5 : dragSensitivity;
```

**Alternative (Blueprint recommendation):**
```tsx
const effectiveDragSensitivity = isTouch ? dragSensitivity / 0.5 : dragSensitivity;
// Dividing by 0.5 = multiplying by 2 (faster rotation)
// But Blueprint says "reduce sensitivity 50% on touch" which means slower rotation
// So correct fix is:
const effectiveDragSensitivity = isTouch ? dragSensitivity * 2 : dragSensitivity;
// Wait, that's what we had... Let me re-read Blueprint.

// Blueprint: "Reduce drag sensitivity by 50%, disable momentum scroll, increase snap threshold"
// "Reduce sensitivity" means it should require MORE movement to rotate the same amount
// Current: dragSensitivity * 2 → LARGER divisor in rotation calculation → SLOWER rotation ✅
// So current code is CORRECT. Audit report was wrong. No fix needed.
```

**Actually, after re-reading the code:**
```tsx
// In onDrag handler:
const nextY = startRotRef.current.y + dxTotal / effectiveDragSensitivity;

// If effectiveDragSensitivity is LARGER, rotation is SLOWER (correct for touch)
// Current: isTouch ? dragSensitivity * 2 : dragSensitivity
// This makes touch 2x slower than mouse (CORRECT per Blueprint)
```

**No change needed — current implementation is correct.**

---

### 3.4 Implement DomeGallery "Lite Mode"
**Files to Edit:**
- `src/components/DomeGallery.tsx`

**Code Changes:**

**Add Lite Mode Detection:**
```tsx
// At top of component
const [isLiteMode, setIsLiteMode] = useState(false);

useEffect(() => {
  const isLowEnd = 
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4);
  
  setIsLiteMode(isLowEnd);
}, []);
```

**Conditional Render:**
```tsx
return (
  <div className="dome-gallery-root" ref={rootRef}>
    {isLiteMode ? (
      // Lite Mode: Flat CSS Grid
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 p-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onImageClick?.(item.originalItem)}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    ) : (
      // Full 3D Dome (existing code)
      <>
        {/* ... existing dome JSX ... */}
      </>
    )}
    
    {/* Toggle button (optional) */}
    {isLiteMode && (
      <button
        onClick={() => setIsLiteMode(false)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-primary text-sm font-bold"
      >
        Switch to 3D View
      </button>
    )}
  </div>
);
```

**Success Criteria:**
- On low-memory devices (≤4GB RAM or ≤4 CPU cores), flat grid renders by default
- Flat grid performance: 60 FPS on all interactions
- Optional toggle allows user to enable 3D mode if desired

---

### 3.5 Fix Bento Grid Intermediate Breakpoints
**Files to Edit:**
- `src/components/AboutSection.tsx`
- `src/components/EducationSection.tsx`
- `src/components/SkillsSection.tsx`

**Code Pattern (AboutSection):**

**BEFORE:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-min">
```

**AFTER:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 auto-rows-min">
  {/* Main Biography Card */}
  <div className="md:col-span-2 lg:col-span-7 lg:row-span-2 ...">
  
  {/* Currently Active Card */}
  <div className="md:col-span-1 lg:col-span-5 ...">
  
  {/* Academic Profile Cards */}
  <div className="md:col-span-1 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 ...">
</div>
```

**Code Pattern (EducationSection):**

**BEFORE:**
```tsx
<div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
```

**AFTER:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-16">
  {/* Left: Education Info */}
  <div className="md:col-span-1 lg:col-span-7 ...">
  
  {/* Right: Coursework */}
  <div className="md:col-span-1 lg:col-span-5 ...">
</div>
```

**Success Criteria:**
- At 768-1023px (tablets), grids use 2-column layout instead of stacking
- Visual balance across all viewport sizes
- No awkward gaps or orphaned cards

---

### 3.6 Fix Modal Image Heights (Landscape Mobile)
**Files to Edit:**
- `src/components/ProjectsSection.tsx`
- `src/components/PhotoGallerySection.tsx`

**Code Changes:**

**BEFORE:**
```tsx
<div className="relative w-full md:w-[60%] h-[38vh] sm:h-[45vh] md:h-full">
```

**AFTER:**
```tsx
<div className="relative w-full md:w-[60%] min-h-[200px] h-[38vh] sm:h-[45vh] md:h-full">
```

**Add Landscape Media Query (in component or index.css):**
```css
@media (orientation: landscape) and (max-height: 500px) {
  .modal-image-section {
    height: 50vh !important;
    min-height: 180px !important;
  }
}
```

**Success Criteria:**
- In landscape mobile (height ≤500px), image section maintains minimum 180-200px height
- Content section still has adequate space for text

---

### 3.7 Use `dvh` Units Consistently
**Files to Edit:**
- All components using `vh` units

**Find and Replace:**
- `100vh` → `100dvh`
- `h-screen` → `h-[100dvh]` (if Tailwind doesn't support dvh natively)
- `min-h-screen` → `min-h-[100dvh]`

**Components to Update:**
- `src/components/HeroSection.tsx` ✅ (already uses `100dvh`)
- `src/components/ProjectsSection.tsx` ✅ (already uses `100dvh`)
- `src/components/PhotoGallerySection.tsx` ✅ (already uses `100dvh`)
- `src/components/Navigation.tsx` (mobile menu height) — verify uses `100dvh`

**Success Criteria:**
- No content hidden by mobile browser chrome (address bar)
- Full-screen sections fill entire viewport on iOS Safari

---

## Phase 4 — Touch UX (Tap Targets & Spacing)
**Estimated Effort:** 2-3 hours  
**Priority:** P1 (High)

### 4.1 Fix Navigation Tap Targets
**Files to Edit:**
- `src/components/Navigation.tsx`

**Code Changes:**

**BEFORE (Desktop nav links at md:):**
```tsx
<button className="relative px-4 lg:px-5 h-10 rounded-xl ...">
```

**AFTER:**
```tsx
<button className="relative px-4 lg:px-5 h-11 rounded-xl ...">
```

**BEFORE (Mobile menu items gap):**
```tsx
<div className="space-y-1.5 sm:space-y-2">
```

**AFTER:**
```tsx
<div className="space-y-2">
```

**Success Criteria:**
- All nav links meet 44px minimum tap target on all viewports
- Mobile menu items have consistent 8px spacing

---

### 4.2 Add `:active` States for Touch Feedback
**Files to Edit:**
- `src/components/SkillsSection.tsx`
- `src/components/ProjectsSection.tsx`
- `src/components/AboutSection.tsx`
- `src/components/ExperienceSection.tsx`

**Code Pattern:**

**BEFORE:**
```tsx
<div className="... hover:border-white/[0.12] hover:-translate-y-1 transition-all">
```

**AFTER:**
```tsx
<div className="... hover:border-white/[0.12] hover:-translate-y-1 active:border-white/[0.12] active:-translate-y-1 active:scale-[0.98] transition-all">
```

**Apply to:**
- Skill cards
- Project cards
- About section stat cards
- Experience timeline cards
- Education award cards

**Success Criteria:**
- On touch, cards provide immediate visual feedback (scale down slightly + border glow)
- Feedback activates on `touchstart`, not just `hover`

---

### 4.3 Fix Skill Card Tag Spacing
**Files to Edit:**
- `src/components/SkillsSection.tsx`

**Code Changes:**

**BEFORE:**
```tsx
<div className="flex flex-wrap gap-[5px] mb-5">
```

**AFTER:**
```tsx
<div className="flex flex-wrap gap-2 mb-5">
```

**Success Criteria:**
- Tags have 8px spacing (meets minimum)
- No accidental double-taps

---

### 4.4 Fix Footer Email Button Overflow
**Files to Edit:**
- `src/components/Footer.tsx`

**Code Changes:**

**BEFORE:**
```tsx
<a className="inline-flex items-center justify-center gap-2 px-6 py-3 ...">
  Start a Dialogue
  <ExternalLink size={16} />
</a>
```

**AFTER:**
```tsx
<a className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 ...">
  <span className="hidden sm:inline">Start a Dialogue</span>
  <span className="sm:hidden">Contact</span>
  <ExternalLink size={16} />
</a>
```

**Success Criteria:**
- On mobile (<640px), button shows "Contact" (shorter text)
- On desktop (≥640px), button shows "Start a Dialogue"
- No text wrapping or overflow at 320px

---

## Phase 5 — Performance Optimization (Animations & 3D)
**Estimated Effort:** 3-4 hours  
**Priority:** P1 (High)

### 5.1 Reduce HeroSection Particle Count
**Files to Edit:**
- `src/components/HeroSection.tsx`

**Code Changes:**

**BEFORE:**
```tsx
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const particleCount = isMobile ? 12 : 30;
```

**AFTER:**
```tsx
const isMobile = window.matchMedia('(max-width: 640px)').matches;
const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
const particleCount = isMobile ? (isLowEnd ? 6 : 8) : (isLowEnd ? 12 : 30);
```

**Also Add `prefers-reduced-motion` Check:**
```tsx
useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    setParticles([]); // Disable particles entirely
    return;
  }
  
  // ... rest of particle setup
}, []);
```

**Success Criteria:**
- On mobile, max 8 particles (6 on low-end devices)
- Particles disabled when `prefers-reduced-motion` active
- Smooth 60 FPS scrolling on iPhone SE

---

### 5.2 Disable SkillsSection Visualizations on Mobile
**Files to Edit:**
- `src/components/SkillsSection.tsx`

**Code Changes:**

**Add Static Preview Images:**
```tsx
// At top of component
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const useStaticPreviews = isMobile || prefersReducedMotion;
```

**Conditional Render:**
```tsx
<div className={`relative z-10 mt-auto border border-white/[0.05] overflow-hidden ${cat.vizHeight}`}>
  {useStaticPreviews ? (
    // Static preview image
    <img 
      src={`/viz-previews/${cat.label.toLowerCase().replace(/ /g, '-')}.png`}
      alt={`${cat.title} visualization preview`}
      className="w-full h-full object-cover"
    />
  ) : (
    // Animated SVG
    <cat.Viz />
  )}
</div>
```

**Generate Static Preview Images:**
1. Capture screenshots of each visualization at 400x120px
2. Save as PNG in `/public/viz-previews/`:
   - `ai-architecture.png`
   - `llm-engineering.png`
   - `automation.png`
   - `data-systems.png`
   - `languages.png`
   - `platforms.png`

**Success Criteria:**
- On mobile/tablet, visualizations are static images (no rAF loops)
- On desktop, visualizations animate as before
- Page load performance improved (no heavy SVG animations on mobile)

---

### 5.3 Reduce Background Blur Effects on Mobile
**Files to Edit:**
- `src/components/AboutSection.tsx`
- `src/components/SkillsSection.tsx`
- `src/components/ProjectsSection.tsx`
- `src/components/ExperienceSection.tsx`
- `src/components/EducationSection.tsx`
- `src/components/ContactSection.tsx`

**Code Pattern:**

**BEFORE:**
```tsx
<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-60 pointer-events-none mix-blend-screen" />
```

**AFTER:**
```tsx
<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[60px] sm:blur-[100px] lg:blur-[120px] opacity-40 sm:opacity-50 lg:opacity-60 pointer-events-none mix-blend-screen" />
```

**Alternative (More Aggressive):**
```css
/* In index.css or component */
@media (max-width: 768px) {
  .ambient-glow {
    display: none;
  }
}
```

**Apply `ambient-glow` class to all decorative blur gradients.**

**Success Criteria:**
- On mobile, blur radius ≤60px (reduced paint complexity)
- On desktop, full blur effects preserved
- Scroll performance improved on older devices

---

### 5.4 Simplify Preloader on Mobile
**Files to Edit:**
- `src/components/Preloader.tsx`

**Code Changes:**

**Add Mobile Detection:**
```tsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
```

**Conditional Render:**
```tsx
return (
  <div ref={preloaderRef} className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden font-mono" style={{ background: '#090d11' }}>
    
    {/* Background Layer — Simplified on mobile */}
    <div className="absolute inset-0">
      {!isMobile && (
        <>
          {/* Neural Network SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
            {/* ... SVG paths ... */}
          </svg>
          
          {/* Circuit grid pattern */}
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: '...' }} />
          
          {/* Particles */}
          <div className="absolute inset-0">
            {/* ... particles ... */}
          </div>
        </>
      )}
      
      {/* Scanning lines (keep on mobile) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full animate-pulse opacity-60" style={{ top: '20%', height: '1px', background: '...', animationDuration: '4s' }} />
      </div>
    </div>
    
    {/* AI Boot Sequence — Simplified on mobile */}
    {!isMobile && (
      <div className="absolute inset-0 overflow-hidden opacity-[0.15] pointer-events-none select-none">
        {/* ... boot sequence text ... */}
      </div>
    )}
    
    {/* Center: Terminal Logo Window (keep on all devices) */}
    {/* ... logo JSX ... */}
    
    {/* Center: Progress Bar (keep on all devices) */}
    {/* ... progress bar JSX ... */}
    
    {/* Bottom Status Panels (hide on mobile) */}
    {!isMobile && (
      <>
        <div className="absolute bottom-8 left-8 ...">
          {/* system_status */}
        </div>
        <div className="absolute bottom-8 right-8 ...">
          {/* build --production */}
        </div>
      </>
    )}
    
    {/* Corner Brackets (keep on all devices) */}
    <div className="absolute top-4 left-4 text-2xl font-mono" style={{ color: 'rgba(0,212,255,0.5)' }}>⌜</div>
    {/* ... other corners ... */}
  </div>
);
```

**Success Criteria:**
- On mobile, preloader shows logo, progress bar, scanning line, corner brackets only
- On desktop, full preloader with all overlays
- Preloader completes in <2.5s on all devices

---

### 5.5 Implement 3D Robot Fallback (Low-End Devices)
**Files to Edit:**
- `src/components/ContactSection.tsx`

**Code Changes:**

**Add Low-End Device Detection:**
```tsx
const [showRobotFallback, setShowRobotFallback] = useState(false);

useEffect(() => {
  const isLowEnd = 
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4);
  
  setShowRobotFallback(isLowEnd);
}, []);
```

**Conditional Render:**
```tsx
<div className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,183,255,0.15)] bg-black/40 border border-white/10 group">
  {showRobotFallback ? (
    // Static fallback image
    <img
      src="/robot-fallback.png"
      alt="AI Robot"
      className="w-full h-full object-cover"
    />
  ) : (
    // 3D Spline iframe
    <>
      {/* ... iframe JSX ... */}
    </>
  )}
</div>
```

**Generate Fallback Image:**
- Capture screenshot of Spline robot at 800x600px
- Save as `/public/robot-fallback.png`

**Success Criteria:**
- On low-end devices, static image shown (no 3D iframe)
- On capable devices, 3D iframe loads
- Performance improved on budget Android phones

---

### 5.6 Debounce Navigation Scroll Handler
**Files to Edit:**
- `src/components/Navigation.tsx`

**Code Changes:**

**BEFORE:**
```tsx
const handleScroll = () => {
  const currentY = window.scrollY;
  // ... scroll logic runs on every scroll event
};

window.addEventListener('scroll', handleScroll, { passive: true });
```

**AFTER:**
```tsx
const handleScroll = () => {
  const currentY = window.scrollY;
  // ... scroll logic
};

// Throttle to max 60fps (16.67ms)
let ticking = false;
const throttledScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener('scroll', throttledScroll, { passive: true });
```

**Success Criteria:**
- Scroll handler runs max once per frame (60fps)
- Reduced CPU usage during scroll
- Navigation transitions remain smooth

---

## Phase 6 — Testing Checklist
**Estimated Effort:** 2-3 hours  
**Priority:** P1 (High)

### 6.1 Device Testing Matrix

**Test Devices:**
1. **iPhone SE (375x667)** — smallest common mobile viewport
2. **iPhone 12/13 Pro (390x844)** — standard phone
3. **iPad Mini (768x1024)** — tablet portrait
4. **iPad Pro (1024x1366)** — large tablet
5. **Desktop (1920x1080)** — standard desktop
6. **4K (3840x2160)** — high-res desktop

**Test Browsers:**
- Chrome (desktop + mobile)
- Safari (desktop + iOS)
- Firefox (desktop + mobile)
- Edge (desktop)

**Test Scenarios:**

#### Test 1: Navigation
- [ ] Hamburger menu opens smoothly on mobile
- [ ] Focus trap works (Tab cycles through menu items)
- [ ] ESC key closes menu
- [ ] Menu auto-closes on section navigate
- [ ] Desktop nav links meet 44px tap target
- [ ] Scroll-away nav hides on scroll down, shows on scroll up
- [ ] Glass background activates at 80px scroll

#### Test 2: HeroSection
- [ ] Hero fills 100dvh on all devices (no chrome overlap)
- [ ] Particles animate smoothly (60 FPS on mobile)
- [ ] CTA buttons full-width on mobile, side-by-side on sm:
- [ ] Background image contrast readable on all screen sizes
- [ ] Stat cards 2-column grid on mobile

#### Test 3: AboutSection
- [ ] Bento grid 2-column on tablets, 12-column on desktop
- [ ] Biography card readable at 320px
- [ ] Stats animate smoothly on scroll into view
- [ ] Counter animation no jank

#### Test 4: SkillsSection
- [ ] Marquee scrolls smoothly (no pauses on mobile)
- [ ] Bento grid adapts at breakpoints
- [ ] Visualizations static on mobile, animated on desktop
- [ ] Skill tags have 8px spacing
- [ ] Stats bar correct border logic

#### Test 5: ProjectsSection
- [ ] Bento grid 1-column mobile, 2-column tablet+
- [ ] Modal full-screen on mobile, centered on desktop
- [ ] Modal content scrolls independently
- [ ] Close button always visible and reachable
- [ ] Tech tags wrap correctly
- [ ] No horizontal scroll at any viewport

#### Test 6: DomeGallery
- [ ] 3D dome runs at 60 FPS on capable devices
- [ ] Lite Mode activates on low-end devices
- [ ] Touch drag rotates smoothly (not too fast/slow)
- [ ] Vertical tilt locked on touch (no disorienting rotation)
- [ ] Image tiles load with lazy loading

#### Test 7: PhotoGallerySection
- [ ] Grid 2-column mobile, 3-column tablet, 4-column desktop
- [ ] Modal full-screen on mobile, centered on desktop
- [ ] Image maintains aspect ratio in landscape
- [ ] Metadata cards readable
- [ ] Close button tap target adequate

#### Test 8: ExperienceSection
- [ ] Timeline horizontal scroll smooth on mobile
- [ ] Active experience content visible (not scrolled away)
- [ ] Experience details readable at 320px
- [ ] Skills tags wrap correctly

#### Test 9: EducationSection
- [ ] Main card 2-column on tablet, 12-column on desktop
- [ ] Coursework grid 1-column mobile, 2-column tablet+
- [ ] Awards grid 1-column mobile, 2-column tablet, 3-column desktop
- [ ] Certifications grid readable

#### Test 10: ContactSection
- [ ] 3D iframe blocked on mobile by default
- [ ] "Tap to Interact" button works correctly
- [ ] "Exit 3D" restores scroll
- [ ] Chat scrolls to bottom on new message
- [ ] Form inputs full-width on mobile
- [ ] Send button disabled when empty

#### Test 11: Footer
- [ ] Email button text adapts (short on mobile, full on desktop)
- [ ] Social icons meet tap target
- [ ] Copyright text readable

#### Test 12: Preloader
- [ ] Completes in <2.5s
- [ ] Simplified on mobile (no heavy overlays)
- [ ] Progress bar animates smoothly
- [ ] Exit animation smooth (no flash)

#### Test 13: Accessibility
- [ ] All interactive elements keyboard-navigable
- [ ] Focus indicators visible
- [ ] ARIA labels present on icon buttons
- [ ] Heading hierarchy logical (h1 → h2 → h3)
- [ ] Color contrast WCAG AA compliant
- [ ] Screen reader announces modal open/close

#### Test 14: Performance
- [ ] Lighthouse Mobile score ≥85 (Performance)
- [ ] Lighthouse Mobile score ≥90 (Accessibility)
- [ ] No console errors or warnings
- [ ] No horizontal scroll at any viewport
- [ ] All animations respect `prefers-reduced-motion`

---

### 6.2 Manual Testing Checklist

**Before Each Test:**
1. Clear browser cache
2. Disable browser extensions
3. Test on real device (not just DevTools emulation)
4. Test in incognito/private mode

**During Testing:**
1. Open DevTools Performance panel
2. Record interaction (scroll, click, drag)
3. Check FPS (should stay >55 FPS)
4. Check for layout shifts (CLS should be <0.1)
5. Check for repaint/reflow warnings

**After Testing:**
1. Document issues in GitHub Issues with:
   - Device/Browser
   - Viewport size
   - Steps to reproduce
   - Screenshot/screen recording
   - Expected vs. actual behavior

---

### 6.3 Automated Testing Setup

**Install Testing Dependencies:**
```bash
npm install -D @playwright/test lighthouse
```

**Create Test Script:**
```javascript
// tests/mobile-responsive.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test('Navigation tap targets', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test hamburger button
    const hamburger = page.locator('button[aria-label="Open menu"]');
    const box = await hamburger.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(box?.width).toBeGreaterThanOrEqual(44);
    
    // Open menu
    await hamburger.click();
    
    // Test menu items
    const menuItems = page.locator('[role="menu"] button');
    const count = await menuItems.count();
    for (let i = 0; i < count; i++) {
      const item = menuItems.nth(i);
      const itemBox = await item.boundingBox();
      expect(itemBox?.height).toBeGreaterThanOrEqual(44);
    }
  });
  
  test('Modal scroll independence', async ({ page }) => {
    await page.goto('http://localhost:5173#projects');
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open first project
    await page.locator('.project-card').first().click();
    
    // Verify modal visible
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    // Scroll modal content
    const modalContent = page.locator('.modal-content');
    await modalContent.evaluate(el => el.scrollTop = 100);
    
    // Verify body didn't scroll
    const bodyScroll = await page.evaluate(() => window.scrollY);
    expect(bodyScroll).toBe(0);
  });
});
```

**Run Tests:**
```bash
npm run test
```

---

## Phase 7 — useScrollLock Hook Implementation
**Status:** ✅ **Already Implemented**  
**File:** `src/hooks/useScrollLock.ts`

### Current Implementation Review

**Code:**
```typescript
export function useScrollLock() {
  const isLocked = useRef(false);
  const originalPaddingRight = useRef('');

  const lock = useCallback(() => {
    if (isLocked.current) return;
    
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    originalPaddingRight.current = document.body.style.paddingRight;
    
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    document.body.style.overflow = 'hidden';
    isLocked.current = true;
  }, []);

  const unlock = useCallback(() => {
    if (!isLocked.current) return;
    
    document.body.style.overflow = '';
    document.body.style.paddingRight = originalPaddingRight.current;
    isLocked.current = false;
  }, []);

  return { lock, unlock, isLocked: isLocked.current };
}
```

**Status:** ✅ Correctly implemented with:
- Scrollbar width compensation (prevents layout shift)
- Ref-based locking (prevents duplicate locks)
- Cleanup on unlock

**Components Using Hook:**
- ✅ `src/components/ProjectsSection.tsx`
- ❓ `src/components/PhotoGallerySection.tsx` (verify usage)
- ❓ `src/components/DomeGallery.tsx` (uses custom scroll lock — should migrate to hook)

**Recommended Action:**
Migrate DomeGallery to use `useScrollLock` hook instead of custom implementation for consistency.

**Code Change (DomeGallery.tsx):**

**BEFORE:**
```tsx
const scrollLockedRef = useRef(false);
const lockScroll = useCallback(() => {
  if (scrollLockedRef.current) return;
  scrollLockedRef.current = true;
  document.body.classList.add('dg-scroll-lock');
}, []);
```

**AFTER:**
```tsx
import { useScrollLock } from '@/hooks/useScrollLock';

// In component:
const { lock: lockScroll, unlock: unlockScroll } = useScrollLock();
```

**Remove CSS:**
```css
/* DELETE from DomeGallery styles: */
.dg-scroll-lock {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
}
```

**Success Criteria:**
- All modals use consistent scroll lock mechanism
- No layout shift when modal opens
- Scroll position preserved on modal close

---

## Final Verification Checklist

### Pre-Launch Checklist
- [ ] All P0 (Critical) fixes implemented
- [ ] All P1 (High) fixes implemented
- [ ] Manual testing completed on 6 device sizes
- [ ] Lighthouse scores meet targets (Mobile ≥85 Performance, ≥90 Accessibility)
- [ ] No console errors in production build
- [ ] No horizontal scroll at 320px-4K
- [ ] All modals functional at 375px
- [ ] Typography scales smoothly across all viewports
- [ ] Touch targets meet 44x44px minimum
- [ ] Animations respect `prefers-reduced-motion`
- [ ] 3D components have low-end fallbacks
- [ ] Git commit messages follow conventional commits format

### Build & Deploy
```bash
# Build for production
npm run build

# Run lighthouse audit
lighthouse http://localhost:4173 --view --only-categories=performance,accessibility --preset=mobile

# Deploy
npm run deploy
```

---

## Estimated Timeline

| Phase | Effort | Dependencies | Team |
|-------|--------|--------------|------|
| Phase 1: Foundation | 2-3 hours | None | Frontend Dev |
| Phase 2: Typography | 3-4 hours | Phase 1 complete | Frontend Dev |
| Phase 3: Layout | 4-5 hours | Phase 1-2 complete | Frontend Dev |
| Phase 4: Touch UX | 2-3 hours | Phase 3 complete | Frontend Dev |
| Phase 5: Performance | 3-4 hours | Phase 1-4 complete | Frontend Dev |
| Phase 6: Testing | 2-3 hours | Phase 1-5 complete | QA + Frontend Dev |
| **Total** | **16-22 hours** | Sequential execution | 1 Frontend Dev |

**Recommended Approach:**
- Sprint 1 (Week 1): Phases 1-3 (Foundation + Typography + Layout) — 9-12 hours
- Sprint 2 (Week 2): Phases 4-6 (Touch UX + Performance + Testing) — 7-10 hours

---

**End of Implementation Plan**
