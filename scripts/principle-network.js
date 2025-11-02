/**
 * Principle Network - Topological Evidence Board
 * Demonstrates FlowScript's vision: ideas connecting in thought-space
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Get center point of an element
   * @param {HTMLElement} element
   * @returns {Object} {x, y} coordinates
   */
  function getElementCenter(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    return {
      x: rect.left + scrollLeft + rect.width / 2,
      y: rect.top + scrollTop + rect.height / 2
    };
  }

  /**
   * Draw curved SVG line between two points
   * @param {Object} start - {x, y}
   * @param {Object} end - {x, y}
   * @returns {string} SVG path d attribute
   */
  function drawCurvedLine(start, end) {
    // Calculate control points for bezier curve
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    // Create gentle curve
    const curve = Math.min(Math.abs(dx), Math.abs(dy)) * 0.3;

    // Control points offset perpendicular to the line
    const cx1 = start.x + dx * 0.25 - dy * 0.1;
    const cy1 = start.y + dy * 0.25 + dx * 0.1;
    const cx2 = start.x + dx * 0.75 + dy * 0.1;
    const cy2 = start.y + dy * 0.75 - dx * 0.1;

    return `M ${start.x},${start.y} C ${cx1},${cy1} ${cx2},${cy2} ${end.x},${end.y}`;
  }

  /**
   * Draw all connection lines between principles
   */
  function drawConnections() {
    const svg = document.querySelector('.principle-connections');
    if (!svg) return;

    const board = document.querySelector('.principle-board');
    if (!board) return;

    // Clear existing paths
    svg.innerHTML = '';

    // Set SVG viewBox to match board dimensions
    const boardRect = board.getBoundingClientRect();
    svg.setAttribute('width', boardRect.width);
    svg.setAttribute('height', boardRect.height);
    svg.setAttribute('viewBox', `0 0 ${boardRect.width} ${boardRect.height}`);

    // Get all principle cards
    const cards = Array.from(document.querySelectorAll('.principle-card'));

    // Track drawn connections to avoid duplicates
    const drawn = new Set();

    cards.forEach(card => {
      const cardId = card.id.replace('principle-', '');
      const connects = card.dataset.connects ? card.dataset.connects.split(',') : [];

      connects.forEach(targetId => {
        // Create unique key for this connection
        const connectionKey = [cardId, targetId].sort().join('-');

        // Skip if already drawn
        if (drawn.has(connectionKey)) return;
        drawn.add(connectionKey);

        const targetCard = document.getElementById(`principle-${targetId}`);
        if (!targetCard) return;

        // Get center points relative to the board
        const boardPos = board.getBoundingClientRect();
        const startRect = card.getBoundingClientRect();
        const endRect = targetCard.getBoundingClientRect();

        const start = {
          x: startRect.left - boardPos.left + startRect.width / 2,
          y: startRect.top - boardPos.top + startRect.height / 2
        };

        const end = {
          x: endRect.left - boardPos.left + endRect.width / 2,
          y: endRect.top - boardPos.top + endRect.height / 2
        };

        // Create path element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', drawCurvedLine(start, end));
        path.classList.add('connection-line');
        path.dataset.from = cardId;
        path.dataset.to = targetId;

        svg.appendChild(path);
      });
    });
  }

  /**
   * Highlight connections for a specific card
   * @param {string} cardId - ID of the card (without 'principle-' prefix)
   * @param {boolean} highlight - Whether to highlight or unhighlight
   */
  function highlightConnections(cardId, highlight) {
    const card = document.getElementById(`principle-${cardId}`);
    if (!card) return;

    const connects = card.dataset.connects ? card.dataset.connects.split(',') : [];

    // Highlight/unhighlight connection lines
    const lines = document.querySelectorAll('.connection-line');
    lines.forEach(line => {
      const from = line.dataset.from;
      const to = line.dataset.to;

      if (from === cardId || to === cardId) {
        if (highlight) {
          line.classList.add('highlighted');
        } else {
          line.classList.remove('highlighted');
        }
      }
    });

    // Highlight/unhighlight connected cards
    connects.forEach(targetId => {
      const targetCard = document.getElementById(`principle-${targetId}`);
      if (targetCard) {
        if (highlight) {
          targetCard.classList.add('connected');
        } else {
          targetCard.classList.remove('connected');
        }
      }
    });
  }

  /**
   * Handle card hover
   */
  function setupCardInteractions() {
    const cards = document.querySelectorAll('.principle-card');

    cards.forEach(card => {
      const cardId = card.id.replace('principle-', '');

      // Hover to highlight connections
      card.addEventListener('mouseenter', () => {
        if (!prefersReducedMotion) {
          highlightConnections(cardId, true);
        }
      });

      card.addEventListener('mouseleave', () => {
        if (!prefersReducedMotion) {
          highlightConnections(cardId, false);
          // Remove expanded state if not clicked
          if (!card.classList.contains('clicked')) {
            card.classList.remove('expanded');
          }
        }
      });

      // Click to expand/collapse
      card.addEventListener('click', (e) => {
        e.stopPropagation();

        // Toggle expanded state
        const wasExpanded = card.classList.contains('expanded');

        // Remove expanded from all other cards
        cards.forEach(c => {
          c.classList.remove('expanded', 'clicked');
        });

        if (!wasExpanded) {
          card.classList.add('expanded', 'clicked');
          highlightConnections(cardId, true);
        } else {
          card.classList.remove('expanded', 'clicked');
          highlightConnections(cardId, false);
        }
      });
    });

    // Click outside to collapse all
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.principle-card')) {
        cards.forEach(card => {
          card.classList.remove('expanded', 'clicked');
        });

        // Unhighlight all connections
        const lines = document.querySelectorAll('.connection-line');
        lines.forEach(line => line.classList.remove('highlighted'));

        // Unhighlight all connected cards
        cards.forEach(card => card.classList.remove('connected'));
      }
    });
  }

  /**
   * Initialize the principle network
   */
  function init() {
    const board = document.querySelector('.principle-board');
    if (!board) return;

    // Draw initial connections
    drawConnections();

    // Setup interactions
    setupCardInteractions();

    // Redraw connections on window resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        drawConnections();
      }, 250);
    });

    // Redraw after fonts load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setTimeout(drawConnections, 100);
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
