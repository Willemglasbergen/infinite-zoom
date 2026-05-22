const SCALES = [
  {
    id: 'human',
    name: 'Human',
    size: '1.7 m',
    exponent: 0,
    unit: 'm',
    image: 'assets/human.png',
    fact: 'The average height of an adult human. All human sensory experiences and measurements originate from this meter-scale baseline.',
    compare: 'Baseline (1.7 meters)',
    offsetY: '50px'
  },
  {
    id: 'ladybug',
    name: 'Ladybug',
    size: '1 cm',
    exponent: -2,
    unit: 'cm',
    image: 'assets/ladybug.png',
    fact: 'A small, insect predator. At this scale, we begin to perceive the complex biological mechanics of tiny creatures.',
    compare: '100 times smaller than a human',
    offsetY: '-10vh'
  },
  {
    id: 'ant',
    name: 'Garden Ant',
    size: '5 mm',
    exponent: -2.3,
    unit: 'mm',
    image: 'assets/ant.png',
    fact: 'Ants show incredible physical strength and social cooperation. They live in a world dominated by micro-terrain and surface tension.',
    compare: '340 times smaller than a human'
  },
  {
    id: 'hair',
    name: 'Human Hair',
    size: '100 μm',
    exponent: -4,
    unit: 'μm',
    image: 'assets/hair.png',
    fact: 'The average width of a single strand of human hair. This represents the absolute limit of normal human visual resolution without microscopy.',
    compare: '17,000 times smaller than a human'
  },
  {
    id: 'bloodcell',
    name: 'Red Blood Cell',
    size: '8 μm',
    exponent: -5.1,
    unit: 'μm',
    image: 'assets/bloodcell.png',
    fact: 'Biconcave discs that carry oxygen through blood vessels. Their unique shape maximizes surface area and flexibility to fit through tiny capillaries.',
    compare: '210,000 times smaller than a human'
  },
  {
    id: 'bacteria',
    name: 'E. Coli Bacteria',
    size: '2 μm',
    exponent: -5.7,
    unit: 'μm',
    image: 'assets/bacteria.png',
    fact: 'Rod-shaped microscopic single-celled organisms. Representing the foundation of cellular life, they are found in diverse environments across Earth.',
    compare: '850,000 times smaller than a human'
  },
  {
    id: 'virus',
    name: 'T4 Bacteriophage',
    size: '100 nm',
    exponent: -7,
    unit: 'nm',
    image: 'assets/virus.png',
    fact: 'A virus that infects bacteria. Resembling a mechanical lunar lander under electron microscopes, it uses physical injection to deliver DNA.',
    compare: '17 million times smaller than a human'
  },
  {
    id: 'dna',
    name: 'DNA Double Helix',
    size: '2.5 nm',
    exponent: -8.6,
    unit: 'nm',
    image: 'assets/dna.png',
    fact: 'The macromolecular blueprint of life. The double-helix structure holds genetic codes, with a width of just a few hydrogen atoms.',
    compare: '680 million times smaller than a human'
  },
  {
    id: 'water',
    name: 'Water Molecule',
    size: '280 pm',
    exponent: -9.55,
    unit: 'pm',
    image: 'assets/water.png',
    fact: 'A single H₂O molecule. Formed by covalent bonds between one oxygen and two hydrogen atoms, it is the solvent required for all terrestrial biology.',
    compare: '6 billion times smaller than a human'
  },
  {
    id: 'atom',
    name: 'Hydrogen Atom',
    size: '100 pm',
    exponent: -10,
    unit: 'pm',
    image: 'assets/atom.png',
    fact: 'The simplest and most abundant chemical element. Its size is determined by the probability density cloud of its single orbiting electron.',
    compare: '17 billion times smaller than a human'
  },
  {
    id: 'proton',
    name: 'Proton',
    size: '0.8 fm',
    exponent: -15,
    unit: 'fm',
    image: 'assets/proton.png',
    fact: 'A subatomic particle residing in the atomic nucleus. It is a composite particle made of three quarks held together by gluon exchanges.',
    compare: '2.1 trillion times smaller than a human'
  },
  {
    id: 'quark',
    name: 'Quark',
    size: '< 1 am',
    exponent: -18,
    unit: 'am',
    image: 'assets/quark.png',
    fact: 'An elementary point-like excitation with no observable internal structure. Quarks are the fundamental building blocks of nuclear matter.',
    compare: '1.7 quadrillion times smaller than a human'
  }
];

class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    this.init();
  }

  resize() {
    this.width = this.canvas.width = this.canvas.clientWidth;
    this.height = this.canvas.height = this.canvas.clientHeight;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < 180; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1000,
        size: Math.random() * 1.5 + 0.5,
        color: this.getRandomColor()
      });
    }
  }

  getRandomColor() {
    const colors = [
      'rgba(0, 255, 255, 0.4)',  // cyan
      'rgba(255, 0, 255, 0.35)', // magenta
      'rgba(0, 255, 128, 0.35)', // neon teal
      'rgba(0, 128, 255, 0.45)', // sapphire blue
      'rgba(255, 200, 0, 0.3)'   // solar gold
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(zoomVelocity) {
    // Map zoomVelocity to speed along the Z axis (plus a base ambient drift)
    const speed = zoomVelocity * 180;
    const ambientSpeed = 0.4;

    for (let p of this.particles) {
      p.z -= speed;
      p.z -= ambientSpeed;

      // Wrap around logic
      if (p.z <= 0) {
        p.z = 1000;
        p.x = (Math.random() - 0.5) * 2000;
        p.y = (Math.random() - 0.5) * 2000;
      } else if (p.z > 1000) {
        p.z = 1;
        p.x = (Math.random() - 0.5) * 2000;
        p.y = (Math.random() - 0.5) * 2000;
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    
    const cx = this.width / 2;
    const cy = this.height / 2;

    for (let p of this.particles) {
      // Perspective projection
      const k = 600 / p.z;
      const px = p.x * k + cx;
      const py = p.y * k + cy;

      if (px >= 0 && px < this.width && py >= 0 && py < this.height) {
        const r = p.size * k;
        // Fade out particles that are extremely close
        const alpha = Math.min(1, (1000 - p.z) / 200) * Math.min(1, p.z / 100);
        ctx.beginPath();
        ctx.arc(px, py, Math.min(r, 5), 0, Math.PI * 2);
        
        // Match color with alpha
        const baseColor = p.color.substring(0, p.color.lastIndexOf(','));
        ctx.fillStyle = `${baseColor}, ${alpha * 0.75})`;
        ctx.fill();
      }
    }
  }
}

class InfiniteZoom extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Zoom state
    this.zoomIndex = 0;       // Current interpolated zoom (0 to 11)
    this.targetZoomIndex = 0; // Target zoom controlled by user
    this.zoomVelocity = 0;    // Tracks index change rate for particle warp speed
    
    // Autopilot state machine
    this.autopilot = false;
    this.autopilotDirection = 1;
    this.autopilotPhase = 'pause';       // 'pause' or 'travel'
    this.autopilotTimeElapsed = 0;       // accumulates ms in current phase
    this.autopilotDuration = 1000;       // ms duration of current phase
    this.autopilotStartIdx = 0;          // starting zoom index for travel phase
    this.autopilotTargetIdx = 0;         // target zoom index for travel/pause phase

    this.isDraggingSlider = false;
    this.touchStartY = 0;
    this.isTouchActive = false;

    // Element references
    this.starfield = null;
    this.animationFrameId = null;

    this.renderTemplate();
  }

  renderTemplate() {
    const style = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #020205;
        overflow: hidden;
        user-select: none;
        --neon-cyan: #00f0ff;
        --neon-magenta: #ff007f;
        --neon-green: #39ff14;
        --neon-orange: #ff5e00;
        --neon-gold: #ffca28;
        --hud-bg: rgba(10, 10, 18, 0.65);
        --hud-border: rgba(255, 255, 255, 0.08);
        --hud-glow: 0 0 25px rgba(0, 240, 255, 0.15);
      }

      /* Container Setup */
      .app-wrapper {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 280px 1fr 340px;
        position: relative;
        z-index: 2;
      }

      #starfield {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      }

      /* Interactive Canvas Viewport */
      .canvas-viewport {
        grid-column: 2 / 3;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        z-index: 1;
        touch-action: none; /* Prevents mobile browser scrolling/pull-to-refresh */
      }

      .scale-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        perspective: 1000px;
      }

      /* Zoom Item Card styles */
      .item-card {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 500px;
        height: 500px;
        max-width: 75vw;
        max-height: 75vh;
        display: flex;
        justify-content: center;
        align-items: center;
        transform-style: preserve-3d;
        pointer-events: none;
        transition: transform 0.05s linear, opacity 0.05s linear;
      }



      .item-card img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 0 35px rgba(0, 240, 255, 0.18));
        
        /* Edge fading: start fading 10% from each border */
        -webkit-mask-image: 
          linear-gradient(to right, transparent, black 10%, black 90%, transparent),
          linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        -webkit-mask-composite: source-in;
        
        mask-image: 
          linear-gradient(to right, transparent, black 10%, black 90%, transparent),
          linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        mask-composite: intersect;
      }

      /* Holographic scanner overlays on the card */
      .scanner-ring {
        position: absolute;
        width: 520px;
        height: 520px;
        max-width: 78vw;
        max-height: 78vh;
        border: 1px dashed rgba(0, 240, 255, 0.25);
        border-radius: 50%;
        animation: rotateRing 25s linear infinite;
        pointer-events: none;
        box-sizing: border-box;
      }

      .scanner-ring::after {
        content: '';
        position: absolute;
        top: -4px;
        left: 50%;
        width: 8px;
        height: 8px;
        background-color: var(--neon-cyan);
        box-shadow: 0 0 8px var(--neon-cyan);
        border-radius: 50%;
      }

      @keyframes rotateRing {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      /* HUD overlays (Glassmorphism panels) */
      .glass-panel {
        background: var(--hud-bg);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid var(--hud-border);
        border-radius: 16px;
        box-shadow: var(--hud-glow), inset 0 0 20px rgba(255, 255, 255, 0.02);
        color: #f5f5fa;
      }

      /* Header Panel (Top-Left) */
      .header-panel {
        position: absolute;
        top: 24px;
        left: 24px;
        padding: 16px 24px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 250px;
      }

      .header-panel h2 {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.1rem;
        font-weight: 800;
        letter-spacing: 2px;
        color: var(--neon-cyan);
        text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
        margin: 0;
      }

      .header-panel .status {
        font-family: 'Share Tech Mono', monospace;
        font-size: 0.75rem;
        letter-spacing: 1px;
        color: rgba(255, 255, 255, 0.6);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .status-pulse {
        width: 6px;
        height: 6px;
        background-color: var(--neon-green);
        border-radius: 50%;
        box-shadow: 0 0 8px var(--neon-green);
        animation: pulse 1.8s infinite;
      }

      .status-pulse.autopilot-pulse {
        background-color: var(--neon-magenta);
        box-shadow: 0 0 8px var(--neon-magenta);
      }

      /* Right Detail Panel */
      .sidebar-right {
        grid-column: 3 / 4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 24px;
        z-index: 5;
        pointer-events: none;
      }

      .detail-card {
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        pointer-events: auto;
        transform: translateY(0);
        transition: transform 0.3s ease;
      }

      .detail-header {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .detail-body {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .expand-chevron {
        display: none;
      }

      .detail-card h3 {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.4rem;
        font-weight: 600;
        color: #ffffff;
        margin: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 12px;
        letter-spacing: 1px;
      }

      .detail-card .metric-info {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .detail-card .metric-label {
        font-family: 'Share Tech Mono', monospace;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.4);
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }

      .detail-card .metric-value {
        font-family: 'Orbitron', sans-serif;
        font-size: 2.2rem;
        font-weight: 800;
        color: var(--neon-cyan);
        text-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
        line-height: 1.1;
      }

      .detail-card .metric-exponent {
        font-family: 'Share Tech Mono', monospace;
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.75);
      }

      .detail-card .description {
        font-size: 0.9rem;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.85);
        margin: 0;
      }

      .detail-card .comparison-box {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 12px;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      /* Left Scale Navigation Track */
      .sidebar-left {
        grid-column: 1 / 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 24px;
        z-index: 5;
      }

      .scale-navigator {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 20px 16px;
        max-height: calc(100vh - 120px);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
      }

      .scale-navigator::-webkit-scrollbar {
        width: 3px;
      }

      .scale-navigator::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease, border-left 0.2s ease;
        border-left: 2px solid transparent;
      }

      .nav-item:hover {
        background-color: rgba(255, 255, 255, 0.04);
      }

      .nav-item.active {
        background-color: rgba(0, 240, 255, 0.06);
        border-left: 2px solid var(--neon-cyan);
      }

      .nav-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transition: transform 0.2s ease, background-color 0.2s ease;
      }

      .nav-item.active .nav-dot {
        background-color: var(--neon-cyan);
        box-shadow: 0 0 8px var(--neon-cyan);
        transform: scale(1.3);
      }

      .nav-info {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .nav-name {
        font-family: 'Orbitron', sans-serif;
        font-size: 0.8rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
      }

      .nav-item.active .nav-name {
        color: #ffffff;
      }

      .nav-size {
        font-family: 'Share Tech Mono', monospace;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.45);
      }

      .nav-item.active .nav-size {
        color: var(--neon-cyan);
      }

      /* Current Zoom Level Readout (Top-Right of main view) */
      .readout-panel {
        position: absolute;
        top: 24px;
        right: 24px;
        padding: 16px 24px;
        z-index: 10;
        text-align: right;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .readout-label {
        font-family: 'Share Tech Mono', monospace;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.4);
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }

      .readout-value {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--neon-gold);
        text-shadow: 0 0 10px rgba(255, 202, 40, 0.4);
      }

      /* Bottom HUD Controls */
      .bottom-controls {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        max-width: 800px;
        padding: 16px 30px;
        z-index: 10;
        display: flex;
        align-items: center;
        gap: 24px;
      }

      /* Play / Pause button & zoom buttons */
      .control-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #ffffff;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        outline: none;
      }

      .control-btn:hover {
        background: rgba(0, 240, 255, 0.15);
        border-color: var(--neon-cyan);
        box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
        transform: scale(1.08);
      }

      .control-btn:active {
        transform: scale(0.95);
      }

      .control-btn.active {
        background: rgba(255, 0, 127, 0.18);
        border-color: var(--neon-magenta);
        color: var(--neon-magenta);
        box-shadow: 0 0 10px rgba(255, 0, 127, 0.4);
      }

      .control-btn svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }

      /* Slider Styling */
      .slider-container {
        flex-grow: 1;
        display: flex;
        align-items: center;
        position: relative;
      }

      .zoom-slider {
        -webkit-appearance: none;
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.12);
        border-radius: 2px;
        outline: none;
        cursor: pointer;
      }

      .zoom-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        border: 2px solid var(--neon-cyan);
        cursor: pointer;
        transition: transform 0.15s ease, background-color 0.15s ease;
      }

      .zoom-slider::-webkit-slider-thumb:hover {
        transform: scale(1.25);
        background: var(--neon-cyan);
        box-shadow: 0 0 12px var(--neon-cyan);
      }

      .slider-ticks {
        position: absolute;
        top: 12px;
        left: 8px;
        right: 8px;
        display: flex;
        justify-content: space-between;
        pointer-events: none;
      }

      .tick {
        width: 1px;
        height: 6px;
        background-color: rgba(255, 255, 255, 0.2);
      }

      .tick.active {
        background-color: var(--neon-cyan);
        box-shadow: 0 0 4px var(--neon-cyan);
        height: 8px;
      }

      /* Instructions / Scroll Tip */
      .scroll-helper {
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Share Tech Mono', monospace;
        font-size: 0.75rem;
        letter-spacing: 1px;
        color: rgba(255, 255, 255, 0.45);
        display: flex;
        align-items: center;
        gap: 6px;
        animation: bobbing 2s infinite ease-in-out;
        pointer-events: none;
      }

      @keyframes bobbing {
        0%, 100% { transform: translate(-50%, 0); }
        50% { transform: translate(-50%, -6px); }
      }

      /* Keyframe animations */
      @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }

      /* Responsive Styling */
      @media (max-width: 960px) {
        .app-wrapper {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
        }

        .canvas-viewport {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100dvh;
          z-index: 1;
        }

        /* Float the Left scale navigator at the top */
        .sidebar-left {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          width: auto;
          z-index: 10;
          padding: 0;
          pointer-events: none;
        }

        .scale-navigator {
          pointer-events: auto;
          flex-direction: row;
          max-height: none;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 6px 12px;
          gap: 10px;
          border-radius: 20px;
          scrollbar-width: none; /* Hide standard scrollbars */
        }
        
        .scale-navigator::-webkit-scrollbar {
          display: none;
        }

        .nav-item {
          flex-direction: row;
          align-items: center;
          padding: 6px 12px;
          border-left: none;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
        }

        .nav-item.active {
          border-left: none;
          border-bottom: 2px solid var(--neon-cyan);
        }

        /* Float the Details card at the bottom (above controls) */
        .sidebar-right {
          position: absolute;
          bottom: 86px;
          left: 16px;
          right: 16px;
          width: auto;
          z-index: 10;
          padding: 0;
          pointer-events: none;
        }

        .detail-card {
          pointer-events: auto;
          padding: 12px 16px;
          gap: 0;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 12px;
          cursor: pointer;
        }

        .detail-card h3 {
          font-size: 1.1rem;
          border-bottom: none;
          padding-bottom: 0;
          margin: 0;
          letter-spacing: 0.5px;
        }

        .detail-card .metric-info {
          flex-direction: row;
          align-items: baseline;
          gap: 8px;
        }

        .detail-card .metric-label {
          display: none; /* Hide label to save space */
        }

        .detail-card .metric-value {
          font-size: 1.2rem;
          text-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
        }

        .detail-card .metric-exponent {
          font-size: 0.8rem;
        }

        .expand-chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--neon-cyan);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .detail-card.expanded .expand-chevron {
          transform: rotate(180deg);
        }

        .detail-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin-top 0.3s ease;
          opacity: 0;
        }

        .detail-card.expanded .detail-body {
          grid-template-rows: 1fr;
          opacity: 1;
          margin-top: 14px;
        }

        .detail-body > div {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .detail-card .description {
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .detail-card .comparison-box {
          padding: 8px 10px;
          font-size: 0.75rem;
        }

        /* Hide desktop panels */
        .header-panel,
        .readout-panel,
        .scroll-helper {
          display: none !important;
        }

        /* Float controls at the very bottom */
        .bottom-controls {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          width: auto;
          max-width: none;
          transform: none;
          padding: 10px 16px;
          z-index: 10;
          gap: 12px;
        }

        .zoom-slider {
          height: 6px; /* Slightly thicker for touch */
        }
        
        .slider-ticks {
          display: none; /* Hide slider ticks on mobile to clean up view */
        }
      }
    `;

    const html = `
      <div class="app-wrapper">
        <!-- Background Canvas -->
        <canvas id="starfield"></canvas>

        <!-- Left Scale Navigator -->
        <aside class="sidebar-left">
          <div class="scale-navigator glass-panel" id="nav-track">
            ${SCALES.map((item, index) => `
              <div class="nav-item ${index === 0 ? 'active' : ''}" data-index="${index}" id="nav-item-${item.id}">
                <div class="nav-dot"></div>
                <div class="nav-info">
                  <span class="nav-name">${item.name}</span>
                  <span class="nav-size">${item.size}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </aside>

        <!-- Central Zooming Viewport -->
        <section class="canvas-viewport" id="viewport-trigger">
          <!-- Floating Status Panels -->
          <div class="header-panel glass-panel">
            <h2>QUANTUM ZOOM</h2>
            <div class="status">
              <div class="status-pulse" id="status-pulse-dot"></div>
              <span id="status-text">HUD SYSTEM ACTIVE</span>
            </div>
          </div>

          <div class="readout-panel glass-panel">
            <span class="readout-label">Zoom Scale</span>
            <span class="readout-value" id="top-readout">1.70 m</span>
          </div>

          <div class="scale-container" id="scale-container">
            ${SCALES.map((item, index) => `
              <div class="item-card" id="card-${item.id}" style="opacity: 0; transform: translate(-50%, -50%) scale(0.01);">
                <div class="scanner-ring"></div>
                <img src="${item.image}" alt="${item.name} scientific illustration" draggable="false">
              </div>
            `).join('')}
          </div>

          <div class="scroll-helper">
            <svg width="12" height="18" viewBox="0 0 24 36" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="7"></rect>
              <line x1="12" y1="6" x2="12" y2="10"></line>
            </svg>
            <span>Scroll Mouse Wheel or Swipe to Zoom</span>
          </div>

          <!-- Bottom Control Bar -->
          <div class="bottom-controls glass-panel">
            <button class="control-btn" id="btn-zoom-out" title="Zoom Out" aria-label="Zoom Out">
              <svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>
            </button>

            <button class="control-btn" id="btn-play" title="Toggle Autopilot" aria-label="Toggle Autopilot">
              <svg viewBox="0 0 24 24" id="play-icon"><path d="M8 5v14l11-7z"/></svg>
            </button>

            <div class="slider-container">
              <input type="range" class="zoom-slider" id="zoom-slider" min="0" max="11" step="0.001" value="0" aria-label="Zoom Progress">
              <div class="slider-ticks">
                ${SCALES.map((_, i) => `<div class="tick ${i === 0 ? 'active' : ''}" id="tick-${i}"></div>`).join('')}
              </div>
            </div>

            <button class="control-btn" id="btn-zoom-in" title="Zoom In" aria-label="Zoom In">
              <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </button>
          </div>
        </section>

        <!-- Right Scientific Details -->
        <aside class="sidebar-right">
          <div class="detail-card glass-panel" id="detail-panel">
            <div class="detail-header" id="detail-header">
              <div class="metric-info">
                <span class="metric-label" id="detail-scale-name">Meters</span>
                <span class="metric-value" id="detail-size">1.7 m</span>
                <span class="metric-exponent" id="detail-exponent">10<sup>0.0</sup> m</span>
              </div>
              <h3 id="detail-title">Human</h3>
              <div class="expand-chevron">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            <div class="detail-body" id="detail-body">
              <div>
                <p class="description" id="detail-desc">
                  The average height of an adult human. All human sensory experiences and measurements originate from this meter-scale baseline.
                </p>
                <div class="comparison-box">
                  <span class="metric-label">Comparative Scale</span>
                  <span id="detail-compare">Baseline (1.7 meters)</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `;

    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      ${html}
    `;
  }

  connectedCallback() {
    this.starfield = new Starfield(this.shadowRoot.getElementById('starfield'));
    this.setupEventListeners();
    this.startAnimationLoop();

    // Handle Window Resizing
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize.bind(this));
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  handleResize() {
    if (this.starfield) {
      this.starfield.resize();
      this.starfield.init();
    }
  }

  setupEventListeners() {
    const viewport = this.shadowRoot.getElementById('viewport-trigger');
    const slider = this.shadowRoot.getElementById('zoom-slider');
    const btnPlay = this.shadowRoot.getElementById('btn-play');
    const btnZoomIn = this.shadowRoot.getElementById('btn-zoom-in');
    const btnZoomOut = this.shadowRoot.getElementById('btn-zoom-out');

    // 1. Mouse Scroll Wheel Event
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      // Turn off autopilot on manual scrolling
      this.setAutopilot(false);

      // Normalize wheel delta across browsers and devices
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 20; // line scroll
      if (e.deltaMode === 2) delta *= 800; // page scroll

      // Apply delta smoothly to target
      this.targetZoomIndex = Math.min(11, Math.max(0, this.targetZoomIndex + delta * 0.0008));
    }, { passive: false });

    // 2. Touch Gestures (Swiping up/down to zoom)
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.touchStartY = e.touches[0].clientY;
        this.isTouchActive = true;
        this.setAutopilot(false);
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (this.isTouchActive && e.touches.length === 1) {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - this.touchStartY;
        this.touchStartY = currentY; // reset step

        // Swiping up zooms in, down zooms out
        this.targetZoomIndex = Math.min(11, Math.max(0, this.targetZoomIndex - deltaY * 0.004));
      }
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
      this.isTouchActive = false;
    }, { passive: true });

    // 3. Slider Interaction
    slider.addEventListener('input', () => {
      this.setAutopilot(false);
      this.targetZoomIndex = parseFloat(slider.value);
    });

    slider.addEventListener('mousedown', () => { this.isDraggingSlider = true; });
    slider.addEventListener('touchstart', () => { this.isDraggingSlider = true; }, { passive: true });
    window.addEventListener('mouseup', () => { this.isDraggingSlider = false; });
    window.addEventListener('touchend', () => { this.isDraggingSlider = false; }, { passive: true });

    // 4. Autopilot Play/Pause
    btnPlay.addEventListener('click', () => {
      this.setAutopilot(!this.autopilot);
    });

    // 5. Manual Zoom Step Buttons (+ / -)
    btnZoomIn.addEventListener('click', () => {
      this.setAutopilot(false);
      this.targetZoomIndex = Math.min(11, Math.floor(this.zoomIndex + 1));
    });

    btnZoomOut.addEventListener('click', () => {
      this.setAutopilot(false);
      this.targetZoomIndex = Math.max(0, Math.ceil(this.zoomIndex - 1));
    });

    // 6. Sidebar Navigation Items Click
    const navItems = this.shadowRoot.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        this.setAutopilot(false);
        const index = parseInt(item.getAttribute('data-index'));
        this.targetZoomIndex = index;
      });
    });

    // 7. Mobile details card toggle expand/collapse
    const detailPanel = this.shadowRoot.getElementById('detail-panel');
    const detailHeader = this.shadowRoot.getElementById('detail-header');
    if (detailHeader && detailPanel) {
      detailHeader.addEventListener('click', () => {
        if (window.innerWidth <= 960) {
          detailPanel.classList.toggle('expanded');
        }
      });
    }
  }

  setAutopilot(state) {
    this.autopilot = state;
    const btnPlay = this.shadowRoot.getElementById('btn-play');
    const pulseDot = this.shadowRoot.getElementById('status-pulse-dot');
    const statusText = this.shadowRoot.getElementById('status-text');

    if (this.autopilot) {
      btnPlay.classList.add('active');
      btnPlay.innerHTML = `<svg viewBox="0 0 24 24" id="pause-icon"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      pulseDot.classList.add('autopilot-pulse');
      statusText.textContent = 'AUTOPILOT ZOOM ACTIVE';
      this.initAutopilotState();
    } else {
      btnPlay.classList.remove('active');
      btnPlay.innerHTML = `<svg viewBox="0 0 24 24" id="play-icon"><path d="M8 5v14l11-7z"/></svg>`;
      pulseDot.classList.remove('autopilot-pulse');
      statusText.textContent = 'HUD SYSTEM ACTIVE';
    }
  }

  initAutopilotState() {
    const Z = this.targetZoomIndex;
    const rounded = Math.round(Z);
    
    // Snapping logic if close to an integer scale
    if (Math.abs(Z - rounded) < 0.05) {
      this.targetZoomIndex = rounded;
      this.autopilotTargetIdx = rounded;
      this.autopilotPhase = 'pause';
      this.autopilotTimeElapsed = 0;
      this.autopilotDuration = 1000; // Pause for 1 second at the start
    } else {
      // Start in travel mode towards the next integer
      this.autopilotPhase = 'travel';
      this.autopilotTimeElapsed = 0;
      this.autopilotStartIdx = Z;
      
      if (this.autopilotDirection === 1) {
        this.autopilotTargetIdx = Math.min(11, Math.floor(Z) + 1);
      } else {
        this.autopilotTargetIdx = Math.max(0, Math.ceil(Z) - 1);
      }
      
      const distance = Math.abs(this.autopilotTargetIdx - this.autopilotStartIdx);
      this.autopilotDuration = 3000 * distance; // 3 seconds for a full transition step
    }
  }

  startAnimationLoop() {
    let lastTime = performance.now();
    
    const animate = (currentTime) => {
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      this.updateState(dt);
      this.drawUI();

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  updateState(dt) {
    // 1. If Autopilot is active, run the timing-based easing state machine
    if (this.autopilot) {
      this.autopilotTimeElapsed += dt;

      if (this.autopilotPhase === 'pause') {
        // Hold the target zoom level at the target index (100% scale)
        this.targetZoomIndex = this.autopilotTargetIdx;

        if (this.autopilotTimeElapsed >= this.autopilotDuration) {
          // Transition from pause to travel
          this.autopilotPhase = 'travel';
          this.autopilotTimeElapsed = 0;
          this.autopilotStartIdx = this.autopilotTargetIdx;

          // Determine next target index based on active direction
          if (this.autopilotDirection === 1) {
            if (this.autopilotStartIdx >= 11) {
              this.autopilotDirection = -1;
              this.autopilotTargetIdx = 10;
            } else {
              this.autopilotTargetIdx = this.autopilotStartIdx + 1;
            }
          } else {
            if (this.autopilotStartIdx <= 0) {
              this.autopilotDirection = 1;
              this.autopilotTargetIdx = 1;
            } else {
              this.autopilotTargetIdx = this.autopilotStartIdx - 1;
            }
          }
          this.autopilotDuration = 3000; // 3 seconds for a full transition step
        }
      } else {
        // Travel phase: easing to 100% scale of the target index
        let t = this.autopilotTimeElapsed / this.autopilotDuration;
        if (t >= 1) {
          t = 1;
          this.targetZoomIndex = this.autopilotTargetIdx;
          
          // Transition from travel to pause (full stop)
          this.autopilotPhase = 'pause';
          this.autopilotTimeElapsed = 0;
          this.autopilotDuration = 1000; // 1 second full-stop pause
        } else {
          // Smooth ease-in-ease-out curve (smoothstep: 3t^2 - 2t^3)
          const ease = t * t * (3 - 2 * t);
          this.targetZoomIndex = this.autopilotStartIdx + (this.autopilotTargetIdx - this.autopilotStartIdx) * ease;
        }
      }
    }

    // 2. Smoothly interpolate zoomIndex towards targetZoomIndex
    const prevZoom = this.zoomIndex;
    const lerpFactor = 0.085; // responsiveness of wheel zoom
    this.zoomIndex += (this.targetZoomIndex - this.zoomIndex) * lerpFactor;
    
    // Check if close enough to snap to avoid infinite small math updates
    if (Math.abs(this.targetZoomIndex - this.zoomIndex) < 0.0001) {
      this.zoomIndex = this.targetZoomIndex;
    }

    // 3. Calculate zoom velocity for background warping
    this.zoomVelocity = this.zoomIndex - prevZoom;

    // 4. Update the starfield particles
    if (this.starfield) {
      this.starfield.update(this.zoomVelocity);
    }
  }

  drawUI() {
    const Z = this.zoomIndex;
    const activeIndex = Math.round(Z);
    const activeItem = SCALES[activeIndex];

    // 1. Render background starfield
    if (this.starfield) {
      this.starfield.draw();
    }

    // 2. Animate and Scale the cards
    SCALES.forEach((item, i) => {
      const card = this.shadowRoot.getElementById(`card-${item.id}`);
      if (!card) return;

      const y = i - Z;
      const absY = Math.abs(y);

      // Fly-through math: current item zooms out and fades completely before next appears
      let scale = 1.0;
      let opacity = 0;
      const W = 0.45; // Transition range half-width (less than 0.5 to prevent visibility overlap)

      if (y > W) {
        scale = 0.02;
        opacity = 0;
      } else if (y >= 0) {
        // Approaching: scale grows from 0.025 to 1.0, fade in from 0 to 1
        const t = (W - y) / W;
        scale = Math.pow(40, t - 1);
        opacity = t * t * (3 - 2 * t);
      } else if (y >= -W) {
        // Flying through: scale grows from 1.0 to 40.0, fade out from 1 to 0
        const u = -y / W;
        scale = Math.pow(40, u);
        opacity = 1 - (u * u * (3 - 2 * u));
      } else {
        // Behind us: invisible
        scale = 40.0;
        opacity = 0;
      }

      if (opacity > 0.001) {
        card.style.display = 'flex';
        card.style.opacity = opacity;
        
        // Position card and apply scale transform. Z-translation adds visual depth.
        let transformStr = `translate(-50%, -50%) scale(${scale}) translateZ(${y * 100}px)`;
        if (item.offsetY) {
          transformStr += ` translate(0, ${item.offsetY})`;
        }
        card.style.transform = transformStr;
      } else {
        card.style.display = 'none';
      }
    });

    // 3. Update top digital readout
    // We interpolate the physical exponent based on the fractional zoom index Z
    let currentPhysExponent = 0;
    const lowerIdx = Math.floor(Z);
    const upperIdx = Math.ceil(Z);
    if (lowerIdx === upperIdx) {
      currentPhysExponent = SCALES[lowerIdx].exponent;
    } else {
      const fraction = Z - lowerIdx;
      const lowerExp = SCALES[lowerIdx].exponent;
      const upperExp = SCALES[upperIdx].exponent;
      currentPhysExponent = lowerExp + fraction * (upperExp - lowerExp);
    }

    const currentMeters = Math.pow(10, currentPhysExponent);
    const topReadout = this.shadowRoot.getElementById('top-readout');
    topReadout.textContent = this.formatSize(currentMeters);

    // 4. Update the bottom slider value
    const slider = this.shadowRoot.getElementById('zoom-slider');
    if (!this.isDraggingSlider) {
      slider.value = Z;
    }

    // 5. Update ticks active state
    for (let i = 0; i < SCALES.length; i++) {
      const tick = this.shadowRoot.getElementById(`tick-${i}`);
      if (tick) {
        if (i <= Z) {
          tick.classList.add('active');
        } else {
          tick.classList.remove('active');
        }
      }
    }

    // 6. Update Left Sidebar Navigation selection
    const navItems = this.shadowRoot.querySelectorAll('.nav-item');
    navItems.forEach((item, idx) => {
      if (idx === activeIndex) {
        item.classList.add('active');
        // Ensure active nav item is visible in scrolling left container (both vertical & horizontal)
        if (idx !== this._lastActiveNavIndex) {
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          this._lastActiveNavIndex = idx;
        }
      } else {
        item.classList.remove('active');
      }
    });

    // 7. Update Right Detail Panel
    if (activeItem && activeIndex !== this._lastActiveDetailIndex) {
      // Auto-collapse details panel on mobile when changing scale
      const detailPanel = this.shadowRoot.getElementById('detail-panel');
      if (detailPanel && window.innerWidth <= 960) {
        detailPanel.classList.remove('expanded');
      }

      const detailTitle = this.shadowRoot.getElementById('detail-title');
      const detailSize = this.shadowRoot.getElementById('detail-size');
      const detailExponent = this.shadowRoot.getElementById('detail-exponent');
      const detailDesc = this.shadowRoot.getElementById('detail-desc');
      const detailCompare = this.shadowRoot.getElementById('detail-compare');
      const detailScaleName = this.shadowRoot.getElementById('detail-scale-name');

      // Update contents
      detailTitle.textContent = activeItem.name;
      detailSize.textContent = activeItem.size;
      detailDesc.textContent = activeItem.fact;
      detailCompare.textContent = activeItem.compare;

      // Format Exponent
      detailExponent.innerHTML = `10<sup>${activeItem.exponent.toFixed(1)}</sup> m`;

      // Update unit label
      const units = {
        'm': 'Meters',
        'cm': 'Centimeters',
        'mm': 'Millimeters',
        'μm': 'Micrometers',
        'nm': 'Nanometers',
        'pm': 'Picometers',
        'fm': 'Femtometers',
        'am': 'Attometers'
      };
      detailScaleName.textContent = units[activeItem.unit] || 'Meters';

      // Small CSS slide-in transition triggers when contents change
      const detailPanel = this.shadowRoot.getElementById('detail-panel');
      detailPanel.style.transform = 'translateY(10px)';
      setTimeout(() => {
        detailPanel.style.transform = 'translateY(0)';
      }, 50);

      this._lastActiveDetailIndex = activeIndex;
    }
  }

  formatSize(meters) {
    if (meters >= 1) return `${meters.toFixed(2)} m`;
    if (meters >= 1e-2) return `${(meters * 1e2).toFixed(2)} cm`;
    if (meters >= 1e-3) return `${(meters * 1e3).toFixed(2)} mm`;
    if (meters >= 1e-6) return `${(meters * 1e6).toFixed(2)} μm`;
    if (meters >= 1e-9) return `${(meters * 1e9).toFixed(2)} nm`;
    if (meters >= 1e-12) return `${(meters * 1e12).toFixed(2)} pm`;
    if (meters >= 1e-15) return `${(meters * 1e15).toFixed(2)} fm`;
    return `${(meters * 1e18).toFixed(2)} am`;
  }
}

customElements.define('infinite-zoom', InfiniteZoom);
