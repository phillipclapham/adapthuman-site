# Design Decisions - Adaptive Human Site

Record of key decisions made during the build process.

---

## Conversation 1: Foundation & Design System (Nov 2, 2025)

### Design System Approach

**Decision:** Adopt Protocol Memory's proven design token structure
**Rationale:** PM's system is production-tested, well-organized, and proven. No need to reinvent. Adapt, don't rebuild.

**What we adopted:**
- Complete spacing scale (4px base)
- Typography scale (xs through 7xl)
- Shadow system (xs through 2xl, with dark mode variants)
- Transition timing (fast through slower)
- Border radius scale
- Z-index scale

**What we extended:**
- Color palette (added gold and purple to PM's teal)
- Larger container widths (added 2xl: 1400px)
- Additional heading sizes (6xl, 7xl for hero text)

### Color Palette

**Decision:** Three accent colors - Teal (primary) + Gold (kintsugi) + Purple (spectrum)

**Values chosen:**
- **Teal:** #006b6d (light) / #00a8ab (dark) - Exact PM values for ecosystem cohesion
- **Gold:** #C9A961 (light) / #D4AF37 (dark) - Warm, professional, not garish
- **Purple:** #9333EA (light) / #A855F7 (dark) - From phillipclapham.com design notes

**Rationale:**
- Teal = primary brand anchor, PM cohesion, calm/professional
- Gold = kintsugi philosophy (constraints as features), warmth, transformation
- Purple = spectrum connection to phillipclapham.com, creative/cognitive energy

**Status:** DEFERRED - Waiting to see in context before adjusting
- Phill noted teal/purple combo not 100% sold yet
- Smart to see it on actual site structure before tweaking
- Foundation provides capabilities, usage will be discovered in Conversation 2

### Typography

**Decision:** Match PM fonts exactly

**Fonts:**
- **Headings:** Syne (geometric sans, modern, bold)
- **Body:** Plus Jakarta Sans (humanist sans, readable, warm)
- **Code:** Source Code Pro (monospace, technical)

**Rationale:**
- Maximum ecosystem cohesion with PM
- Already proven in production
- Fast to implement (same font loading)
- Can differentiate later if needed, but cohesion first

**Responsive scaling:**
- Base: 14px � 16px at 768px
- Headings scale up at 768px and 1024px breakpoints
- More dramatic hierarchy on larger screens

### Kintsugi Visual Language

**Decision:** Build capabilities, not prescriptions

**Approach:**
- Gold color available in tokens as `--color-gold`
- NO prescriptive "this is how kintsugi looks" decisions at foundation level
- Visual language (gradient seams, highlights, etc) will emerge in Conversation 2 when building actual components

**Rationale:**
- Philosophy is solid (constraints as features, repair as value)
- But whether gradient seams and gold highlights actually LOOK good needs to be tested in practice
- Foundation = capabilities; components = discovery

**Key insight from Phill:** "I fucking LOVE the design philosophy but I am still waiting to see how it actually looks before declaring it a winner"

### Dark Mode Infrastructure

**Decision:** First-class dark mode with smooth transitions

**Implementation:**
- CSS custom properties with `body.dark-mode` override
- localStorage persistence
- System preference detection
- Smooth transitions on theme change (250ms)
- No FOUC (Flash of Unstyled Content)

**Dark mode adjustments:**
- Teal/purple/gold all brighten for better contrast
- Shadows more pronounced (need depth cues in dark)
- Background: #0f1117 (very dark blue-black)

**Tested:** Theme toggle working, transitions smooth, localStorage persisting

### Accessibility

**Decisions made:**
- Respect `prefers-reduced-motion` (transitions to 1ms)
- Focus-visible for keyboard navigation
- Skip-to-content link built into base.css
- Semantic HTML structure required
- ARIA labels on interactive elements

### Build Pattern

**Decision:** 4 conversation-sized chunks with clean handoffs

**Pattern:** Plan � Execute chunk � Document � Checkpoint commit � Clear � Next

**Why this works:**
- Prevents context overflow
- Maintains quality through checkpoints
- Handles interruptions gracefully
- Clear handoffs preserve continuity
- Proven pattern from other projects

### File Structure

**Decision:** Separation of concerns in CSS

```
styles/
  tokens.css      - Design system variables only
  base.css        - Reset, typography, theme infrastructure
  components.css  - Reusable components (buttons, cards, etc)
  main.css        - Layout, page-specific styles
```

**Rationale:**
- tokens.css = pure variables, no styles
- base.css = foundation applicable everywhere
- components.css = reusable building blocks
- main.css = composition layer

Clean separation enables easy iteration and maintenance.

---

## Open Questions for Conversation 2

**Color usage ratios:**
- How much gold vs purple in practice?
- Teal/purple combo - works in context or needs adjustment?
- Where does each color live? (gold for highlights? purple for interactive?)

**Kintsugi visual implementation:**
- Gradient seams between sections?
- Gold highlights on specific elements?
- Asymmetric layout - how much?
- What actually LOOKS good vs what sounds good?

**Component patterns:**
- Button hierarchy (primary/secondary/ghost)
- Card styling (uniform vs organic heights)
- Link styling (underlines? hover effects?)
- Section transitions (how do we connect pieces?)

---

## Foundation Complete - Ready for Components

**What's locked:**
- Design token structure (spacing, typography, shadows, transitions)
- Color palette values (teal, gold, purple - exact hex codes)
- Typography system (fonts, scales, weights)
- Dark mode infrastructure (tested and working)
- File structure and build pattern

**What's flexible:**
- How we USE the colors (ratios, contexts, combinations)
- Kintsugi visual language (discover through building)
- Component styling (we'll find what works)

**Next conversation:** Build HTML structure with approved copy, create component library, see the design system in action.

---

*Conversation 1 complete: Nov 2, 2025*
*Foundation solid. Ready for components.*

---

## Conversation 2: HTML Structure + Components + Kintsugi Aesthetics (Nov 2, 2025)

### HTML Structure Decisions

**Completed Files:**
- `index.html` - Full homepage with semantic HTML5 structure
- `play.html` - Complete PLAY OS long-form content page

**Structure Choices:**
- Semantic HTML5 elements throughout (`<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`)
- Proper heading hierarchy (h1 → h2 → h3)
- Accessibility: ARIA labels on theme toggle, proper link text, semantic markup
- Clean, readable HTML with comments for major sections

**Content Integration:**
- Homepage: Full content from `homepage-copy-v2.md`
- PLAY page: Complete content from `play-public.md`
- GitHub link only for now (waiting on social media strategy)

---

### Component Decisions

**Built Components:**
- Buttons (primary: teal, secondary: purple, link-style)
- Badges (status badges for products)
- Navigation (sticky header, theme toggle)
- Hero sections (homepage hero, page hero for PLAY)
- Content sections (modular, reusable)
- Product cards (grid layout, hover states)
- Work principles cards (How I Work section)
- CTA boxes (PLAY OS callout)
- Connect section (GitHub, email)
- Footer (simple, clean)

**Component Philosophy:**
- Built on tokens.css foundation
- Transitions on hover (smooth, subtle)
- Consistent spacing using token variables
- Responsive from the start (mobile-first thinking)

---

### Kintsugi Aesthetic Implementation

**The Discovery:**
We answered the open questions from Conversation 1 by building and discovering what actually works.

**1. Color Usage Ratios**

**Teal (Primary):**
- Primary buttons
- Links and navigation hover
- Section borders
- Focus states
- **Usage:** ~60% of accent color presence

**Gold (Kintsugi - "The Seams"):**
- Section "seams" (gradient lines between sections)
- Hero name gradient (subtle touch)
- Section title underlines
- Principle cards (left border accent)
- Product cards (top border accent)
- Philosophy quote and connect tagline
- **Usage:** ~25% of accent color presence
- **Philosophy:** Gold as REPAIR, highlighting the joins between sections

**Purple (Spectrum Connection):**
- Secondary buttons
- CTA box gradients (teal → purple blend)
- **Usage:** ~15% of accent color presence
- **Philosophy:** Subtle spectrum connection to phillipclapham.com

**What We Learned:**
- Gold works best as SUBTLE accents, not dominant
- Kintsugi "seams" between sections = elegant visual metaphor
- Purple as support color (not competing with teal/gold)
- Teal remains primary anchor (PM ecosystem cohesion maintained)

**2. Kintsugi Visual Language**

**What We Implemented:**
1. **Section Seams:** Horizontal gold gradient lines between sections (40% opacity, fading edges)
   - Mimics kintsugi gold repair lines joining pottery pieces
   - Subtle enough to not overwhelm, visible enough to notice
   - Creates visual rhythm down the page

2. **Gold Accent Borders:**
   - Principle cards: 3px left border (vertical "seam")
   - Product cards: 2px top border (horizontal "highlight")
   - Section titles: 2px bottom border (underline emphasis)

3. **Gradient Touches:**
   - Hero name: Subtle text-to-gold gradient (70% text, 30% gold)
   - Not literal broken pottery, but VISUAL REFERENCE to repair/joining

**What We Avoided:**
- Literal broken imagery (too on-the-nose)
- Heavy-handed gold (overwhelming, luxury feel)
- Crack patterns (too literal, potentially sad/negative)

**What Works:**
- Seams as joins (positive: bringing pieces together)
- Gold as FEATURE not FIX (highlighting, not hiding)
- Subtle enough for professional polish
- Meaningful enough to notice on close inspection

**3. Asymmetry Decisions**

**Where We Used Asymmetry:**
- **Hero section:** Left-aligned content (desktop only)
  - Creates visual interest vs. perfect centering
  - Offset feels more human, less corporate
  - Resets to centered on mobile (better UX)

**Where We Kept Symmetry:**
- Content sections (centered containers)
- Product grid (balanced layout)
- Navigation (standard left/right split)

**Philosophy:**
- Asymmetry as PURPOSEFUL choice, not chaos
- Use sparingly for maximum impact (hero makes statement)
- Always serve readability over style (mobile resets to centered)

**4. Button Hierarchy**

**Final Decisions:**
- **Primary (teal):** Main CTAs, navigation emphasis
- **Secondary (purple):** Alternative actions, less emphasis
- **Link-style:** Inline navigation, subtle actions

**Why This Works:**
- Teal = PM ecosystem (trusted, familiar)
- Purple = secondary but still accent (not boring gray)
- Clear visual hierarchy without confusion

---

### Responsive Strategy

**Breakpoint: 768px**

**Desktop (>768px):**
- Asymmetric hero (left-aligned)
- Multi-column product grid
- Full typography scale
- Gold gradient effects visible

**Mobile (≤768px):**
- Centered hero (better readability on small screens)
- Single-column product grid
- Scaled-down typography (still readable)
- Full-width buttons (easier touch targets)
- Gold effects maintained (work on mobile)

**Philosophy:**
- Mobile-first thinking throughout
- Test on actual devices (not just browser resize)
- Accessibility maintained at all sizes
- Performance: minimal CSS, no bloat

---

### What's Ready for Conversation 3 (Kintsugi Polish + Interactions)

**Completed:**
- ✓ Full HTML structure (index.html, play.html)
- ✓ Complete component library (all UI elements styled)
- ✓ Layout system (containers, grid, spacing)
- ✓ Kintsugi aesthetic discovered and implemented
- ✓ Color ratios decided (teal 60%, gold 25%, purple 15%)
- ✓ Asymmetry applied (hero only, purposeful)
- ✓ Responsive foundations built (mobile-first)
- ✓ Dark mode infrastructure (from Conversation 1)

**Needs Polish (Conversation 3):**
- Refine gold seam opacity/placement if needed
- Add smooth scroll behavior
- Enhance hover transitions (make them feel more alive)
- Test dark mode thoroughly (especially gold visibility)
- Visual balance pass (spacing, rhythm, hierarchy)
- Performance check (fonts loading, CSS size)
- Cross-browser testing (Chrome, Safari, Firefox)
- Mobile device testing (real phones/tablets)

**Open Questions for Review:**
1. **Hero name gradient:** Too subtle or just right?
2. **Section seams:** Opacity good at 0.4, or adjust?
3. **Product card gold borders:** Top border vs. left border?
4. **Typography scale:** Comfortable to read at all sizes?
5. **Dark mode gold:** Does it have enough contrast?

---

*Conversation 2 complete: Nov 2, 2025*
*Structure built. Kintsugi aesthetic discovered. Ready for polish.*
