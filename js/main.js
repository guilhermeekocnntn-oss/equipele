/**
 * Equipele — Main Application Script
 * Features: Newsletter, Buy Box, Accordions, Top Scroll Progress,
 * Staggered Scroll Reveals, and Interactive Gradient Foam/Spray Trail Canvas.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- TOP SCROLL PROGRESS BAR ----------
  let progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
  }

  const updateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ---------- NEWSLETTER FORM HANDLER ----------
  const newsForm = document.querySelector('.news-form');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        const userEmail = emailInput.value.trim();
        const submitBtn = newsForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : 'assinar';

        if (submitBtn) {
          submitBtn.textContent = 'Enviado! ✓';
          submitBtn.style.backgroundColor = 'var(--pink-deep)';
          submitBtn.style.borderColor = 'var(--pink-deep)';
        }

        setTimeout(() => {
          alert(`Obrigado por assinar a newsletter Equipele! Conteúdos serão enviados para: ${userEmail}`);
          emailInput.value = '';
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.borderColor = '';
          }
        }, 300);
      }
    });
  }

  // ---------- CART ICON ACTION ----------
  const cartBtn = document.querySelector('.cart-dot');
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Cart clicked');
    });
  }

  // ---------- QUANTITY SELECTOR HANDLER ----------
  const qtyMinus = document.querySelector('.qty-minus');
  const qtyPlus = document.querySelector('.qty-plus');
  const qtyNumber = document.querySelector('.qty-number');

  if (qtyMinus && qtyPlus && qtyNumber) {
    qtyMinus.addEventListener('click', () => {
      let currentVal = parseInt(qtyNumber.textContent, 10) || 1;
      if (currentVal > 1) {
        qtyNumber.textContent = currentVal - 1;
      }
    });

    qtyPlus.addEventListener('click', () => {
      let currentVal = parseInt(qtyNumber.textContent, 10) || 1;
      qtyNumber.textContent = currentVal + 1;
    });
  }

  // ---------- ACCORDION TOGGLE HANDLER ----------
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const currentItem = header.closest('.accordion-item');
      const isOpen = currentItem.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach((item) => {
        item.classList.remove('active');
      });

      if (!isOpen) {
        currentItem.classList.add('active');
      }
    });
  });

  // ---------- BUY NOW BUTTON ACTION ----------
  const buyNowBtn = document.querySelector('.buy-now-btn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      const qty = qtyNumber ? qtyNumber.textContent : '1';
      alert(`Adicionado ao carrinho! (${qty}x Lavaê — Sabonete Facial em Espuma)`);
    });
  }

  // ---------- CUSTOM INTERACTIVE CURSOR FOLLOWER & HOVER ----------
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    const interactiveElements = document.querySelectorAll('a, button, .card, .chip, .accordion-header, .qty-btn, input');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ---------- CANVAS GRADIENT FOAM & SPRAY TRAIL SYSTEM ----------
  if (window.matchMedia('(pointer: fine)').matches) {
    const canvas = document.createElement('canvas');
    canvas.id = 'foam-spray-canvas';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99990';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const colors = [
      'rgba(203, 229, 70, ',   # Lime
      'rgba(253, 134, 180, ',  # Pink
      'rgba(232, 90, 148, ',   # Deep Pink
      'rgba(255, 253, 248, '   # Creamy Foam White
    ];

    class FoamParticle {
      constructor(x, y, isBurst = false) {
        this.x = x + (Math.random() - 0.5) * (isBurst ? 30 : 12);
        this.y = y + (Math.random() - 0.5) * (isBurst ? 30 : 12);
        this.radius = isBurst ? Math.random() * 12 + 6 : Math.random() * 8 + 3;
        this.maxRadius = this.radius * (Math.random() * 1.5 + 1.2);
        
        const speed = isBurst ? Math.random() * 4 + 1.5 : Math.random() * 1.5 + 0.3;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - (isBurst ? 0.5 : 0.8); # Gently float upward like foam
        
        this.life = 1.0;
        this.decay = Math.random() * 0.025 + 0.015;
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        this.isRing = Math.random() > 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.radius < this.maxRadius) {
          this.radius += 0.2;
        }
        this.life -= this.decay;
      }

      draw(context) {
        if (this.life <= 0) return;
        context.save();
        context.globalAlpha = Math.max(0, this.life);

        const gradient = context.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, `${this.colorPrefix}0.85)`);
        gradient.addColorStop(0.6, `${this.colorPrefix}0.4)`);
        gradient.addColorStop(1, `${this.colorPrefix}0)`);

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();

        if (this.isRing) {
          context.beginPath();
          context.arc(this.x, this.y, this.radius * 0.85, 0, Math.PI * 2);
          context.strokeStyle = `${this.colorPrefix}0.6)`;
          context.lineWidth = 1.2;
          context.stroke();
        }

        context.restore();
      }
    }

    let lastMouseX = -100, lastMouseY = -100;

    window.addEventListener('mousemove', (e) => {
      const dist = Math.hypot(e.clientX - lastMouseX, e.clientY - lastMouseY);
      if (dist > 6) {
        const count = Math.min(4, Math.floor(dist / 6));
        for (let i = 0; i < count; i++) {
          particles.push(new FoamParticle(e.clientX, e.clientY));
        }
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    });

    window.addEventListener('click', (e) => {
      for (let i = 0; i < 18; i++) {
        particles.push(new FoamParticle(e.clientX, e.clientY, true));
      }
    });

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animateParticles);
    };

    requestAnimationFrame(animateParticles);
  }

  // ---------- STAGGERED SCROLL REVEAL OBSERVER ----------
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }
});
