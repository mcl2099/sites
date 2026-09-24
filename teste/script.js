/**
 * ARTHUR VANE • STUDIO DE DIREÇÃO DE ARTE & ARQUITETURA SEMIÓTICA
 * Interactive Logic & Semiotic Laboratory Canvas
 * Built under Impeccable Craft Floor Standards
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorReticle();
  initSemioticCompass();
  initProjectInspector();
  initInquiryForm();
  initScrollReveals();
});

/* --------------------------------------------------------------------------
   1. The Semiotic Eye (Magnetic Reticle Cursor)
   -------------------------------------------------------------------------- */
function initCursorReticle() {
  const reticle = document.querySelector('.cursor-reticle');
  if (!reticle || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    // Smooth spring physics interpolation
    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;

    reticle.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Expand over interactive targets
  const interactives = document.querySelectorAll('a, button, input, select, textarea, .triad-tab, .semiotic-sigil-center, .artifact-card');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => reticle.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => reticle.classList.remove('is-hovering'));
  });
}

/* --------------------------------------------------------------------------
   2. The Semiotic Compass (Interactive Canvas & Triad Physics)
   -------------------------------------------------------------------------- */
function initSemioticCompass() {
  const canvas = document.getElementById('compassCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let currentMode = 'icon'; // 'icon' | 'index' | 'symbol'
  let angle = 0;
  let mousePos = { x: 0.5, y: 0.5 };
  let isHovered = false;

  // Resize canvas according to display density
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = (e.clientX - rect.left) / rect.width;
    mousePos.y = (e.clientY - rect.top) / rect.height;
    isHovered = true;
  });

  canvas.addEventListener('mouseleave', () => {
    isHovered = false;
    mousePos.x = 0.5;
    mousePos.y = 0.5;
  });

  // Triad Tabs switching
  const tabs = document.querySelectorAll('.triad-tab');
  const telemetryMode = document.getElementById('telemetryMode');
  const telemetryCoords = document.getElementById('telemetryCoords');
  const telemetryResonance = document.getElementById('telemetryResonance');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      currentMode = tab.getAttribute('data-mode');

      if (telemetryMode) {
        telemetryMode.textContent = `PRISMA: ${currentMode.toUpperCase()}`;
      }
      if (telemetryResonance) {
        if (currentMode === 'icon') telemetryResonance.textContent = 'PROPORÇÃO: Φ 1.618033';
        if (currentMode === 'index') telemetryResonance.textContent = 'TENSÃO: Δ 0.984 HÁPTICO';
        if (currentMode === 'symbol') telemetryResonance.textContent = 'PERTENCIMENTO: 99.4% ARQUÉTIPO';
      }
    });
  });

  // Animation Loop
  function draw() {
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Subtle background matrix dots
    ctx.fillStyle = 'rgba(212, 175, 55, 0.12)';
    const spacing = 32;
    for (let x = spacing; x < width; x += spacing) {
      for (let y = spacing; y < height; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    angle += 0.008;

    if (currentMode === 'icon') {
      // THE ICON: Pure Geometry, Golden Ratio Spiral & Harmonic Grids
      drawGoldenSpiral(ctx, centerX, centerY, width * 0.42, angle);
      drawSacredGrid(ctx, centerX, centerY, width * 0.45);
    } else if (currentMode === 'index') {
      // THE INDEX: Vector Causality, Dynamic Mouse Attraction & Touch Traces
      drawVectorTension(ctx, centerX, centerY, width, height, mousePos, angle);
    } else if (currentMode === 'symbol') {
      // THE SYMBOL: Archetypal Mandalas, Collective Sigil & Belonging Seal
      drawSymbolicMandala(ctx, centerX, centerY, width * 0.44, angle);
    }

    if (telemetryCoords) {
      telemetryCoords.textContent = `VETOR: [${(mousePos.x * 100).toFixed(1)}, ${(mousePos.y * 100).toFixed(1)}]`;
    }

    requestAnimationFrame(draw);
  }

  // --- DRAWING MODES ---
  function drawGoldenSpiral(ctx, cx, cy, radius, rot) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot * 0.3);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();

    // Logarithmic Golden Spiral (r = a * e^(b*theta))
    const a = 1.4;
    const b = 0.30635; // Golden spiral factor
    for (let theta = 0; theta < Math.PI * 6; theta += 0.05) {
      const r = a * Math.exp(b * theta);
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      if (theta === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Concentric Golden Proportional Circles
    const phi = 1.61803398875;
    let currentR = radius;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.arc(0, 0, currentR, 0, Math.PI * 2);
      ctx.strokeStyle = i === 0 ? 'rgba(212, 175, 55, 0.45)' : 'rgba(247, 245, 238, 0.15)';
      ctx.stroke();
      currentR /= phi;
    }

    ctx.restore();
  }

  function drawSacredGrid(ctx, cx, cy, size) {
    ctx.save();
    ctx.strokeStyle = 'rgba(247, 245, 238, 0.12)';
    ctx.lineWidth = 1;

    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(cx - size, cy);
    ctx.lineTo(cx + size, cy);
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx, cy + size);
    ctx.stroke();

    // Diagonals
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.7, cy - size * 0.7);
    ctx.lineTo(cx + size * 0.7, cy + size * 0.7);
    ctx.moveTo(cx + size * 0.7, cy - size * 0.7);
    ctx.lineTo(cx - size * 0.7, cy + size * 0.7);
    ctx.stroke();

    ctx.restore();
  }

  function drawVectorTension(ctx, cx, cy, width, height, mPos, rot) {
    const targetX = mPos.x * width;
    const targetY = mPos.y * height;

    // Outer anchor nodes connecting to pointer target
    const nodeCount = 12;
    const radius = Math.min(width, height) * 0.38;

    for (let i = 0; i < nodeCount; i++) {
      const nodeAngle = (i / nodeCount) * Math.PI * 2 + rot * 0.5;
      const nx = cx + Math.cos(nodeAngle) * radius;
      const ny = cy + Math.sin(nodeAngle) * radius;

      // Tension vector line
      const dist = Math.hypot(targetX - nx, targetY - ny);
      const alpha = Math.max(0.08, 1 - dist / (width * 0.75));

      ctx.beginPath();
      ctx.moveTo(nx, ny);
      ctx.lineTo(targetX, targetY);
      ctx.strokeStyle = `rgba(212, 175, 55, ${alpha * 0.6})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Node point
      ctx.beginPath();
      ctx.arc(nx, ny, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(247, 245, 238, 0.75)';
      ctx.fill();
    }

    // Dynamic central causality ring
    ctx.beginPath();
    ctx.arc(targetX, targetY, 18, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.9)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(targetX, targetY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#D4AF37';
    ctx.fill();
  }

  function drawSymbolicMandala(ctx, cx, cy, radius, rot) {
    ctx.save();
    ctx.translate(cx, cy);

    // Sacred Triad (Trinity of Belonging)
    for (let t = 0; t < 3; t++) {
      ctx.save();
      ctx.rotate((t * Math.PI * 2) / 3 + rot * 0.2);

      // Petal arc
      ctx.beginPath();
      ctx.ellipse(0, radius * 0.35, radius * 0.25, radius * 0.45, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
    }

    // Concentric Square of Stability (Quadratura)
    ctx.save();
    ctx.rotate(-rot * 0.4);
    ctx.strokeStyle = 'rgba(247, 245, 238, 0.25)';
    ctx.lineWidth = 1;
    const side = radius * 0.9;
    ctx.strokeRect(-side / 2, -side / 2, side, side);
    ctx.restore();

    // Central Totality Circle
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#E7CF8F';
    ctx.fill();

    ctx.restore();
  }

  requestAnimationFrame(draw);
}

/* --------------------------------------------------------------------------
   3. Semiotic Layer Inspector (Deep Dive Drawer / Modal)
   -------------------------------------------------------------------------- */
const PROJECT_LAYERS = {
  aether: {
    title: "Aether Intelligence OS",
    semantic: "Decodificação de IA como ecossistema biológico consciente, afastando-se do visual estéril de computação em nuvem.",
    syntax: "Grids fractais em base 8px, paleta obsidiana com luminescência orgânica e tipografia com alto contraste entre monumental e instrumental.",
    pragmatics: "Cientistas e pesquisadores sentem respeito intelectual, eliminando a frustração de interfaces infantilizadas e gerando pertencimento imediato."
  },
  kallos: {
    title: "Kallos Monetary Archive",
    semantic: "O ouro físico e ativos soberanos representados como monumentos de imutabilidade diante da volatilidade digital efêmera.",
    syntax: "Tipografia monumental lapidar com proporções clássicas romanas, arquitetura de dados sem sombras falsas e alinhamentos milimétricos.",
    pragmatics: "Investidores de alta renda sentem o peso, a autoridade e a solidez patrimonial de séculos em frações de segundo."
  },
  templo: {
    title: "Templo Sanctuary",
    semantic: "O refúgio mental como santuário sagrado contra o ruído e a hiperestimulação predatória das redes sociais.",
    syntax: "Tons de argila e pedra crua, microinterações que desaceleram o ritmo respiratório do usuário e ausência total de notificações intrusivas.",
    pragmatics: "A comunidade de usuários encontra um espaço de cura e silêncio visual, construindo lealdade orgânica inegociável."
  },
  chronos: {
    title: "Chronos Horology",
    semantic: "A honra à micro-mecânica e ao tempo humano medido através de complicações relojoeiras autênticas.",
    syntax: "Renderização vetorial com física de engrenagens de precisão, leitura analógica recontextualizada e tipografia técnica de manufatura suíça.",
    pragmatics: "Colecionadores sentem que o espaço digital faz jus à obsessão artesanal das peças físicas mais raras do mundo."
  }
};

function initProjectInspector() {
  const inspectButtons = document.querySelectorAll('[data-inspect]');
  const modal = document.getElementById('inspectorModal');
  if (!modal) return;

  const modalClose = modal.querySelector('.modal-close');
  const modalBackdrop = modal.querySelector('.modal-backdrop');
  const modalTitle = document.getElementById('inspectTitle');
  const inspectSemantic = document.getElementById('inspectSemantic');
  const inspectSyntax = document.getElementById('inspectSyntax');
  const inspectPragmatics = document.getElementById('inspectPragmatics');

  inspectButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-inspect');
      const data = PROJECT_LAYERS[projKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      inspectSemantic.textContent = data.semantic;
      inspectSyntax.textContent = data.syntax;
      inspectPragmatics.textContent = data.pragmatics;

      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   4. Altar de Iniciação (Inquiry Terminal)
   -------------------------------------------------------------------------- */
function initInquiryForm() {
  const form = document.getElementById('inquiryForm');
  const feedback = document.getElementById('formFeedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('clientName');
    const emailInput = document.getElementById('clientEmail');
    const intentInput = document.getElementById('clientIntent');

    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      alert('Por favor, preencha seu nome e e-mail de contato.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Consagrando Aliança...';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (feedback) {
        feedback.style.display = 'block';
        feedback.innerHTML = `<strong>Inscrição Recebida.</strong><br>Sua visão de projeto foi gravada em nossos registros. Entraremos em contato em até 24h para iniciar o protocolo semiótico.`;
      }
    }, 900);
  });
}

/* --------------------------------------------------------------------------
   5. Scroll Reveals (Lightweight GPU-accelerated Observer)
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => observer.observe(el));
}
