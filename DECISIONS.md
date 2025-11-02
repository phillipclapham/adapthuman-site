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
- Base: 14px ’ 16px at 768px
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

**Pattern:** Plan ’ Execute chunk ’ Document ’ Checkpoint commit ’ Clear ’ Next

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
