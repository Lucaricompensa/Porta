document.addEventListener('DOMContentLoaded', () => {
  
  /* =========================================================
     1. LÓGICA DEL MENÚ MÓVIL (Original)
     ========================================================= */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    const closeNav = () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeNav();
    });
  }

  /* =========================================================
     2. LÓGICA DEL POP-UP (Lightbox)
     ========================================================= */
  const lightbox = document.getElementById('lightbox');
  
  // Solo ejecutamos este código si estamos en una página que tiene el lightbox
  if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-item img');

    // Función para abrir la imagen
    galleryImages.forEach(img => {
      img.addEventListener('click', (e) => {
        // Prevenir comportamiento si la imagen estuviera dentro de un link <a>
        e.preventDefault(); 
        lightboxImg.src = img.src; // Copiamos la ruta de la foto clickeada
        lightbox.classList.add('is-active'); // Mostramos el pop-up
      });
    });

    // Función para cerrar el pop-up
    const closeLightbox = () => {
      lightbox.classList.remove('is-active');
      // Borramos la imagen medio segundo después (cuando termina la animación) para evitar parpadeos
      setTimeout(() => {
        if (!lightbox.classList.contains('is-active')) {
          lightboxImg.src = '';
        }
      }, 300);
    };

    // Cerrar al hacer clic en la "X"
    closeBtn.addEventListener('click', closeLightbox);

    // Cerrar al hacer clic en cualquier parte del fondo oscuro
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Accesibilidad: Cerrar al presionar la tecla "Escape"
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
        closeLightbox();
      }
    });
  }

});