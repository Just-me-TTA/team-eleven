const containerForImages = document.querySelector('.js-container-for-images');
const bodyPartsFilterButton = document.getElementById('bodyPartsFilterButton');

// Отримати категорії та вставити їх у блок
function fetchCategories(filterValue) {
  fetch(`https://your-energy.b.goit.study/api/filters?filter=${filterValue}`)
    .then(response => response.json())
    .then(data => handleResponse(data))
    .catch(error => console.error('Помилка при отриманні категорій: ', error));
}

function handleResponse(data) {
  const resultsHtml = data.results.map(({ filter, imgURL, name }) => {
    return  ` <div class="gallery__item">
        <a class="gallery__link" href="#">
            <img
            class="gallery__image"
            src="${imgURL}"
            alt="${name}"
            />
        </a>
        <p class="textImage">${name}</p>
        <p class="filterImage">${filter}</p>
        </div>`;
  }).join('');

  containerForImages.innerHTML = resultsHtml;
}

// Зробити кнопку "Body parts" активною та завантажити категорії
bodyPartsFilterButton.classList.add('active');
fetchCategories('Body parts');

// Опціонально: додати обробник подій для інших категорій
const btnCategories = document.querySelectorAll(".btn-categories");
btnCategories.forEach(element => {
  element.addEventListener('click', event => {
    const categoryFilterValue = event.target.dataset.cgid;
    fetchCategories(categoryFilterValue);
  });
});
