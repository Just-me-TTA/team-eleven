const text = document.querySelector('.js-quote');

async function serviceQuote() {
  const BASE_URL = "https://your-energy.b.goit.study/api/quote";
  try {
      const response = await fetch(`${BASE_URL}`);
      const data = response.data;
      serviceQuote().then(data => {
        text.innerHTML = `
        <p class="js-quote-text">${data.quote}</p>
        <p class="js-quote-autor">${data.author}</p>
        `;
        if (data) {
          const day = new Date();
          localStorage.setItem('quote', data.quote);
          localStorage.setItem('author', data.author);
          localStorage.setItem('quoteDate', day);
        }
      })

      return response.json();
  } catch (error) {
     console.log(error)
  }

}

serviceQuote()



