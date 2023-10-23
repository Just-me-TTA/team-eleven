const mobileMenu = document.querySelector('.header-mobi-menu-container');
const openMenuBtn = document.querySelector('.heder-open-menu-btn');
const closeMenuBtn = document.querySelector('.header-close-mob-menu-btn');

openMenuBtn.addEventListener('click', getOpen);
function getOpen() {
  mobileMenu.classList.add('is-open');
}
closeMenuBtn.addEventListener('click', getClose);
function getClose() {
  mobileMenu.classList.remove('is-open');
}
