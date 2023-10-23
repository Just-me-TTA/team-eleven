
const headerMobileMenu = document.querySelector('.header-mobi-menu-container');
const headerOpenMenuBtn = document.querySelector('.header-open-menu-btn');
const headerCloseMenuBtn = document.querySelector('.header-close-mob-menu-btn');

const toggleHeaderMenu = () => {
  const isHeaderMenuOpen =
    headerOpenMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  headerOpenMenuBtn.setAttribute('aria-expanded', !isHeaderMenuOpen);
  headerMobileMenu.classList.toggle('header-is-open');
};
headerOpenMenuBtn.addEventListener('click', toggleHeaderMenu);
headerCloseMenuBtn.addEventListener('click', toggleHeaderMenu);
