/**
 * Raygun Laser Divider Animation
 * Fires on page load (stays visible as divider)
 * Retracts + refires on theme toggle with new color
 * Respects prefers-reduced-motion and accessibility
 */

(function() {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return; // Exit early - CSS will hide elements
  }

  // Elements
  const raygunImage = document.querySelector('.raygun-image');
  const laserBeamDivider = document.querySelector('.laser-beam-divider');
  const beamFan = document.querySelector('.laser-beam-fan');
  const brainTarget = document.querySelector('.brain-target');
  const brainContainer = document.querySelector('.brain-target-container');
  const themeToggle = document.getElementById('theme-toggle');

  if (!raygunImage || !laserBeamDivider || !beamFan || !brainTarget || !brainContainer) {
    console.warn('Raygun elements not found');
    return;
  }

  // Fade in raygun once image loads (prevents flip flash)
  if (raygunImage.complete) {
    raygunImage.classList.add('loaded');
  } else {
    raygunImage.addEventListener('load', () => {
      raygunImage.classList.add('loaded');
    });
  }

  // Fade in brain once image loads
  if (brainTarget.complete) {
    brainTarget.classList.add('loaded');
  } else {
    brainTarget.addEventListener('load', () => {
      brainTarget.classList.add('loaded');
    });
  }

  let beamFired = false;
  let brainActivated = false;

  /**
   * Update gradient reference based on theme
   */
  function updateBeamGradient() {
    const isDark = document.body.classList.contains('dark-mode');
    const gradientId = isDark ? 'beamGradientDark' : 'beamGradientLight';
    beamFan.setAttribute('fill', `url(#${gradientId})`);
  }

  /**
   * Fire the laser beam - stays visible as divider
   */
  function fireLaser() {
    // Ensure correct gradient for current theme
    updateBeamGradient();

    // Charge-up phase: raygun glows (skip on mobile to prevent Chrome artifacts)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) {
      raygunImage.classList.add('charging');
    }

    // Fire phase: beam fan fires
    setTimeout(() => {
      beamFan.classList.add('firing');
      beamFired = true;

      // Remove charging glow after beam fires
      setTimeout(() => {
        raygunImage.classList.remove('charging');
      }, 200);

      // Brain activation - triggered as beam nears completion
      setTimeout(() => {
        activateBrain();
      }, 700);

      // Transition to visible state - add visible before removing firing
      setTimeout(() => {
        beamFan.classList.add('visible');
        beamFan.classList.remove('firing');
      }, 1000);
    }, 300);
  }

  /**
   * Activate the brain target - glow and grow (always animate, even on re-activation)
   */
  function activateBrain() {
    console.log('🧠 activateBrain() called');

    // Always run activation animation, even if already activated
    // Remove any existing classes first for clean re-trigger
    brainTarget.classList.remove('activated', 'active');
    brainContainer.classList.remove('bursting');

    // Force reflow to restart animation
    void brainTarget.offsetWidth;

    // Trigger activation animation
    brainTarget.classList.add('activated');
    brainContainer.classList.add('bursting');
    brainActivated = true;
    console.log('🧠 Brain activated, classes:', brainTarget.classList.toString());

    // After activation animation, switch to sustained pulse
    setTimeout(() => {
      brainTarget.classList.remove('activated');
      brainTarget.classList.add('active');
      console.log('🧠 Brain now active (breathing), classes:', brainTarget.classList.toString());
    }, 800);

    // Remove burst class after animation completes
    setTimeout(() => {
      brainContainer.classList.remove('bursting');
    }, 1400);
  }

  /**
   * Deactivate brain (for theme toggle retract)
   */
  function deactivateBrain() {
    brainTarget.classList.remove('active');
    brainTarget.classList.remove('activated');
    brainContainer.classList.remove('bursting');
  }

  /**
   * Retract and refire laser (theme toggle behavior)
   */
  function retractAndRefire() {
    if (!beamFired) return; // Only retract if beam is already visible

    // Dim brain during retract
    deactivateBrain();

    // Remove visible class, add retracting
    beamFan.classList.remove('visible');
    beamFan.classList.add('retracting');

    setTimeout(() => {
      beamFan.classList.remove('retracting');

      // Fire again with new theme gradient (brain will reactivate with new colors)
      setTimeout(() => {
        fireLaser();
      }, 100);
    }, 600);
  }

  /**
   * Fire laser on page load
   */
  function fireOnPageLoad() {
    // Wait for page to settle, then fire
    setTimeout(() => {
      fireLaser();
    }, 500);
  }

  /**
   * Retract + refire on theme toggle
   */
  function setupThemeToggle() {
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
      // Small delay to let theme transition start
      setTimeout(() => {
        retractAndRefire();
      }, 150);
    });
  }

  /**
   * Brain click interaction - synaptic burst (desktop) or overcharge (mobile)
   */
  function setupBrainClick() {
    console.log('🖱️ setupBrainClick() called');
    console.log('🖱️ brainTarget:', brainTarget);
    console.log('🖱️ brainContainer:', brainContainer);

    if (!brainTarget || !brainContainer) {
      console.error('❌ Brain elements not found!');
      return;
    }

    let isAnimating = false; // Debounce flag

    brainTarget.addEventListener('click', () => {
      console.log('👆 Brain clicked!');
      console.log('👆 isAnimating:', isAnimating, 'brainActivated:', brainActivated);

      if (isAnimating || !brainActivated) {
        console.log('❌ Click rejected - isAnimating:', isAnimating, 'brainActivated:', brainActivated);
        return; // Only works after brain is activated
      }

      isAnimating = true;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      console.log('📱 isMobile:', isMobile);

      if (isMobile) {
        // Mobile: Overcharge effect
        console.log('⚡ Mobile overcharge starting');
        brainTarget.classList.add('overcharged');
        console.log('⚡ Classes after overcharge:', brainTarget.classList.toString());
        setTimeout(() => {
          brainTarget.classList.remove('overcharged');
          isAnimating = false;
        }, 4000);
      } else {
        // Desktop: Synaptic burst effect
        console.log('💥 Desktop synaptic burst starting');
        brainContainer.classList.add('synaptic-firing');
        console.log('💥 Container classes:', brainContainer.classList.toString());
        setTimeout(() => {
          brainContainer.classList.remove('synaptic-firing');
          isAnimating = false;
          console.log('💥 Synaptic burst complete');
        }, 1500); // 800ms synapses + 700ms to see it
      }
    });

    console.log('✅ Click listener attached');
  }

  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      fireOnPageLoad();
      setupThemeToggle();
      setupBrainClick();
    });
  } else {
    // DOM already loaded
    fireOnPageLoad();
    setupThemeToggle();
    setupBrainClick();
  }

})();
