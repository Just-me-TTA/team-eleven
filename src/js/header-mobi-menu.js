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

window.matchMedia('(min-width: 428px)').addEventListener('change', e => {
  if (!e.matches) return;
  headerMobileMenu.classList.remove('is-open');
  headerOpenMenuBtn.setAttribute('aria-expanded', false);
});
const menuLinks = document.querySelectorAll('.header-menu-link');

menuLinks.forEach(menuLink => {
  const linkPath = new URL(menuLink.href).pathname;
  if (document.location.pathname === linkPath) {
    menuLink.classList.add('home-nav');
  }
});
