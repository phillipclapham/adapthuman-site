/**
 * Stat Counter Animation
 * Animates stat numbers when founder section scrolls into view
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return; // Skip animations if user prefers reduced motion
  }

  /**
   * Animate a number counting up
   * @param {HTMLElement} element - The element to animate
   * @param {number} target - Target number to count to
   * @param {number} duration - Animation duration in ms
   * @param {string} suffix - Text to append after number (e.g., " months")
   */
  function animateCounter(element, target, duration, suffix = '') {
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentValue = Math.floor(startValue + (target - startValue) * easeProgress);
      element.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Ensure final value is exact
        element.textContent = target + suffix;
      }
    }

    element.classList.add('counting');
    requestAnimationFrame(update);

    // Remove counting class after animation
    setTimeout(() => {
      element.classList.remove('counting');
    }, duration);
  }

  /**
   * Parse stat value and extract number + suffix
   * @param {string} text - The stat text (e.g., "3 months", "167/167", "<1ms")
   * @returns {Object} - {number, suffix}
   */
  function parseStatValue(text) {
    // Handle "X months", "X days" format
    const monthsDaysMatch = text.match(/^(\d+)\s+(months?|days?)$/i);
    if (monthsDaysMatch) {
      return {
        number: parseInt(monthsDaysMatch[1]),
        suffix: ' ' + monthsDaysMatch[2]
      };
    }

    // Handle "X/Y" format (just animate the first number)
    const fractionMatch = text.match(/^(\d+)\/(\d+)$/);
    if (fractionMatch) {
      return {
        number: parseInt(fractionMatch[1]),
        suffix: '/' + fractionMatch[2]
      };
    }

    // Handle pure numbers
    const numberMatch = text.match(/^(\d+)$/);
    if (numberMatch) {
      return {
        number: parseInt(numberMatch[1]),
        suffix: ''
      };
    }

    // Can't parse - return null (will skip animation)
    return null;
  }

  /**
   * Initialize stat counters when section is in view
   */
  function initStatCounters() {
    const founderSection = document.querySelector('.section-founder');
    if (!founderSection) return;

    const statValues = founderSection.querySelectorAll('.stat-value');
    let hasAnimated = false;

    // Store original values
    const originalValues = Array.from(statValues).map(el => el.textContent);

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;

          // Animate each stat with stagger
          statValues.forEach((statElement, index) => {
            const originalValue = originalValues[index];
            const parsed = parseStatValue(originalValue);

            if (parsed) {
              // Stagger animations by 100ms each
              setTimeout(() => {
                animateCounter(statElement, parsed.number, 1200, parsed.suffix);
              }, index * 100);
            }
          });

          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3, // Trigger when 30% of section is visible
      rootMargin: '0px'
    });

    observer.observe(founderSection);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStatCounters);
  } else {
    initStatCounters();
  }

})();
