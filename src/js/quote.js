const text = document.querySelector('.js-quote');
const KEY_LOCALSTORAGE = 'quote';

async function serviceQuote() {
  const BASE_URL = "https://your-energy.b.goit.study/api/quote";
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    if (data) {
      const text = document.querySelector('.js-quote');
      text.innerHTML = `
        <p class="js-quote-text">${data.quote}</p>
        <p class="js-quote-autor">${data.author}</p>
      `;

      const day = new Date();
      localStorage.setItem('quote', data.quote);
      localStorage.setItem('author', data.author);
      localStorage.setItem('quoteDate', day);
    }
  } catch (error) {
    console.error(error);
  }
}

serviceQuote();