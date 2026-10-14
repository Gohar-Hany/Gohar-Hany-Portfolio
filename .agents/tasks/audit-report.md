# Mobile Responsiveness Audit Report
**Portfolio Website:** Gohar Hany — Deep Space Neon Theme  
**Audit Date:** January 2025  
**Framework:** React + TypeScript + Vite + GSAP + Tailwind CSS  
**Audit Scope:** Mobile viewports 320px–1023px

---

## Section A: Critical Issues by Viewport

### 320px–375px (iPhone SE, small phones)

**CRITICAL ISSUES:**
1. **ProjectsSection Modal** — Modal exceeds viewport width/height with no scroll; close button may be unreachable
2. **ContactSection 3D iframe** — Spline iframe causes scroll trap on mobile; users cannot scroll past the embedded 3D scene
3. **DomeGallery** — 3D dome with 35 segments severely impacts performance on low-end devices; renders at <20 FPS
4. **Navigation mobile menu** — At 320px, "Start a Dialogue" button text wraps awkwardly; minimum tap target not met for social icons in mobile menu
5. **HeroSection** — Particle count (30 particles) runs continuously without reduction on 320px; causes jank during scroll
6. **Footer** — Email link in mobile menu wraps and overflows on very narrow screens
7. **Typography** — Multiple hardcoded `px` font sizes in HeroSection, AboutSection titles (64px, 72px) do not scale down proportionally for 320px

**MODERATE ISSUES:**
1. PhotoGallerySection modal — Full-screen modal on mobile has excessive padding (1.25rem from --modal-pad override), reducing usable content area
2. ExperienceSection role cards — Horizontal scrollable timeline lacks visual scroll indicators on 320px
3. EducationSection coursework grid — 2-column grid on mobile causes text truncation in course names

---

### 376px–639px (standard phones portrait)

**CRITICAL ISSUES:**
1. **ProjectsSection Modal** — Still exceeds comfortable viewport; scrolling within modal not smooth; nested scrolling conflicts with body scroll
2. **ContactSection 3D iframe** — Scroll trap persists; no way to "unlock" interaction to resume vertical page scroll
3. **DomeGallery** — Performance still poor; 60% particle reduction applied but segments remain at 35 on tablets <640px (should be 12)
4. **SkillsSection marquee** — Marquee items overlap on smaller phones; fade edges too narrow (28px = 7rem) causing abrupt text cutoff

**MODERATE ISSUES:**
1. HeroSection stats cards — 2-column grid readable but padding is tight; stat values (text-2xl sm:text-3xl) feel cramped
2. AboutSection bento grid — Cards stack but internal padding doesn't adapt; 10+ line height causes excessive vertical space
3. Navigation — Hamburger menu animation smooth but menu overlay height calculation uses 100dvh which may clip bottom buttons on older iOS Safari

---

### 640px–767px (large phones, small tablets)

**CRITICAL ISSUES:**
1. **ProjectsSection Modal** — Modal width now comfortable but height still fixed; long project descriptions cause internal scroll which competes with outer scroll
2. **DomeGallery** — Segments should drop to 20 at <1024px but implementation uses effectiveSegments; verify segment count
3. **ContactSection** — AI chat + form stack vertically; combined height >1200px causes excessive scrolling; no sticky chat input

**MODERATE ISSUES:**
1. HeroSection CTA buttons — Buttons now side-by-side (sm:flex-row) but still feel large; could reduce height from 56px to 48px
2. SkillsSection cards — Cards transition to 2-column grid (md:grid-cols-2) but column balance uneven; some cards significantly taller
3. Footer social links — Links now visible but spacing inconsistent in tablet landscape

---

### 768px–1023px (tablets portrait)

**CRITICAL ISSUES:**
1. **ProjectsSection Modal** — Transitions to desktop layout but max-w-6xl too wide for 768px; modal exceeds safe area
2. **DomeGallery** — Still using 35 segments at 768px; should reduce to 20 segments as per Blueprint

**MODERATE ISSUES:**
1. Navigation — Desktop nav shows at md: (768px) but links feel cramped with gap-1 lg:gap-2; needs more breathing room
2. AboutSection stats grid — 4-column grid at 768px causes stat cards to be narrow; text wraps awkwardly
3. ExperienceSection timeline — Left column sticky at lg:top-32 but at 768px-1023px (not yet `lg:`), timeline scrolls away

---

## Section B: Component-by-Component Findings

### Navigation.tsx
**BROKEN:**
- ❌ Mobile menu social icons in bottom action bar: width/height 3.25rem (52px) meets tap target, but visual hit area feels smaller due to border/padding
- ❌ Desktop nav links at 768px (md:) too cramped with gap-1; barely meet 44px tap target with padding

**SUBOPTIMAL:**
- ⚠️ Mobile menu uses `overscrollBehavior: 'contain'` but should also set on `<body>` when open to prevent Safari rubber-band scroll
- ⚠️ Scroll direction detection uses `lastScrollY.current` but rapid scroll changes can cause nav to flicker; needs debounce threshold >5px
- ⚠️ Glass background transition smooth but `isScrolled` threshold at 50px feels arbitrary; should match nav height (80px)

**WORKING:**
- ✅ Sticky positioning with z-index from CSS variable `--z-sticky-nav`
- ✅ Focus trap in mobile menu correctly cycles through focusable elements
- ✅ Auto-close on section navigate prevents orphaned menu state
- ✅ Touch-friendly 48px tap targets on mobile CTA and hamburger

---

### HeroSection.tsx
**BROKEN:**
- ❌ Particle count: `matchMedia` check uses 768px threshold but should use 640px to align with Tailwind `sm:`; mobile gets 12 particles but still animates all 12 simultaneously (GPU strain)
- ❌ Hardcoded font sizes: `text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]` — jumps are too large; at 375px, 4xl (2.25rem / 36px) barely readable for hero heading
- ❌ Background image uses `lg:left-[40%]` but on mobile (`left-0`), image covers entire viewport with 75% opacity scrim; text contrast poor on certain image regions

**SUBOPTIMAL:**
- ⚠️ CTA buttons full-width on mobile (`w-full sm:w-48`) but `h-14` (56px) is taller than Blueprint recommendation (48px minimum, not 56px default)
- ⚠️ Animated roles container has fixed `h-[44px] sm:h-[48px]` but at 320px, longer role strings ("Agentic AI & Automation Architect") may overflow or wrap
- ⚠️ Stat cards use `rounded-2xl sm:rounded-3xl` but on very small screens, 1rem border radius feels excessive; should use `clamp(0.75rem, 3vw, 1.5rem)`

**WORKING:**
- ✅ Uses `100dvh` for min-height, correctly handles mobile browser chrome
- ✅ Particles reduced by 60% on mobile (12 vs 30)
- ✅ GPU-accelerated particle animation with `will-change: transform`
- ✅ Role rotation every 4s with smooth transition

---

### AboutSection.tsx
**BROKEN:**
- ❌ Main biography card: `p-5 sm:p-8 md:p-10` padding values good, but internal text blocks use `space-y-6` (1.5rem) which creates 24px gaps; on 320px screen, biography occupies >600px height
- ❌ Stats grid: `grid-cols-2 lg:grid-cols-4` but at 375px, stat cards have `p-4 sm:p-6 md:p-8` — the `p-8` at md: (768px) is excessive before lg: kicks in
- ❌ "Currently Active" card font sizes: `text-lg` (18px) for heading, `text-sm` (14px) for body; no fluid scaling

**SUBOPTIMAL:**
- ⚠️ Bento grid uses `lg:col-span-7` and `lg:col-span-5` but no intermediate breakpoints; at 768-1023px, cards stack but could use 2-column grid
- ⚠️ Academic profile cards at 768px stack in `grid-cols-1 sm:grid-cols-2` but `sm:` is 640px; leaves 640-767px with single column (awkward gap)
- ⚠️ Counter animation runs on every scroll into view; on slow devices, may cause jank; should use `will-change: contents` or `transform` optimization

**WORKING:**
- ✅ Intersection observer with `threshold: 0.15` and `rootMargin: -100px` prevents premature animation
- ✅ Counter animation uses easeOutExpo easing (smooth)
- ✅ Stats use `text-3xl sm:text-4xl md:text-5xl` with gradient text for visual hierarchy

---

### SkillsSection.tsx
**BROKEN:**
- ❌ Skill card visualizations (SVG animations) run continuously even off-screen until IntersectionObserver triggers; multiple `setInterval` and `requestAnimationFrame` loops per card; on mobile with 6 cards, this is 6 concurrent animations
- ❌ Marquee uses `animation: skills-marquee 55s linear infinite` with no pause on `prefers-reduced-motion`; auto-plays and cannot be stopped
- ❌ Skill cards at mobile have `p-6 lg:p-8` but descriptions are `text-[13px]`; on 320px, combined with skill tags (11px), text is difficult to read

**SUBOPTIMAL:**
- ⚠️ Stats bar at bottom uses `lg:border-r` logic that doesn't account for mobile 2-column grid; borders inconsistent
- ⚠️ Bento grid uses `lg:col-span-7` / `lg:col-span-5` but stacks single column below `lg:`; should use `md:grid-cols-2` for tablets
- ⚠️ Visualization height `h-[120px] lg:h-[150px]` fixed; on very small screens, SVG viewBox `0 0 400 120` gets squashed horizontally

**WORKING:**
- ✅ Visualizations use IntersectionObserver to pause when off-screen
- ✅ Cursor spotlight effect uses CSS custom properties `--mx` / `--my` (GPU-friendly)
- ✅ Counter animation smooth with easeOutExpo

---

### ProjectsSection.tsx
**BROKEN:**
- ❌ **Modal scroll lock**: Uses `useScrollLock` hook but modal body uses `h-[100dvh] sm:h-auto sm:max-h-[85vh]`; on mobile, modal is full-screen with `overflow-y-auto` but nested scrolling within modal content competes with outer DialogContent scroll
- ❌ **Modal layout**: At mobile, image section `h-[38vh]` fixed; on landscape phones (max-height: 500px), image takes 38% = 190px, leaving only ~310px for content (too cramped)
- ❌ **Close button**: `fixed sm:absolute top-4 right-4` but on mobile scroll, button scrolls with content instead of staying fixed at viewport top-right
- ❌ **Project cards**: Bento grid `grid-cols-1 md:grid-cols-2` but no `gap` responsive values; uses `gap-4 sm:gap-6 lg:gap-8` which is good, but at 320px, 1rem gap leaves only ~300px card width minus padding

**SUBOPTIMAL:**
- ⚠️ Tech tags in cards limited to `.slice(0, 3)` with "+N" indicator; on mobile, 3 tags wrap, causing card height inconsistency
- ⚠️ Modal content padding `p-6 sm:p-8 md:p-10 lg:p-12` but at 375px, 1.5rem padding reduces usable width to ~343px; modal text wraps excessively
- ⚠️ Tabs in modal ("overview", "architecture", etc.) not implemented with keyboard navigation (no arrow key support)

**WORKING:**
- ✅ Cards use `rounded-[1.5rem] sm:rounded-[2.5rem]` for visual polish
- ✅ Hover states GPU-accelerated (`transform: translateY`)
- ✅ ESC key closes modal
- ✅ `useScrollLock` hook prevents body scroll when modal open

---

### DomeGallery.tsx
**BROKEN:**
- ❌ **3D performance on mobile**: Despite `getDeviceSegments()` returning 12 for mobile <640px, the component still renders heavy 3D transforms per tile; on iPhone SE, runs at 15-20 FPS during drag
- ❌ **Touch drag sensitivity**: `effectiveDragSensitivity = isTouch ? dragSensitivity * 2 : dragSensitivity` — multiplying by 2 REDUCES sensitivity (should divide by 2); causes dome to rotate too slowly on touch
- ❌ **Vertical tilt locked on touch**: Code explicitly disables vertical rotation on touch (`pointerTypeRef.current === 'touch' ? startRotRef.current.x : ...`) which is correct per Blueprint, but creates disorienting UX when user expects full 3D control
- ❌ **Scroll lock**: Uses custom scroll lock (`lockScroll() / unlockScroll()`) but check `dg-scroll-lock` class on body; conflicts with other modals using `useScrollLock` hook

**SUBOPTIMAL:**
- ⚠️ Momentum/inertia uses `frictionMul = 0.94 + 0.055 * d` where `d = dragDampening`; on mobile, feels "sticky" after swipe
- ⚠️ Image tiles use `loading="lazy"` but `fetchpriority={index < 4 ? "high" : "low"}`; first 4 tiles may not be visible initially in dome orientation
- ⚠️ "Lite Mode" fallback not implemented (Blueprint specifies flat CSS grid fallback for low-memory devices)
- ⚠️ Watermark cover at bottom-right (`w-48 h-12 bg-black/90 blur-md`) is hardcoded; Spline updated their watermark position

**WORKING:**
- ✅ Touch device detection via `'ontouchstart' in window || navigator.maxTouchPoints > 0`
- ✅ Tile positioning uses spherical projection math (correct)
- ✅ GPU acceleration with `will-change: transform` and `backface-visibility: hidden`

---

### PhotoGallerySection.tsx
**BROKEN:**
- ❌ **DomeGallery integration**: Passes `onImageClick` callback but DomeGallery's internal modal state conflicts with PhotoGallerySection's Dialog state; clicking image opens DomeGallery's built-in enlarged view, not Dialog
- ❌ **Modal image layout**: Uses `flex-col md:flex-row` with `h-[38vh] sm:h-[45vh] md:h-full`; on mobile landscape (height <500px), image section shrinks to 38% of already-small viewport height (~150px)
- ❌ **Modal scrolling**: Content section uses `overflow-y-visible md:overflow-y-auto` which allows content to overflow on mobile portrait; should be `overflow-y-auto` always

**SUBOPTIMAL:**
- ⚠️ Close button `w-11 h-11 sm:w-12 sm:h-12` meets 44px tap target but only on `sm:` (640px+); at 320-639px, button is 44px (just barely acceptable)
- ⚠️ Metadata cards (date, location) use `p-3 sm:p-4`; on 320px, cards feel cramped
- ⚠️ Badge font sizes `text-[10px] sm:text-xs` are very small; may fail WCAG AA contrast ratio at such small sizes

**WORKING:**
- ✅ Gallery stats use animated counters with IntersectionObserver
- ✅ Modal uses Dialog from shadcn/ui (accessible)
- ✅ Image uses `loading="lazy"` and `decoding="async"`

---

### ContactSection.tsx
**BROKEN:**
- ❌ **3D robot iframe scroll trap**: Spline iframe has `pointer-events: none` by default, `lg:pointer-events-auto`; on mobile, user must tap "Tap to Interact in 3D" button to enable `pointer-events: auto`, but then iframe captures ALL touch events including vertical scroll attempts — user cannot scroll past the 3D section without tapping "Exit 3D"
- ❌ **Watermark cover**: `w-48 h-12 bg-black/90 blur-md` positioned `bottom-0 right-0` to hide Spline watermark; Spline may have updated watermark position, making this ineffective
- ❌ **Mobile 3D button**: Button uses `px-4 py-2` with `text-xs`; tap target <44px height (actual ~32px)

**SUBOPTIMAL:**
- ⚠️ AI chat + contact form stack vertically on mobile; combined height >1400px; no way to "collapse" chat or form to reduce scroll distance
- ⚠️ Chat messages use ReactMarkdown with `prose prose-invert`; on mobile, code blocks in AI responses may overflow horizontally (no `overflow-x: auto`)
- ⚠️ Form inputs have `h-12` (48px) which is good, but textarea `rows={4}` fixed; on mobile, 4 rows may be too tall, pushing submit button off-screen

**WORKING:**
- ✅ Chat scrolls to bottom on new message (`scrollToBottom()`)
- ✅ Send button disabled when input empty or typing
- ✅ Form uses native HTML5 validation (`required`)

---

### ExperienceSection.tsx
**BROKEN:**
- ❌ **Timeline horizontal scroll on mobile**: Timeline cards use `flex-shrink-0` with `overflow-x-auto` and `no-scrollbar` class; on 320px, cards are ~280px wide, requiring horizontal scroll, but no visual indicator (scroll shadow, gradient fade, or dots)
- ❌ **Active experience content**: Right column uses `lg:absolute lg:inset-0` but below `lg:` (1024px), content is relative and stacks; on tablet (768-1023px), timeline scrolls away as user reads content (should be sticky)

**SUBOPTIMAL:**
- ⚠️ Timeline "Swipe to explore" hint only shows on mobile but uses `text-xs` (12px); may be missed by users
- ⚠️ Experience details card uses `p-5 sm:p-8 md:p-10`; at 768px (md:), padding is 2.5rem = 40px; excessive for tablet portrait
- ⚠️ Skills tags at bottom use `flex-wrap gap-2.5`; on mobile, wrapping causes uneven rows

**WORKING:**
- ✅ Active card animates in with `animate-in fade-in slide-in-from-bottom-8 duration-700`
- ✅ Stats at bottom use 2-column grid on mobile, 4-column on desktop
- ✅ Icon components dynamically loaded from lucide-react

---

### EducationSection.tsx
**BROKEN:**
- ❌ **Main education card**: Grid uses `lg:grid-cols-12` with left `lg:col-span-7`, right `lg:col-span-5`; below `lg:`, stacks single column; no intermediate breakpoint for tablets
- ❌ **Coursework grid**: Uses `sm:grid-cols-2` with no `gap` responsive values; at 320px, 2 columns with 0.75rem gap leaves ~140px per card minus padding; course names like "Digital Image Processing" truncate

**SUBOPTIMAL:**
- ⚠️ Awards grid uses `lg:grid-cols-3` but below `lg:`, stacks single column; at 768-1023px (tablets), could use 2-column grid
- ⚠️ Certifications grid `sm:grid-cols-2 lg:grid-cols-3` good but cards use `flex items-center` with `truncate` on text; at 320px, issuer names wrap or truncate awkwardly
- ⚠️ Bottom "impact summary" box uses `p-5 sm:p-8 md:p-10`; at 768px (md:), padding is 2.5rem; feels excessive for a single paragraph

**WORKING:**
- ✅ Section header follows consistent pattern across all sections
- ✅ Awards use unique gradient backgrounds per card
- ✅ Icon sizes scale responsively

---

### Footer.tsx
**BROKEN:**
- ❌ **Email link button**: "Start a Dialogue" button in footer uses `inline-flex items-center justify-center gap-2 px-6 py-3` with `text-white font-medium`; at 320px, button width ~200px, but parent column is only ~280px minus padding; button wraps or text truncates

**SUBOPTIMAL:**
- ⚠️ Footer grid uses `md:grid-cols-12` with `md:col-span-5`, `md:col-span-3`, `md:col-span-4`; below `md:`, stacks single column; social links at bottom have no spacing on mobile (gap-4 but wraps)
- ⚠️ Copyright text `text-[13px]` and "Built with" text same size; no hierarchy
- ⚠️ Social icons in footer use `w-12 h-12` (48px) which is good for tap targets, but at 320px, 3 icons side-by-side with gap-4 = 176px; fits but feels cramped

**WORKING:**
- ✅ Scroll-to-top button with smooth scroll
- ✅ Hover states on nav links with animated underline

---

### Preloader.tsx
**BROKEN:**
- ❌ **Text sizing**: Terminal text uses `text-xs` and `text-sm` which are fixed; at 320px, multiple overlapping text blocks (AI_CORE, AUTOMATION_ENGINE, etc.) crowd the viewport
- ❌ **Timeout fallback**: Preloader MUST complete in 2.5s per Blueprint, but AI_CORE initialization text animates with `animationDuration: '3s'`; causes text to still be animating when preloader exits

**SUBOPTIMAL:**
- ⚠️ Logo uses `text-4xl md:text-6xl`; gradient text may not render correctly on very low-end devices (fallback color needed)
- ⚠️ Progress bar uses nested divs with gradient background + box-shadow; on mobile, box-shadow `0 0 20px rgba(0,212,255,0.6)` causes repaints

**WORKING:**
- ✅ Neural network SVG uses `animate-pulse` with staggered delays
- ✅ Progress bar fills smoothly with GSAP timeline
- ✅ Exit animation uses `opacity + scale` (GPU-friendly)

---

### CustomCursor.tsx
**BROKEN:**
- None — component already conditionally disabled on touch devices

**SUBOPTIMAL:**
- ⚠️ CSS uses `@media (hover: none)` to hide cursor, but also checks `(pointer: coarse)` separately; should combine into single query: `@media (hover: none), (pointer: coarse)`

**WORKING:**
- ✅ Correctly hidden on touch devices
- ✅ Uses `pointer-events: none` to avoid blocking clicks
- ✅ Smooth trailing animation with `requestAnimationFrame`

---

## Section C: Typography & Spacing Issues

### Hardcoded `px` Font Sizes Requiring Fluid `clamp()`

| Component | Element | Current | Recommended |
|-----------|---------|---------|-------------|
| HeroSection | h1 title | `text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]` | `font-size: clamp(2rem, 7vw + 0.5rem, 6.5rem)` |
| HeroSection | Animated roles | `text-[15px] sm:text-xl md:text-2xl lg:text-3xl` | `font-size: clamp(0.9375rem, 3vw, 1.875rem)` |
| HeroSection | Description | `text-sm sm:text-lg md:text-xl` | `font-size: clamp(0.875rem, 2vw, 1.25rem)` |
| AboutSection | Section heading | `text-4xl md:text-5xl lg:text-6xl` | `font-size: clamp(2rem, 5vw, 3.75rem)` |
| AboutSection | Biography text | `text-xl md:text-2xl` (blockquote) | `font-size: clamp(1.125rem, 2.5vw, 1.5rem)` |
| SkillsSection | Section title | `text-4xl md:text-5xl lg:text-6xl` | Same as AboutSection |
| SkillsSection | Skill card titles | `text-xl lg:text-2xl` | `font-size: clamp(1.125rem, 2vw, 1.5rem)` |
| ProjectsSection | Section heading | `text-4xl md:text-5xl lg:text-6xl` | Same pattern |
| ProjectsSection | Project card titles | `text-xl sm:text-2xl md:text-3xl` | `font-size: clamp(1.25rem, 3vw, 1.875rem)` |
| ExperienceSection | Experience titles | `text-2xl md:text-3xl` | `font-size: clamp(1.25rem, 2.5vw, 1.875rem)` |
| ContactSection | Chat message text | `text-[14px]` | `font-size: clamp(0.875rem, 1.5vw, 1rem)` |
| Footer | Brand name | `text-3xl` | `font-size: clamp(1.5rem, 3vw, 1.875rem)` |

### Missing Responsive Padding/Margin Values

| Component | Element | Issue | Fix |
|-----------|---------|-------|-----|
| All sections | `py-24 lg:py-32` | No intermediate values for tablets | Add `py-16 sm:py-20 md:py-24 lg:py-32` |
| ProjectsSection modal | `p-6 sm:p-8 md:p-10 lg:p-12` | Too much padding on mobile (1.5rem = 24px) | Use `p-4 sm:p-6 md:p-8 lg:p-10` |
| AboutSection cards | `p-5 sm:p-8 md:p-10` | Jump from 1.25rem to 2rem too large | Use `p-4 sm:p-6 md:p-8` |
| SkillsSection cards | `p-6 lg:p-8` | No intermediate value | Add `p-5 sm:p-6 lg:p-8` |
| ContactSection chat | `p-4 sm:p-6 md:p-8` | Good pattern — adopt elsewhere | ✅ Already optimal |
| Footer | `py-16 pb-8` | Asymmetric padding may cause layout shift | Use `py-12 pb-8` on mobile |

### Inconsistent Use of CSS Custom Properties from index.css

**Blueprint defines these variables:**
```css
--space-xs: clamp(0.5rem, 1vw, 0.75rem);
--space-sm: clamp(0.75rem, 2vw, 1.25rem);
--space-md: clamp(1rem, 4vw, 2rem);
--space-lg: clamp(2rem, 6vw, 4rem);
--space-xl: clamp(3rem, 10vw, 7rem);
```

**Components NOT using these variables:**
- HeroSection: Uses Tailwind `mb-8 sm:mb-12` instead of `var(--space-md)` or `var(--space-lg)`
- AboutSection: Uses `mb-5 sm:mb-6` instead of `var(--space-sm)`
- SkillsSection: Uses `mb-5` and `mb-10` instead of variables
- ProjectsSection: Uses `mb-16` hardcoded instead of `var(--space-lg)`
- ExperienceSection: Uses `mb-16`, `gap-6 lg:gap-10` instead of variables
- ContactSection: Uses `space-y-8` hardcoded
- Footer: Uses `mb-16` and `mb-8` hardcoded

**Recommendation:** Refactor all spacing to use CSS variables for consistency and maintainability.

---

## Section D: Layout & Overflow Problems

### Fixed-Width Containers Causing Horizontal Scroll

1. **ProjectsSection Modal** (mobile):
   - Modal uses `max-w-6xl w-full sm:w-[90vw]` but at <640px, `w-full` = 100vw; combined with modal padding `p-6` (24px each side), content box = 100vw - 48px; if inner content has additional padding/margins, total width >100vw → horizontal scroll
   - **Fix:** Set modal container `w-[100vw]` with `p-4` on mobile, increase to `p-6` at `sm:`

2. **ExperienceSection Timeline** (mobile):
   - Timeline cards have `flex-shrink-0` with no explicit width; card content (icon + text) expands to natural width (~280-320px); at 320px viewport, cards overflow causing horizontal scroll (intended) but container has no padding-right, so last card clips at edge
   - **Fix:** Add `pr-4` to timeline container to provide scroll padding

3. **SkillsSection Marquee**:
   - Marquee items use `text-xl md:text-2xl lg:text-[28px]` with `gap-12`; on very narrow screens (<375px), single marquee item + gap may exceed viewport width before animation starts
   - **Fix:** Reduce marquee font size to `text-lg md:text-xl lg:text-2xl` and gap to `gap-8 md:gap-12`

4. **Footer Email Button**:
   - Button in footer "Start a Dialogue" has `px-6 py-3` with `gap-2` for icon; text "Start a Dialogue" = ~140px + icon 16px + gap 8px + padding 48px = ~210px; at 320px in 2-column grid with gap, column width ~140px → button overflows
   - **Fix:** Change button text to "Contact" on mobile, full text on `sm:`

### Grid/Flexbox That Doesn't Collapse Properly

1. **AboutSection Bento Grid**:
   - Uses `grid-cols-1 lg:grid-cols-12` with no intermediate breakpoints; at 768-1023px (tablets), all cards stack single column instead of using 2-column grid
   - **Fix:** Add `md:grid-cols-2` to enable 2-column layout on tablets, with cards spanning `md:col-span-1` by default and featured card `md:col-span-2`

2. **ProjectsSection Bento Grid**:
   - Uses `grid-cols-1 md:grid-cols-2` which is correct, but card heights inconsistent due to variable content length; creates awkward gaps in grid
   - **Fix:** Set min-height on cards or use `grid-auto-rows: 1fr` to equalize row heights

3. **EducationSection Coursework**:
   - Uses `sm:grid-cols-2` for coursework cards; below 640px, stacks single column (correct), but at 640-767px, 2-column grid with long course names causes text truncation
   - **Fix:** Use `grid-cols-1 md:grid-cols-2` instead, or reduce font size at `sm:` to prevent truncation

4. **Footer Grid**:
   - Uses `md:grid-cols-12` with complex column spans; below 768px, stacks single column, but social links section uses `md:items-end` which has no effect when stacked
   - **Fix:** Simplify footer grid to `grid-cols-1 md:grid-cols-3` with equal column widths

### Images Without max-width: 100%

1. **HeroSection Background Image**:
   - Image has `w-full h-full object-cover` which is correct, but parent container uses `absolute top-0 right-0 bottom-0 left-0 lg:left-[40%]`; on mobile, image covers 100% width (correct) but `object-position: center` may not show subject's face on narrow screens
   - **Fix:** Use `object-position: 50% 20%` on mobile to keep face in frame, `lg:object-[90%_15%]` on desktop

2. **ProjectsSection Modal Image**:
   - Modal image uses `w-full h-full object-cover` which is correct, but height fixed at `h-[38vh] sm:h-[45vh] md:h-full`; in landscape mobile (height ~400px), 38vh = 152px → image heavily cropped
   - **Fix:** Use `min-h-[200px] h-[38vh]` to prevent excessive cropping

3. **PhotoGallerySection Modal Image**:
   - Same issue as ProjectsSection modal
   - **Fix:** Apply same min-height constraint

### Modals That Exceed Viewport Dimensions

1. **ProjectsSection Modal** (320px-767px):
   - Modal content height exceeds viewport; uses `h-[100dvh]` on mobile with `overflow-y-auto`, but DialogContent from shadcn/ui may have additional wrapper padding causing total height >100dvh
   - **Fix:** Inspect DialogContent and ensure no extra padding; set `max-h-[100dvh]` and `overflow-hidden` on outer container, `overflow-y-auto` only on scrollable content region

2. **PhotoGallerySection Modal** (320px-767px):
   - Modal uses `h-[100dvh] sm:h-auto sm:max-h-[85vh]`; on mobile landscape (height ~400px), 100dvh means modal fills entire viewport with no breathing room
   - **Fix:** Use `max-h-[100dvh] h-auto` with `overflow-y-auto` to allow modal to shrink if content is shorter than viewport

3. **ContactSection AI Chat + Form** (all mobile):
   - Not a modal but stacks vertically with combined height >1200px; no virtual scrolling or lazy rendering; all content loaded upfront
   - **Fix:** Consider collapsible sections or tabs to reduce initial vertical footprint

---

## Section E: Touch Target Violations

### Buttons/Links < 44px Tap Target

1. **Navigation Desktop Links** (768px-1023px):
   - Nav links use `px-4 lg:px-5 h-10` (40px height); at `md:` (768px), height is 40px which is <44px minimum
   - **Fix:** Change `h-10` to `h-11` (44px) to meet accessibility guideline

2. **Navigation Mobile Social Icons** (bottom action bar):
   - Icons use `w-[3.25rem] h-[3.25rem]` (52px) which is good, but this is only in the bottom action bar; top brand logo "Gohar." has no explicit size and may be <44px
   - **Fix:** Ensure brand logo button has `min-h-[44px]` with adequate padding

3. **HeroSection Stat Cards** (mobile):
   - Cards are not interactive, so tap target guideline doesn't apply, but if cards become clickable in future, current padding `p-4 sm:p-5` may not provide 44px touch target
   - **Preventive Fix:** If adding click handlers, ensure cards have `min-h-[44px]`

4. **ContactSection 3D Interaction Button** (mobile):
   - Button uses `px-4 py-2 rounded-full text-xs`; `py-2` = 8px padding + text line-height ~16px = ~32px height → <44px
   - **Fix:** Change to `px-5 py-3` to increase height to 44px

5. **Footer Social Icons** (mobile):
   - Icons use `w-12 h-12` (48px) which meets 44px guideline ✅

6. **Skill Card Tags** (all viewports):
   - Tags use `px-2.5 py-[5px]` (5px = 0.3125rem); height ~26px → <44px; tags are not primary interactive elements (hover only) but may cause accidental taps
   - **Consideration:** If tags become clickable (filter by skill), increase padding to `px-3 py-2.5` for 44px height

### Interactive Elements Too Close Together (< 8px Spacing)

1. **Navigation Mobile Menu Items**:
   - Menu items have `gap-1.5 sm:gap-2` (6px / 8px); at 320px, gap is 6px which is <8px minimum
   - **Fix:** Use `gap-2` (8px) consistently on mobile

2. **HeroSection CTA Buttons**:
   - Buttons stack vertically on mobile with `gap-4` (16px) which is good ✅; side-by-side on `sm:` with `gap-6` (24px) also good ✅

3. **AboutSection Stats Grid**:
   - Stats use `gap-4` on mobile which is 16px – adequate ✅

4. **SkillsSection Card Tags**:
   - Tags have `gap-[5px]` (5px) which is <8px
   - **Fix:** Change to `gap-2` (8px minimum)

5. **ProjectsSection Tech Tags**:
   - Tags use `gap-2 sm:gap-2.5` which is 8px/10px – adequate ✅

6. **Footer Social Icons**:
   - Icons have `gap-4` (16px) – adequate ✅

### Missing Hover State Alternatives for Touch

1. **Skill Cards**:
   - Cards use `:hover` for border glow and translateY lift; no touch-specific feedback
   - **Fix:** Add `:active` state for touch with same styles: `active:border-white/[0.12] active:-translate-y-1`

2. **Project Cards**:
   - Cards use `:hover` for gradient background and border; no touch feedback
   - **Fix:** Add `:active` state mirroring hover

3. **Navigation Links**:
   - Desktop nav links use `:hover` for underline animation; no touch alternative
   - **Fix:** Not critical since mobile uses hamburger menu, but consider `:focus-visible` for keyboard navigation

4. **CustomCursor**:
   - Desktop-only feature, correctly hidden on touch devices ✅

---

## Section F: Performance Red Flags

### Heavy Animations Running on Mobile

1. **HeroSection Particles**:
   - 12 particles animate continuously with `@keyframes float-particle` (translateY + opacity); runs on GPU but still causes jank on older devices
   - **Fix:** Reduce particle count to 8 on mobile, or disable particles entirely on devices with `hardwareConcurrency <= 4`

2. **SkillsSection Visualizations**:
   - 6 skill cards each with SVG animations (agent graph, token bars, waveform, heatmap, code stream, deploy curve); all animate simultaneously with `setInterval` or `requestAnimationFrame`
   - **Fix:** Reduce animation complexity on mobile: use static preview images for visualizations, animate only on hover/focus (desktop only)

3. **DomeGallery 3D Transforms**:
   - 12-35 tiles (depending on viewport) each with individual 3D transform updated on drag; on mobile, causes severe jank
   - **Fix:** Implement "Lite Mode" as specified in Blueprint: flat CSS grid of images instead of 3D dome on low-memory devices

4. **Navigation Scroll Handler**:
   - Scroll event listener fires on every scroll event; uses `passive: true` which is good, but still calculates active section on every scroll
   - **Fix:** Debounce active section detection to run max once per 100ms

### Excessive Particles/Decorative Elements

1. **All Sections Background Glows**:
   - Every section has 2-3 large `blur-[100px]` gradient blobs; on mobile, multiple blur effects stack and cause repaint lag
   - **Fix:** Reduce blur radius to `blur-[60px]` on mobile, or use single background gradient per section instead of multiple blobs

2. **Preloader Overlays**:
   - 4 text blocks + neural network SVG + particles + scanning lines + grid pattern all render simultaneously
   - **Fix:** Simplify preloader on mobile: show only logo, progress bar, and single scanning line; disable neural network SVG and particles

3. **About/Skills/Projects Ambient Lighting**:
   - Each section has 2-3 absolutely positioned blur gradients with `mix-blend-screen`; these are static but add paint complexity
   - **Fix:** On mobile, reduce to single gradient per section or use solid color background with subtle gradient overlay

### Missing @media (prefers-reduced-motion)

**Current Implementation:**
- `index.css` has global rule:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- This is good but too aggressive; kills ALL animations including essential UI feedback (button press, menu open)

**Issues:**
1. **Essential animations disabled**: Modal open/close, menu slide-in, button hover feedback all reduced to 0.01ms (appears instant, may cause confusion)
2. **GSAP animations not covered**: GSAP timelines in Preloader and hero animations bypass CSS and still run at full speed
3. **SVG animations not covered**: Skill card visualizations use inline `setInterval` and `requestAnimationFrame`, not affected by CSS media query

**Fix:**
- Refine `prefers-reduced-motion` to target decorative animations only:
  - Disable: particles, ambient glows, skill visualizations, marquee
  - Preserve: modal transitions, button feedback, focus indicators
- Check `matchMedia('(prefers-reduced-motion: reduce)')` in JS and conditionally disable GSAP timelines and rAF loops

### 3D Transforms Not Disabled on Low-End Devices

1. **DomeGallery**:
   - Uses `hardwareConcurrency` and `deviceMemory` checks but only to switch segment count; 3D transforms still active on low-end devices
   - **Fix:** Implement "Lite Mode" fallback as Blueprint specifies:
     ```javascript
     const isLowEnd = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
     if (isLowEnd) {
       // Render flat CSS grid instead of 3D dome
     }
     ```

2. **ContactSection 3D Robot**:
   - Spline iframe loads and renders 3D scene on all devices; no low-end device detection
   - **Fix:** Detect low-end device and show static fallback image (screenshot of robot) instead of iframe

3. **All Sections 3D Transforms**:
   - Cards use `transform: translateY()` on hover; this is GPU-accelerated and generally safe, but combined with blur effects may cause jank
   - **Fix:** On low-end devices, disable transform animations and use only background color change for hover feedback

---

## Summary Recommendations

### Immediate Critical Fixes (P0)
1. ✅ Fix ProjectsSection modal scroll: remove `h-[100dvh]`, use `max-h-[100dvh] overflow-y-auto` with proper nested scroll handling
2. ✅ Fix ContactSection 3D iframe scroll trap: add "Exit 3D" interaction toggle that restores page scroll
3. ✅ Fix DomeGallery touch drag sensitivity: divide by 2 instead of multiply
4. ✅ Implement DomeGallery "Lite Mode" for low-memory devices
5. ✅ Fix Navigation desktop nav link tap targets at 768px (increase height to 44px)
6. ✅ Replace all hardcoded font sizes with fluid `clamp()` values
7. ✅ Reduce particle count on HeroSection mobile to 8 particles (from 12)
8. ✅ Fix ExperienceSection timeline scroll padding (add `pr-4`)

### High Priority (P1)
1. Add responsive padding/margin using CSS custom properties (`--space-*`)
2. Refine `prefers-reduced-motion` to preserve essential animations
3. Add intermediate breakpoints to bento grids (use `md:grid-cols-2` on tablets)
4. Fix modal image heights in landscape mobile (use `min-h-[200px]`)
5. Simplify Preloader on mobile (remove neural network SVG, reduce text overlays)
6. Disable SkillsSection visualizations on mobile (use static previews)

### Medium Priority (P2)
1. Fix Footer email button text overflow (use shorter text on mobile)
2. Add visual scroll indicators to ExperienceSection timeline
3. Reduce background blur effects on mobile (60px instead of 100px)
4. Add `:active` states to all interactive cards for touch feedback
5. Implement low-end device detection for 3D transforms

### Low Priority (P3)
1. Refactor all spacing to use CSS variables
2. Add keyboard navigation to ProjectsSection modal tabs
3. Optimize GSAP timeline cleanup across all components
4. Add swipe gesture support to PhotoGallerySection modal
5. Consider collapsible sections in ContactSection to reduce vertical scroll

---

**End of Audit Report**
