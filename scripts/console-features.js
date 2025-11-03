/**
 * Console Features - Easter Egg Commands
 * Hidden console interface for Adaptive Human
 */

(function() {
  'use strict';

  // Experiment quotes for ah.experiment()
  const experimentQuotes = [
    "Fascination leads, fun follows.",
    "Build rayguns, not monuments.",
    "Constraints become features.",
    "Evidence over aspiration.",
    "Experiments produce breakthroughs, grinding produces depletion.",
    "Mad scientist: obsessed + detached, simultaneously.",
    "First principles over best practices.",
    "Partnership over execution.",
    "The cracks are where the light gets in.",
    "Build from constraints, discover what works."
  ];

  // Initialize lab stats tracking
  if (!window.labStats) {
    window.labStats = {
      pageLoadTime: Date.now(),
      clicks: 0,
      orbs: 0
    };
  }

  // Track scroll depth
  let maxScrollDepth = 0;
  window.addEventListener('scroll', () => {
    const currentDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (currentDepth > maxScrollDepth) {
      maxScrollDepth = currentDepth;
    }
  });

  // Global ah object
  window.ah = {

    help: function() {
      console.log(`
    ╔═══════════════════════════════════════════╗
    ║        ADAPTIVE HUMAN LAB CONSOLE         ║
    ╚═══════════════════════════════════════════╝

    Available commands:

    ah.help()          - Show this message
    ah.experiment()    - Random experiment quote
    ah.raygun()        - ASCII raygun
    ah.kintsugi()      - Constraint → feature examples
    ah.madscientist()  - Toggle Mad Scientist Mode (Phase 3)
    ah.lab()           - Lab statistics

    Building cognitive infrastructure for the AI age.
    https://adapthuman.com
      `);
      return '✨ Ready to experiment';
    },

    experiment: function() {
      const quote = experimentQuotes[Math.floor(Math.random() * experimentQuotes.length)];
      console.log(`%c"${quote}"`, 'font-size: 16px; font-style: italic; color: #D4AF37;');
      return quote;
    },

    raygun: function() {
      console.log(`%c
         ╔════════════════════╗
         ║   RAYGUN OS v1.0   ║
         ╚════════════════════╝
              ║  ║  ║  ║
              ║  ║  ║  ║
         ═════╬══╬══╬══╬═════════>
              ║  ║  ║  ║
              ║  ║  ║  ║
         ═════╩══╩══╩══╩═════════>

    Every project is a raygun.
    Build it. Test reality.
      `, 'font-family: monospace; color: #E67E22;');
      return '🔫 RAYGUN OS loaded';
    },

    kintsugi: function() {
      console.log(`%c
    ╔═══════════════════════════════════════════════════════╗
    ║  KINTSUGI: Constraints → Features                     ║
    ╚═══════════════════════════════════════════════════════╝

    Real examples from our lab:

    • MCAS energy limits
      → Forced experimentation over grinding
      → Built PM in 3 months (would take years grinding)

    • 2-3 year timeline
      → Staged validation, no waste
      → Every experiment must produce evidence

    • No VC funding
      → Build for users, not investors
      → Real constraints = real solutions

    • High cognitive load
      → Tools that reduce friction
      → FlowScript: <1ms queries, zero cognitive overhead

    • Visibility needs
      → Build in public, share evidence
      → This site built in 2 days, refined through use

    The cracks are where the light gets in.
    Gold highlights the repair, not the break.
      `, 'color: #D4AF37;');
      return '✨ Constraints are features';
    },

    madscientist: function() {
      console.log('%c🧪 Mad Scientist Mode will be available in Phase 3', 'color: #A855F7; font-weight: bold;');
      console.log('%cStay tuned for visual chaos...', 'color: #666; font-style: italic;');
      return 'Coming soon in Phase 3';
    },

    lab: function() {
      const now = Date.now();
      const timeOnPage = Math.round((now - window.labStats.pageLoadTime) / 1000);
      const minutes = Math.floor(timeOnPage / 60);
      const seconds = timeOnPage % 60;

      const stats = {
        'Time on page': `${minutes}m ${seconds}s`,
        'Max scroll depth': `${maxScrollDepth}%`,
        'Clicks tracked': window.labStats.clicks || 0,
        'Orbs spawned': window.labStats.orbs || 0,
        'Experiments run': experimentQuotes.length,
        'Lab status': '🧪 Active'
      };

      console.log('%c═══ LAB STATISTICS ═══', 'font-weight: bold; font-size: 14px; color: #00a8ab;');
      console.table(stats);
      console.log('%cKeep experimenting 🔬', 'color: #D4AF37; font-style: italic;');

      return stats;
    }
  };

  // Welcome message on console open
  console.log(
    '%cWelcome to the Adaptive Human Lab',
    'font-size: 20px; font-weight: bold; color: #00a8ab; text-shadow: 0 0 10px rgba(0, 168, 171, 0.3);'
  );
  console.log(
    '%cType ah.help() for available commands',
    'font-size: 14px; color: #D4AF37;'
  );
  console.log(
    '%c✨ Building cognitive infrastructure for the AI age',
    'font-size: 12px; color: #666; font-style: italic;'
  );

})();
