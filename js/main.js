/**
 * PlayViral — main.js
 * Experiência Digital Interativa & Microinterações Editoriais
 * Stack: JavaScript Vanilla puro (sem frameworks, máxima performance, 60fps)
 */

'use strict';

/* ============================================================
   1. AMBIENT GLOW — ILUMINAÇÃO DE CURSOR DINÂMICA
   ============================================================ */
(function initAmbientGlow() {
  const glow = document.getElementById('ambientGlow');
  if (!glow) return;

  // Desativar em dispositivos sem ponteiro fino ou com preferência de movimento reduzido
  if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    glow.style.display = 'none';
    return;
  }

  let mouseX = -500;
  let mouseY = -500;
  let currentX = -500;
  let currentY = -500;
  let isMoving = false;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      glow.style.opacity = '1';
      requestAnimationFrame(renderGlow);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
  });

  function renderGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    glow.style.setProperty('--mouse-x', `${currentX.toFixed(1)}px`);
    glow.style.setProperty('--mouse-y', `${currentY.toFixed(1)}px`);

    const dist = Math.hypot(mouseX - currentX, mouseY - currentY);
    if (dist > 0.5) {
      requestAnimationFrame(renderGlow);
    } else {
      isMoving = false;
    }
  }
})();

/* ============================================================
   2. PROGRESS BAR & FLOATING QUICK-ACTION CTA
   ============================================================ */
(function initScrollFeatures() {
  const progressBar = document.getElementById('scrollProgress');
  const floatingCta = document.getElementById('floatingCta');
  const finalCta = document.getElementById('cta');

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateScrollElements);
      ticking = true;
    }
  }

  function updateScrollElements() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar && docHeight > 0) {
      const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = `${progress}%`;
    }

    if (floatingCta) {
      const showAfterHero = scrollY > 600;
      let nearFinalCta = false;

      if (finalCta) {
        const rect = finalCta.getBoundingClientRect();
        nearFinalCta = rect.top < window.innerHeight && rect.bottom > 0;
      }

      if (showAfterHero && !nearFinalCta) {
        floatingCta.classList.add('is-visible');
      } else {
        floatingCta.classList.remove('is-visible');
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateScrollElements();
})();

/* ============================================================
   3. RESTRAINED P / V PARALLAX (P = Âncora, V = Direcional)
   ============================================================ */
(function initMonumentalParallax() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || window.innerWidth < 1024) return;

  const letters = document.querySelectorAll('.positioning__bg-letter, .method__bg-letter');
  if (!letters.length) return;

  let ticking = false;

  function updateParallax() {
    letters.forEach((letter) => {
      const section = letter.closest('section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        const centerOffset = (rect.top + rect.height / 2) - (window.innerHeight / 2);
        const isP = letter.classList.contains('positioning__bg-letter--p') || letter.classList.contains('method__bg-letter--p');
        // P fica ancorado (origem: max 5px), V levemente direcional (vetor: max 12px)
        const maxMove = isP ? 5 : 12;
        const factor = isP ? 0.012 : 0.03;
        const translateY = Math.max(-maxMove, Math.min(maxMove, centerOffset * factor));
        letter.style.transform = `translateY(${translateY.toFixed(1)}px)`;
      }
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================================
   4. EXPERIÊNCIA DE DEPOIMENTOS (S6) — FILTROS & NAVEGAÇÃO
   ============================================================ */
(function initTestimonials() {
  const filters = document.querySelectorAll('.testimonials__filter');
  const dots = document.querySelectorAll('.testimonials__dot');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.testimonials__arrow-btn--prev');
  const nextBtn = document.querySelector('.testimonials__arrow-btn--next');

  if (!cards.length) return;

  let currentIndex = 0;

  function setActiveTestimonial(index) {
    currentIndex = (index + cards.length) % cards.length;

    dots.forEach((d, i) => {
      const isActive = i === currentIndex;
      d.classList.toggle('testimonials__dot--active', isActive);
      d.setAttribute('aria-selected', String(isActive));
    });

    if (cards[currentIndex]) {
      cards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => setActiveTestimonial(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => setActiveTestimonial(currentIndex + 1));
  }

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      filters.forEach((f) => f.classList.remove('testimonials__filter--active'));
      filter.classList.add('testimonials__filter--active');

      const filterType = filter.getAttribute('data-filter');

      cards.forEach((card, cIdx) => {
        if (filterType === 'all') {
          card.style.opacity = '1';
        } else {
          const match = (filterType === 'retain' && cIdx === 0) ||
                        (filterType === 'reach' && cIdx === 1) ||
                        (filterType === 'grow' && cIdx === 2);

          card.style.opacity = match ? '1' : '0.45';
          if (match) setActiveTestimonial(cIdx);
        }
      });
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => setActiveTestimonial(index));
  });
})();

/* ============================================================
   5. ACCESSIBLE FAQ ACCORDION (+ → − TRANSITION)
   ============================================================ */
(function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item, index) => {
    const btn = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    const icon = item.querySelector('.faq-item__icon');

    if (!btn || !answer) return;

    // Primeiro item aberto por padrão (conforme Figma)
    const shouldBeOpen = index === 0;
    btn.setAttribute('aria-expanded', String(shouldBeOpen));
    answer.classList.toggle('is-open', shouldBeOpen);
    if (icon) icon.textContent = shouldBeOpen ? '−' : '+';

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Política de um accordion aberto por vez
      faqItems.forEach((other) => {
        if (other !== item) {
          const otherBtn = other.querySelector('.faq-item__question');
          const otherAnswer = other.querySelector('.faq-item__answer');
          const otherIcon = other.querySelector('.faq-item__icon');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.classList.remove('is-open');
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      // Alterna item clicado
      btn.setAttribute('aria-expanded', String(!isExpanded));
      answer.classList.toggle('is-open', !isExpanded);
      if (icon) icon.textContent = !isExpanded ? '−' : '+';
    });
  });
})();

/* ============================================================
   6. SCROLL REVEAL & METHOD PROGRESSIVE LINE DRAW
   ============================================================ */
(function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.process, .community').forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  // Método: Linha progressiva e pontos de processo
  const processSection = document.getElementById('process');
  if (processSection) {
    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            processSection.classList.add('is-revealed');
            processObserver.unobserve(processSection);
          }
        });
      },
      { threshold: 0.2 }
    );
    processObserver.observe(processSection);
  }

  // Comunidade: Revelação suave do notebook/área de membros
  const communitySection = document.getElementById('community');
  if (communitySection) {
    const communityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            communitySection.classList.add('is-revealed');
            communityObserver.unobserve(communitySection);
          }
        });
      },
      { threshold: 0.15 }
    );
    communityObserver.observe(communitySection);
  }

  // Seletores para revelação editorial padrão
  const selectors = [
    '.positioning__card',
    '.process__title',
    '.process__step-card',
    '.method__header',
    '.method-card',
    '.community__content',
    '.testimonials__header',
    '.testimonial-card',
    '.expert__content',
    '.expert__visual',
    '.faq__header',
    '.faq-item',
    '.cta-final__container > *',
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('animate-in');
      if (i > 0 && i <= 4) {
        el.classList.add(`animate-in--delay-${i}`);
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  document.querySelectorAll('.animate-in').forEach((el) => observer.observe(el));
})();

/* ============================================================
   7. SMOOTH SCROLL PARA ÂNCORAS COM GESTÃO DE FOCO ACESSÍVEL
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
    });
  });
})();
