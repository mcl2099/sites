/* ==========================================================================
   PLAY VIRAL — BRAND BOOK SCRIPT ENGINE
   Theme Toggle, Click-to-Copy, Live Type Tester & Scroll Spy
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Alternador de Tema (Light / Dark Mode)
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const htmlEl = document.documentElement;

  // Carrega tema salvo ou padrão light
  const savedTheme = localStorage.getItem('playviral-theme') || 'light';
  if (savedTheme === 'dark') {
    htmlEl.classList.add('dark');
    if (themeLabel) themeLabel.textContent = 'Light Mode';
  } else {
    htmlEl.classList.remove('dark');
    if (themeLabel) themeLabel.textContent = 'Dark Mode';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = htmlEl.classList.toggle('dark');
      localStorage.setItem('playviral-theme', isDark ? 'dark' : 'light');
      if (themeLabel) {
        themeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      }
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  }

  // 2. Toast Notification Helper
  const toast = document.createElement('div');
  toast.className = 'bb-toast';
  toast.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DEC37D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span class="bb-toast-text">Código copiado com sucesso!</span>
  `;
  document.body.appendChild(toast);

  let toastTimeout = null;
  function showToast(text) {
    const textEl = toast.querySelector('.bb-toast-text');
    if (textEl) textEl.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // 3. Click-to-Copy em Amostras de Cor e Tokens
  const copyElements = document.querySelectorAll('[data-copy]');
  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy') || el.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copiado: ${textToCopy}`);
      }).catch(() => {
        const temp = document.createElement('textarea');
        temp.value = textToCopy;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast(`Copiado: ${textToCopy}`);
      });
    });
  });

  // 4. Scroll Spy para Navegação Flutuante de Capítulos
  const navLinks = document.querySelectorAll('.bb-nav-link');
  const chapters = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY;
    let currentId = '';

    chapters.forEach(chap => {
      const top = chap.offsetTop - 140;
      const height = chap.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = chap.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('bg-zinc-900', 'text-white', 'dark:bg-white', 'dark:text-zinc-900');
      link.classList.add('text-zinc-600', 'dark:text-zinc-400');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.remove('text-zinc-600', 'dark:text-zinc-400');
        link.classList.add('bg-zinc-900', 'text-white', 'dark:bg-white', 'dark:text-zinc-900');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // 5. Testador Interativo de Tipografia
  const typeTesterInput = document.getElementById('typeTesterInput');
  const typeTesterTargets = document.querySelectorAll('.type-tester-target');
  if (typeTesterInput && typeTesterTargets.length) {
    typeTesterInput.addEventListener('input', (e) => {
      const val = e.target.value;
      typeTesterTargets.forEach(el => {
        if (val.trim() === '') {
          el.textContent = el.getAttribute('data-default') || 'Play Viral • Alta Performance';
        } else {
          el.textContent = val;
        }
      });
    });
  }

  // 6. Exportar / Imprimir em PDF
  const btnExportPdf = document.getElementById('btnExportPdf');
  if (btnExportPdf) {
    btnExportPdf.addEventListener('click', () => {
      window.print();
    });
  }

  // Inicializar ícones Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
