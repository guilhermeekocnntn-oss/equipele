/**
 * Equipele — Main Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Newsletter Form Handler
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

  // Cart Icon Action
  const cartBtn = document.querySelector('.cart-dot');
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Cart clicked');
    });
  }

  // Quantity Selector Handler
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

  // Accordion Toggle Handler
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const currentItem = header.closest('.accordion-item');
      const isOpen = currentItem.classList.contains('active');

      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach((item) => {
        item.classList.remove('active');
      });

      // Toggle clicked item
      if (!isOpen) {
        currentItem.classList.add('active');
      }
    });
  });

  // Buy Now Button Action
  const buyNowBtn = document.querySelector('.buy-now-btn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      const qty = qtyNumber ? qtyNumber.textContent : '1';
      alert(`Adicionado ao carrinho! (${qty}x Lavaê — Sabonete Facial em Espuma)`);
    });
  }

  // ---------- CUSTOM INTERACTIVE CURSOR FOLLOWER ----------
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

    // Hover state on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .chip, .accordion-header, .qty-btn, input');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ---------- SCROLL REVEAL OBSERVER ----------
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
