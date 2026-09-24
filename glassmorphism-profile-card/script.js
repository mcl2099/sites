/**
 * GLASSMORPHISM PROFILE CARD — JAVASCRIPT DINÂMICO
 * Física 3D Tilt, Reflexo de Luz Especular (Glare) e Interatividades
 */

document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cardContainer');
  const card = document.getElementById('glassCard');
  const glare = document.getElementById('cardGlare');
  const btnFollow = document.getElementById('btnFollow');
  const btnMessage = document.getElementById('btnMessage');

  let bounds;

  // Atualiza as dimensões do card
  function updateBounds() {
    bounds = card.getBoundingClientRect();
  }

  // Efeito 3D Tilt e Luz Especular ao mover o mouse
  function onMouseMove(e) {
    if (!bounds) updateBounds();

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;

    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    };

    // Sensibilidade do ângulo (máximo de ~12 graus)
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
    const maxDistance = Math.sqrt((bounds.width / 2) ** 2 + (bounds.height / 2) ** 2);
    
    const rotateX = -(center.y / (bounds.height / 2)) * 10;
    const rotateY = (center.x / (bounds.width / 2)) * 10;

    // Aplica a rotação 3D com suave elevação no eixo Z
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Posiciona o ponto de reflexo de luz (glare) sobre o vidro
    const glareX = (leftX / bounds.width) * 100;
    const glareY = (topY / bounds.height) * 100;

    glare.style.opacity = '1';
    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%)`;
  }

  // Reseta suavemente a posição quando o mouse sai do card
  function onMouseLeave() {
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    glare.style.opacity = '0';
  }

  // Remove a transição durante o movimento para resposta instantânea
  function onMouseEnter() {
    updateBounds();
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
  }

  // Event Listeners para Mouse e Touch
  cardContainer.addEventListener('mouseenter', onMouseEnter);
  cardContainer.addEventListener('mousemove', onMouseMove);
  cardContainer.addEventListener('mouseleave', onMouseLeave);

  window.addEventListener('resize', updateBounds);
  window.addEventListener('scroll', updateBounds, true);

  // ==========================================
  // INTERATIVIDADES DOS BOTÕES
  // ==========================================

  // Botão Conectar / Seguir (Toggle Interativo)
  let isFollowing = false;
  if (btnFollow) {
    btnFollow.addEventListener('click', (e) => {
      e.preventDefault();
      isFollowing = !isFollowing;

      if (isFollowing) {
        btnFollow.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span class="btn-text">Conectado</span>
        `;
        btnFollow.style.background = 'rgba(255, 255, 255, 0.18)';
        btnFollow.style.color = '#FFFFFF';
        btnFollow.style.borderColor = 'rgba(255, 255, 255, 0.4)';
      } else {
        btnFollow.innerHTML = `
          <span class="btn-text">Conectar</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        `;
        btnFollow.style.background = 'linear-gradient(135deg, rgba(231, 207, 143, 0.9), rgba(200, 164, 77, 0.95))';
        btnFollow.style.color = '#12090E';
        btnFollow.style.borderColor = 'transparent';
      }
    });
  }

  // Botão Mensagem (Feedback visual)
  if (btnMessage) {
    btnMessage.addEventListener('click', (e) => {
      e.preventDefault();
      btnMessage.style.transform = 'scale(0.9)';
      setTimeout(() => {
        btnMessage.style.transform = '';
      }, 150);
      alert('Abrindo canal direto de mensagem com Valéria Mendes...');
    });
  }
});
