/**
 * Scroll Reveals - Intersection Observer based reveal animations
 * Sections fade/slide up, cards stagger in sequence
 * Respects reduced motion preference
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Configuration
  const observerOptions = {
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: '0px 0px -50px 0px' // Start slightly before entering viewport
  };

  /**
   * Initialize reveal observer
   */
  function initScrollReveals() {
    // Elements to reveal
    const sections = document.querySelectorAll('.section, .page-content .content-section');
    const cards = document.querySelectorAll('.product-card, .principle-card, .connect-item, .principle, .cta-box');
    const heroContent = document.querySelector('.hero-content, .page-hero');

    // Add reveal class to elements
    sections.forEach(el => el.classList.add('reveal-section'));
    cards.forEach(el => el.classList.add('reveal-card'));
    if (heroContent) heroContent.classList.add('reveal-hero');

    // Intersection Observer callback
    const revealOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add revealed class
          entry.target.classList.add('revealed');

          // If it's a container with cards, stagger them
          if (entry.target.classList.contains('section') ||
              entry.target.classList.contains('content-section')) {
            staggerCards(entry.target);
          }

          // Stop observing this element (one-time reveal)
          observer.unobserve(entry.target);
        }
      });
    };

    // Create observer
    const observer = new IntersectionObserver(revealOnScroll, observerOptions);

    // Observe all elements
    sections.forEach(el => observer.observe(el));
    cards.forEach(el => observer.observe(el));
    if (heroContent) observer.observe(heroContent);
  }

  /**
   * Stagger cards within a container
   */
  function staggerCards(container) {
    const cards = container.querySelectorAll('.reveal-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('revealed');
      }, index * 80); // 80ms stagger between cards
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveals);
  } else {
    initScrollReveals();
  }

  console.log('%c✨ Scroll reveals active', 'color: #00a8ab; font-weight: bold;');

})();
