
const btnCategories = document.querySelectorAll(".btn-categories");
const containerForGalleryItem = document.querySelector('.js-container-gallery-item');
const contCategor = document.querySelector('.cont-categor');
const exerciseForCardCategory = document.querySelector('.exercise-for-card-category');
const categoryDescr = document.getElementById('category-descr');
// Отримайте кнопки сторінок
const btnNumbers = document.querySelectorAll(".btn-number");

// Визначте поточний активний фільтр та сторінку
const baseAPIUrl = 'https://your-energy.b.goit.study/api';
let activeFilter = 'Body parts';
let activePage = 1;
const activeLimit = 9;
// Опишіть функцію для завантаження категорій за вибраним фільтром та сторінкою
function loadCategories() {
  // Отримайте дані для поточного фільтра та сторінки
  fetch(`${baseAPIUrl}/filters?filter=${activeFilter}&page=${activePage}&limit=${activeLimit}`)
    .then(response => response.json())
    .then(data => {
      // Обробка отриманих даних
      handleResponse(data);
    })
    .catch(error => {
      console.error('Помилка при отриманні категорій: ', error);
      return {
        success: false
      }
    });
  
  return {
    success: true
  }
}

function handleResponse(data) {
  let results = data.results;
  let resultsHtml = results.map(({ filter, name, imgURL }) => {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    const dataObjectString = JSON.stringify({
      filter: filter,
      name: name
    })
    return ` <div class="gallery__item js-gallery-item" data-filter-obj='${dataObjectString}' >
            <img
            class="gallery__image"
            src="${imgURL}"
            alt="${name}"
            />
            <div class="text-category">
        <p class="textImage">${formattedName}</p>
        <p class="filterImage">${filter}</p>
        </div>
        
        
        </div>`;
  }).join('');
  containerForGalleryItem.innerHTML = resultsHtml;
}

// Додайте обробник події для кнопок фільтрів
btnCategories.forEach(element => {
  element.addEventListener('click', event => {
    btnCategories.forEach(btn => btn.classList.remove('current'));
    element.classList.add('current');
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
    btnNumbers.forEach(btn => btn.classList.remove('current-page'));
    element.classList.add('current-page');
    // Отримайте номер сторінки
    activePage = event.target.dataset.numpage;

    // Завантажте категорії для поточного фільтру та обраної сторінки
    loadCategories();
  });
});



function initializeExerciseCardEvents() {
  document.querySelector('.js-container-gallery-item').addEventListener('click', function (event) { 
    exerciseForCardCategory.classList.remove('hiden');
    contCategor.style.display = 'none';
    const galleryItem = event.target.closest('.js-gallery-item')
    if (galleryItem) { 
      let filterObjString = galleryItem.dataset.filterObj;
      let filterObj = null;
      if (filterObjString.length) {
        try {
        filterObj = JSON.parse(filterObjString);
          
        } catch(error) {
          console.error('An error occurred while parsing JSON:', error);
        }
      }
      if (filterObj) {
        getExercises(filterObj);
      }
    } 
  });
}

function getExercises({ filter, name }) {
  const filterParamMap = {
    'Body parts': 'bodypart',
    'muscles': 'muscles',
    'equipment': 'equipment'
  };
  const filterParam = filterParamMap[filter];
   fetch(`${baseAPIUrl}/exercises?${filterParam}=${name}&${activePage}&${activeLimit}`)
    .then(response => response.json())
    .then(data => {
      // Обробка отриманих даних
      let a = 5;
      handleResponseExercise(data);
    })
    .catch(error => {
      console.error('error fetching exercise', error);
      
    });
  
  
}

function handleResponseExercise(data) {
  let resultExercise = data.results;
  let resultsExerciseHtml = resultExercise.map(({ bodypart, burnedCalories, name,  rating, target, time
  }) => {
    return `<li class = "exercise-item">
      <div class="rating-start-exercise">
        <div class="rating-start-exercise-wrap">
        <p class="workout">Workout</p>
        <p class="rating-exercise-card">${rating}</p>
        <svg class="icon-star-exercises" width="18" height="18" fill="rgba(238, 161, 12, 1)">
          <use href="/img/iconfull.svg#icon-star"></use>
        </svg>
        <button type="button"  data-modal-open class="start-exercise openModalBtn">Start
          <svg class="icon-right-arrow" width="18" height="18" stroke="black">
            <use href="/img/iconfull.svg#icon-right-arrow"></use>
          </svg>
        </button>
        </div>
        <div class = "title-exercise-wrap">
            <svg class="icon-title-exercises" width="24" height="24" stroke="black">
            <use href="/img/iconfull.svg#icon-run-men"></use>
          </svg>
          <h2 class="title-exercise">${name}</h2>
        </div>
        <div class="calories-target">
          <p class="burned-calories">BurnedCalories: ${burnedCalories}/<span class="time-exercise">${time}</span></p>
          <p class="part-exercise">Bodypart: ${bodypart}</p>
          <p class="target">Target: ${target}</p>
        </div>
      </div>
    </li>
    `;
  });
  const exerciseList = document.querySelector('.exercise-list');
  exerciseList.innerHTML = resultsExerciseHtml;
}


document.addEventListener("DOMContentLoaded", function () { 
  let loadCategoryResult = loadCategories();
  if (loadCategoryResult.success) {
    initializeExerciseCardEvents();
}  
});