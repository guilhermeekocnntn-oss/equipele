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
});
