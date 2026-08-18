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
});
