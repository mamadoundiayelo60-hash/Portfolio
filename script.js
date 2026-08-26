const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('open', !expanded);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const mediaModal = document.querySelector('#media-modal');
const modalImage = mediaModal?.querySelector('.media-modal-image');
const modalTitle = mediaModal?.querySelector('figcaption');
const modalClose = mediaModal?.querySelector('.media-modal-close');
let modalTrigger = null;

const closeMediaModal = () => {
  if (!mediaModal || mediaModal.hidden) return;
  mediaModal.hidden = true;
  document.body.classList.remove('modal-open');
  if (modalImage) modalImage.src = '';
  modalTrigger?.focus();
};

document.querySelectorAll('[data-gallery-src]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    if (!mediaModal || !modalImage || !modalTitle) return;
    modalTrigger = trigger;
    modalImage.src = trigger.dataset.gallerySrc;
    modalImage.alt = trigger.querySelector('img')?.alt || '';
    modalTitle.textContent = trigger.dataset.galleryTitle || '';
    mediaModal.hidden = false;
    document.body.classList.add('modal-open');
    modalClose?.focus();
  });
});

modalClose?.addEventListener('click', closeMediaModal);
mediaModal?.addEventListener('click', (event) => {
  if (event.target === mediaModal || event.target === mediaModal.querySelector('figure')) closeMediaModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMediaModal();
});
