/**
 * Experiment Orbs - Click Effect System
 * Spawns spectrum gradient orbs on click that expand and fade
 * Mad scientist lab energy visualization
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Configuration
  const MAX_ORBS = 12; // Max concurrent orbs (4 sets of 3)
  const ORBS_PER_CLICK = 3; // Orbs spawned per click
  const SPAWN_DELAY = 80; // ms between each orb in a set
  const ORB_DURATION = 800; // ms animation duration (matches CSS)

  let activeOrbs = [];

  // Section color mapping
  const sectionColors = {
    hero: {
      primary: '#D4AF37', // Gold (kintsugi cracks forming)
      secondary: '#D4AF37',
      tertiary: '#C9A961'
    },
    'building-rayguns': {
      primary: '#E67E22', // Burnt orange (raygun blast)
      secondary: '#E67E22',
      tertiary: '#F39C12'
    },
    products: {
      primary: '#00a8ab', // Teal (PM brand)
      secondary: '#00a8ab',
      tertiary: '#006b6d'
    },
    founder: {
      primary: '#A855F7', // Purple (spectrum energy)
      secondary: '#A855F7',
      tertiary: '#9333EA'
    },
    connect: {
      primary: '#00a8ab', // Teal
      secondary: '#00a8ab',
      tertiary: '#D4AF37'  // Gold accent
    },
    default: {
      primary: '#00a8ab', // Teal (fallback)
      secondary: '#00a8ab',
      tertiary: '#D4AF37'  // Gold
    }
  };

  /**
   * Get section colors based on click target
   */
  function getSectionColor(target) {
    // Find closest section
    const section = target.closest('section');
    if (!section) return sectionColors.default;

    // Check for hero class
    if (section.classList.contains('hero')) {
      return sectionColors.hero;
    }

    // Check section ID
    const sectionId = section.id;
    return sectionColors[sectionId] || sectionColors.default;
  }

  /**
   * Create a single orb element
   */
  function createOrb(x, y, colors) {
    // Don't spawn if we're at max capacity
    if (activeOrbs.length >= MAX_ORBS) {
      // Remove oldest orb to make room
      const oldestOrb = activeOrbs.shift();
      if (oldestOrb && oldestOrb.parentNode) {
        oldestOrb.remove();
      }
    }

    const orb = document.createElement('div');
    orb.className = 'experiment-orb';
    orb.style.left = x + 'px';
    orb.style.top = y + 'px';

    // Set colors via CSS custom properties
    // Light mode: very subtle gradient
    // Dark mode: richer multi-color gradient
    orb.style.setProperty('--orb-color', colors.primary);
    orb.style.setProperty('--orb-color-secondary', colors.secondary + '30'); // 30 = ~19% opacity
    orb.style.setProperty('--orb-color-tertiary', colors.tertiary + '20'); // 20 = ~12% opacity

    document.body.appendChild(orb);
    activeOrbs.push(orb);

    // Cleanup after animation completes (800ms duration)
    setTimeout(() => {
      orb.remove();
      activeOrbs = activeOrbs.filter(o => o !== orb);
    }, 800);
  }

  /**
   * Spawn a set of orbs with staggered timing
   */
  function spawnOrbSet(x, y, colors) {
    for (let i = 0; i < ORBS_PER_CLICK; i++) {
      setTimeout(() => {
        // Slight random offset for organic feel
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        createOrb(x + offsetX, y + offsetY, colors);
      }, i * SPAWN_DELAY);
    }
  }

  /**
   * Handle click events
   */
  function handleClick(e) {
    // Don't spawn orbs on interactive elements (buttons, links, inputs)
    if (e.target.matches('button, a, input, textarea, select')) {
      return;
    }

    const colors = getSectionColor(e.target);
    spawnOrbSet(e.clientX, e.clientY, colors);

    // Track stats for ah.lab() console command
    if (!window.labStats) window.labStats = {};
    window.labStats.clicks = (window.labStats.clicks || 0) + 1;
    window.labStats.orbs = (window.labStats.orbs || 0) + ORBS_PER_CLICK;
  }

  /**
   * Handle touch events for mobile
   */
  function handleTouch(e) {
    // Don't spawn on interactive elements
    if (e.target.matches('button, a, input, textarea, select')) {
      return;
    }

    // Use first touch point
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      const colors = getSectionColor(e.target);
      spawnOrbSet(touch.clientX, touch.clientY, colors);
    }
  }

  // Initialize
  document.addEventListener('click', handleClick);
  document.addEventListener('touchstart', handleTouch, { passive: true });

  console.log('%c✨ Experiment Orbs active', 'color: #D4AF37; font-weight: bold;');

})();
