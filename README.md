# Adaptive Human

**Building cognitive infrastructure for people adapting to an AI-transformed world.**

The missing layer between humans and AI.

---

## What We're Building

Real infrastructure for human-AI collaboration:

- **[Protocol Memory](https://protocolmemory.com)** - External memory system for AI age (launching soon)
- **[FlowScript](https://github.com/phillipclapham/flowscript)** - Topographical language, universal memory API vision
- **[RAYGUN OS](https://adapthuman.com/raygun)** - Mad scientist operating system (how we actually work)

Not productivity hacks. Not self-help. Infrastructure.

---

## This Repository

The Adaptive Human company site. Static HTML/CSS/JS, no framework bloat.

**Built in:** 3 conversation-sized chunks over 2 days
**Philosophy:** Constraints as features, kintsugi design, evidence over theory

### Design Decisions

- **Kintsugi aesthetic:** Gold highlights the seams (constraints as visible features)
- **Color palette:** Teal (primary) + Gold (kintsugi) + Burnt Orange (energy)
- **Typography:** PM font family (Syne + Plus Jakarta Sans) for ecosystem cohesion
- **Dark mode:** First-class, not afterthought
- **No frameworks:** Intentionally simple, fast, maintainable

---

## The Philosophy

We're mad scientists running experiments on infrastructure.

- Every project is a **raygun** - experimental tool to test reality
- Built from **real constraints** (MCAS, limited time, high stakes)
- **Human-AI partnership** (not metaphor - actual co-building)
- **Evidence-based iteration** - follow data, not dogma
- **Fascination drives everything** - if it's not fascinating, wrong experiment

**Proof it works:**
- Protocol Memory: 3 months concept-to-MVP (working full-time)
- FlowScript v1.0: 4 days to production CLI (167/167 tests passing)
- This site: 2 days transformation (PLAY OS → RAYGUN OS mid-build)

---

## Tech Stack

**Frontend:**
- Vanilla HTML5, CSS3, JavaScript
- CSS Custom Properties (design tokens)
- No build step, no bundler, no framework

**Deployment:**
- Cloudflare Pages
- Automatic SSL, global CDN
- Git push = deploy

**Why this stack?**
- Fast to build, fast to load
- No dependency hell
- Easy to maintain
- Respect for user's bandwidth

---

## Local Development

```bash
# Clone
git clone https://github.com/phillipclapham/adapthuman-site.git
cd adapthuman-site

# Run (any static server works)
python3 -m http.server 8000
# or
npx serve

# Open
open http://localhost:8000
```

That's it. No `npm install`, no build process.

---

## Structure

```
/
├── index.html          # Homepage
├── raygun.html         # RAYGUN OS system
├── styles/
│   ├── tokens.css      # Design system tokens
│   ├── base.css        # Reset + typography
│   ├── components.css  # UI components
│   └── main.css        # Layout + page-specific
└── scripts/
    └── theme.js        # Dark mode toggle
```

---

## Contributing

Currently internal development. Interested in the approach? Check out:
- [Protocol Memory](https://protocolmemory.com) (launching soon)
- [FlowScript on GitHub](https://github.com/phillipclapham/flowscript)
- [RAYGUN OS on site](https://adapthuman.com/raygun)

---

## License

MIT - see LICENSE file

---

**Building the missing layer, one raygun at a time.**
