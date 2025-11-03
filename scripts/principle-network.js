/**
 * Principle Network - Topological Evidence Board with Modal
 * Demonstrates FlowScript's vision: ideas connecting in thought-space
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Principle data lookup
  const principleData = {
    'experiments': {
      title: 'Experiments produce breakthroughs',
      subtitle: 'Grinding produces depletion',
      detail: '45 years of evidence: experiments reveal what\'s possible, grinding burns you out. When you approach work as experiments, breakthroughs emerge. When you grind toward outcomes, productivity collapses.',
      connects: ['fascination', 'evidence', 'constraints']
    },
    'constraints': {
      title: 'Constraints become features',
      subtitle: 'Kintsugi philosophy',
      detail: 'Every constraint is a design input. Real constraints force real solutions. The breaks make the piece more valuable, not less. MCAS energy limits forced experimentation. High stakes forced staged validation.',
      connects: ['experiments', 'first-principles', 'staged']
    },
    'evidence': {
      title: 'Evidence over aspiration',
      subtitle: 'No fantasy, only what works',
      detail: 'Track what actually produces results. Build from lived experience, not conventional wisdom. PM built in 3 months proves the method works. FlowScript shipped in 4 days proves rapid iteration works. Test, measure, keep signal.',
      connects: ['experiments', 'public', 'staged']
    },
    'first-principles': {
      title: 'First principles over best practices',
      subtitle: 'Question everything',
      detail: 'Strip assumptions. Ask "why" until hitting bedrock. Build up from fundamentals. "Best practices" are often cargo-culted bullshit. First principles reveal what actually matters.',
      connects: ['constraints', 'partnership', 'fascination']
    },
    'fascination': {
      title: 'Fascination leads, fun follows',
      subtitle: 'Don\'t force it',
      detail: 'Motivation comes FROM playing with the problem-space, not before it. Experiment with what fascinates you. Fun emerges from engagement, not the reverse. This enables partnership brain instead of execution theater.',
      connects: ['experiments', 'first-principles', 'partnership']
    },
    'staged': {
      title: 'Staged validation',
      subtitle: 'High risk tolerance, but gated',
      detail: 'Build toward ambitious vision with validation gates at each stage. Not blind all-in. PM proves execution → FlowScript proves utility → API proves demand → adoption or pivot. Real evidence at each gate.',
      connects: ['constraints', 'evidence', 'public']
    },
    'public': {
      title: 'Build in public',
      subtitle: 'Transparency shows real evidence',
      detail: 'No stealth mode, no polished launch theater. Here\'s what we\'re making, here\'s what works, here\'s what doesn\'t. Public validation is real validation. Sharing evidence builds trust.',
      connects: ['evidence', 'staged', 'partnership']
    },
    'partnership': {
      title: 'Partnership over execution',
      subtitle: 'Third Mind emergence',
      detail: 'True partnership (human-AI, human-human) produces better outcomes than solo execution. Partnership brain maintains depth and honesty. Execution theater optimizes for appearance over truth. This is how Third Mind emerges.',
      connects: ['fascination', 'first-principles', 'public']
    }
  };

  /**
   * Get center point of an element
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
   */
  function drawCurvedLine(start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    // Create gentle curve
    const cx1 = start.x + dx * 0.25 - dy * 0.1;
    const cy1 = start.y + dy * 0.25 + dx * 0.1;
    const cx2 = start.x + dx * 0.75 + dy * 0.1;
    const cy2 = start.y + dy * 0.75 - dx * 0.1;

    return `M ${start.x},${start.y} C ${cx1},${cy1} ${cx2},${cy2} ${end.x},${end.y}`;
  }

  /**
   * Draw all connection lines
   */
  function drawConnections() {
    const svg = document.querySelector('.principle-connections');
    if (!svg) return;

    const board = document.querySelector('.principle-board');
    if (!board) return;

    svg.innerHTML = '';

    const boardRect = board.getBoundingClientRect();
    svg.setAttribute('width', boardRect.width);
    svg.setAttribute('height', boardRect.height);
    svg.setAttribute('viewBox', `0 0 ${boardRect.width} ${boardRect.height}`);

    // Add spectrum gradient definition for connection lines
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'spectrumGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');

    const stops = [
      { offset: '0%', color: '#00a8ab' },    // Teal
      { offset: '33%', color: '#a855f7' },   // Purple
      { offset: '66%', color: '#ec4899' },   // Magenta
      { offset: '100%', color: '#D4AF37' }   // Gold
    ];

    stops.forEach(stop => {
      const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stopElement.setAttribute('offset', stop.offset);
      stopElement.setAttribute('stop-color', stop.color);
      gradient.appendChild(stopElement);
    });

    defs.appendChild(gradient);
    svg.appendChild(defs);

    const cards = Array.from(document.querySelectorAll('.principle-card'));
    const drawn = new Set();

    cards.forEach(card => {
      const cardId = card.id.replace('principle-', '');
      const connects = card.dataset.connects ? card.dataset.connects.split(',') : [];

      connects.forEach(targetId => {
        const connectionKey = [cardId, targetId].sort().join('-');
        if (drawn.has(connectionKey)) return;
        drawn.add(connectionKey);

        const targetCard = document.getElementById(`principle-${targetId}`);
        if (!targetCard) return;

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
   * Highlight connections for a card
   */
  function highlightConnections(cardId, highlight) {
    const card = document.getElementById(`principle-${cardId}`);
    if (!card) return;

    const connects = card.dataset.connects ? card.dataset.connects.split(',') : [];

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
   * Open modal with principle details
   */
  function openModal(principleId) {
    const modal = document.getElementById('principle-modal');
    if (!modal) return;

    const data = principleData[principleId];
    if (!data) return;

    // Populate modal content
    modal.querySelector('.modal-title').textContent = data.title;
    modal.querySelector('.modal-subtitle').textContent = data.subtitle;
    modal.querySelector('.modal-detail').textContent = data.detail;

    // Populate connected principles
    const connectionLinks = modal.querySelector('.connection-links');
    connectionLinks.innerHTML = '';

    data.connects.forEach(connectedId => {
      const connectedData = principleData[connectedId];
      if (!connectedData) return;

      const link = document.createElement('div');
      link.className = 'connection-link';
      link.dataset.principleId = connectedId;

      const title = document.createElement('div');
      title.className = 'connection-link-title';
      title.textContent = connectedData.title;

      link.appendChild(title);
      connectionLinks.appendChild(link);

      // Click to navigate to connected principle
      link.addEventListener('click', () => {
        openModal(connectedId);
      });
    });

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Highlight connections in background
    highlightConnections(principleId, true);
  }

  /**
   * Close modal
   */
  function closeModal() {
    const modal = document.getElementById('principle-modal');
    if (!modal) return;

    modal.style.display = 'none';
    document.body.style.overflow = '';

    // Unhighlight all connections
    const cards = document.querySelectorAll('.principle-card');
    cards.forEach(card => card.classList.remove('connected'));

    const lines = document.querySelectorAll('.connection-line');
    lines.forEach(line => line.classList.remove('highlighted'));
  }

  /**
   * Setup card interactions
   */
  function setupCardInteractions() {
    const cards = document.querySelectorAll('.principle-card');

    cards.forEach(card => {
      const cardId = card.id.replace('principle-', '');

      // Hover: highlight connections only (no expansion)
      card.addEventListener('mouseenter', () => {
        if (!prefersReducedMotion) {
          highlightConnections(cardId, true);
        }
      });

      card.addEventListener('mouseleave', () => {
        if (!prefersReducedMotion) {
          // Don't unhighlight if modal is open for this card
          const modal = document.getElementById('principle-modal');
          if (!modal || modal.style.display === 'none') {
            highlightConnections(cardId, false);
          }
        }
      });

      // Click: open modal
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(cardId);
      });
    });

    // Close modal on backdrop click or close button
    const modal = document.getElementById('principle-modal');
    if (modal) {
      const backdrop = modal.querySelector('.modal-backdrop');
      const closeBtn = modal.querySelector('.modal-close');

      if (backdrop) {
        backdrop.addEventListener('click', closeModal);
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
      }

      // ESC key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
          closeModal();
        }
      });
    }
  }

  /**
   * Initialize
   */
  function init() {
    const board = document.querySelector('.principle-board');
    if (!board) return;

    drawConnections();
    setupCardInteractions();

    // Redraw on resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(drawConnections, 250);
    });

    // Redraw after fonts load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setTimeout(drawConnections, 100);
      });
    }
  }

  // Initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
