const btnCategories = document.querySelectorAll(".btn-categories");
const containerForImages = document.querySelector('.js-container-for-images');

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
    return ` <div class="gallery-item" data-cdIt="${name}>
        <a class="gallery__link" href="#" >
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

// Додайте обробник події для кнопок фільтрів
btnCategories.forEach(element => {
  element.addEventListener('click', event => {
    // Отримайте значення фільтра
    activeFilter = event.target.dataset.cgid;
    // Встановіть сторінку 1 при натисканні на фільтр
    activePage = 1;

    // Завантажте категорії для обраного фільтра та сторінки 1
    loadCategories();
  });
});

// Додайте обробник подій для кнопок сторінок
btnNumbers.forEach(element => {
  element.addEventListener('click', event => {
    // Отримайте номер сторінки
    activePage = event.target.dataset.numpage;

    // Завантажте категорії для поточного фільтру та обраної сторінки
    loadCategories();
  });
});

// Завантажте початкову сторінку при завантаженні сторінки
loadCategories();




// exercise#allery__image
const clickToImgExercise = document.querySelectorAll('.gallery-link');
const containerForExercise = document.querySelector('.exercise-card');


let part = "back";

function loadExercise() {
  // Отримайте дані для поточного фільтра та сторінки
  fetch(`https://your-energy.b.goit.study/api/exercises?bodypart=${part}`)
    .then(response => response.json())
    .then(data => {
      // Обробка отриманих даних
      console.log(data);
     handleExercise(data);
    })
    .catch(error => {
      console.error('Помилка при отриманні категорій: ', error);
    });
}
function handleExercise(data) {
  let resultExercises = data.results;
  let resultExercisesHtml = resultExercises.map(({gifUrl, id }) => {
    return`<div class="container-for-card-exercise">
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

clickToImgExercise.forEach(element => {
  element.addEventListener('click', event => {
    // Отримайте значення частини тіла (part)
        console.log("Картка була натиснута.");
    let clickedPart = event.target.dataset.cdIt;
    
    // Призначіть значення змінної part, щоб змінити фільтр вправ
    part = clickedPart;

    // Встановіть сторінку 1 при натисканні на фільтр
    activePage = 1;

    // Завантажте вправи для обраної частини тіла (part) та сторінки 1
    loadExercise();
  });
});
