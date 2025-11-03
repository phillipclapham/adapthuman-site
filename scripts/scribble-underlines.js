/**
 * Scribble Underlines - Hand-drawn SVG underlines
 * Animate on scroll-into-view for section titles
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Generate hand-drawn scribble path
   * Creates organic, slightly irregular line
   */
  function generateScribblePath(width) {
    const height = 6;
    const points = 25; // More points = more organic
    const irregularity = 2.5; // How much the line wobbles

    let path = `M 0,${height / 2}`;

    for (let i = 1; i <= points; i++) {
      const x = (width / points) * i;
      // Add random variation to y position for hand-drawn feel
      const y = height / 2 + (Math.random() - 0.5) * irregularity;
      path += ` L ${x},${y}`;
    }

    return path;
  }

  /**
   * Add scribble underline to element
   */
  function addScribble(element, color = '#D4AF37') {
    // Skip if already has scribble
    if (element.querySelector('.scribble-underline')) return;

    const width = element.offsetWidth;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'scribble-underline');
    svg.setAttribute('width', width);
    svg.setAttribute('height', '6');
    svg.setAttribute('viewBox', `0 0 ${width} 6`);
    svg.setAttribute('preserveAspectRatio', 'none');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', generateScribblePath(width));
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('fill', 'none');

    // Set up animation with stroke-dasharray
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    svg.appendChild(path);
    element.appendChild(svg);

    // Animate on scroll-into-view (unless reduced motion)
    if (!prefersReducedMotion) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Trigger animation
            path.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            path.style.strokeDashoffset = '0';
            observer.unobserve(element);
          }
        });
      }, {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '-50px' // Start slightly before entering viewport
      });

      observer.observe(element);
    } else {
      // No animation, just show the line
      path.style.strokeDashoffset = '0';
    }
  }

  /**
   * Initialize scribbles on page load
   */
  function initScribbles() {
    // Section titles (h2) only - Gold
    document.querySelectorAll('.section-title, h2').forEach(el => {
      addScribble(el, '#D4AF37');
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScribbles);
  } else {
    initScribbles();
  }

  console.log('%c✏️ Scribble underlines active', 'color: #D4AF37; font-weight: bold;');

})();
