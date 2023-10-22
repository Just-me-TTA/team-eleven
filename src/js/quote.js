const text = document.querySelector('.js-quote');
serviceQuote().then(data => {
  text.innerHTML = `
    <p class="js-quote-text">${data.quote}</p>
    <p class="js-quote-autor">${data.author}</p>
     `;
})

function serviceQuote() {
  const BASE_URL = "https://your-energy.b.goit.study/api/quote";
  return fetch(
        `${BASE_URL}`).then((resp) => {
          if (!resp.ok) {
            throw new Error(resp.statusText);
          }
          return resp.json();
        })
}