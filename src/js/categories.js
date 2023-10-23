debugger;

const btnCategories = document.querySelectorAll(".btn-categories");
const containerForImages = document.querySelector('.js-container-for-images');
const containerForExercise = document.querySelector('.exercise-card'); // Додайте контейнер для вправ

// Отримайте кнопки сторінок
const btnNumbers = document.querySelectorAll(".btn-number");

// Визначте поточний активний фільтр та сторінку
let activeFilter = 'Body parts';
let activePage = 1;
const activeLimit = 9;

// Опишіть функцію для завантаження категорій за вибраним фільтром та сторінкою
function loadCategories() {
  // Отримайте дані для поточного фільтра та сторінки
  fetch(`https://your-energy.b.goit.study/api/filters?filter=${activeFilter}&page=${activePage}&limit=${activeLimit}`)
    .then(response => response.json())
    .then(data => {
      // Обробка отриманих даних
      handleResponse(data);
    })
    .catch(error => {
      console.error('Помилка при отриманні категорій: ', error);
    });
}

function handleResponse(data) {
  let results = data.results;
  let resultsHtml = results.map(({ filter, name, imgURL }) => {
    return ` <div class="gallery__item" ">
        <a class="gallery__link" data-cdIt="${name} href="#">
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
  
  // Додайте обробник подій для карток з фото
  const clickToImgExercise = containerForImages.querySelectorAll('.gallery__link');
  clickToImgExercise.forEach(element => {
    element.addEventListener('click', event => {
      // Отримайте значення частини тіла (part)
      let clickedPart = event.target  .dataset.cdIt;
      
      // Призначіть значення змінної part, щоб змінити фільтр вправ
      activeFilter = clickedPart;
      // Приховати всі картки з фото
      containerForImages.style.display = 'none';
      // Виконайте завантаження вправ
      loadExercise();
    });
  });
}

function loadExercise() {
  // Отримайте дані для поточного фільтра та сторінки
  fetch(`https://your-energy.b.goit.study/api/exercises?bodypart=${activeFilter}`)
    .then(response => response.json())
    .then(data => {
      // Обробка отриманих даних
      handleExercise(data);
    })
    .catch(error => {
      console.error('Помилка при отриманні вправ: ', error);
    });
}

function handleExercise(data) {
  let resultExercises = data.results;
  let resultExercisesHtml = resultExercises.map(({ gifUrl, id }) => {
    return `<div class="container-for-card-exercise">
            <img
            class="gallery__image"
            src="${gifUrl}"
            alt="${id}"
            />
        <p class="textImage"></p>
        <p class="filterImage"></p>
        </div>`;
  }).join('');
  containerForExercise.innerHTML = resultExercisesHtml;
}

// Завантажте початкову сторінку при завантаженні сторінки
loadCategories();
