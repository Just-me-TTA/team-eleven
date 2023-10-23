const toTopBtn = document.getElementById('toTopBtn');

toTopBtn.addEventListener('click', scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
document.addEventListener('scroll', showButton);

function showButton() {
  if (window.pageYOffset > 100) {
    toTopBtn.classList.add('shown');
  } else {
    toTopBtn.classList.remove('shown');
  }
}