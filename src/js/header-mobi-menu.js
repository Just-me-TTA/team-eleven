const mobileMenu = document.querySelector('.header-mobi-menu-container');
const openMenuBtn = document.querySelector('.header-open-menu-btn');
const closeMenuBtn = document.querySelector('.header-close-mob-menu-btn');

if (mobileMenu && openMenuBtn && closeMenuBtn) {
  openMenuBtn.addEventListener('click', getOpen);
  closeMenuBtn.addEventListener('click', getClose);
}

function getOpen() {
  mobileMenu.classList.add('is-open');
}

function getClose() {
  mobileMenu.classList.remove('is-open');
}
