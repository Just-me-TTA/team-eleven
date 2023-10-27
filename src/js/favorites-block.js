let favoriteIdList = [];

function loadFavoritesFromLocalStorage() {
  const favoriteData = localStorage.getItem('LS_FAVORITES_ID');
  if (favoriteData) {
    favoriteIdList = JSON.parse(favoriteData);
  } else {
    favoriteIdList = [];
  }
}

// Отримання вправ з API за списком exerciseId
async function loadFavoriteExercises() {
  const exerciseList = document.querySelector('.exercise-list'); // Ваш елемент для вставки карток вправ

  for (const exerciseId of favoriteIdList) {
    try {
      const response = await axios.get(`${BASE_URL}/exercises/${exerciseId}`);
      if (response.status === 200) {
        const exerciseData = response.data;
        const exerciseCard = createExerciseCard(exerciseData);
        exerciseList.appendChild(exerciseCard);
      } else {
        console.error('Помилка запиту до API');
      }
    } catch (error) {
      console.error('Помилка при взаємодії з API', error);
    }
  }
}

// Створення HTML-коду для картки вправи
function createExerciseCard(exerciseData) {
  const exerciseItem = document.createElement('li');
  exerciseItem.classList.add('exercise-item');
  exerciseItem.innerHTML = `
    <div class="rating-start-exercise">
      <div class="rating-start-exercise-wrap">
        <p class="workout">Workout</p>
        <p class="rating-exercise-card">${exerciseData.rating}</p>
        <svg class="icon-star-exercises" width="18" height="18" fill="rgba(238, 161, 12, 1)">
          <use href="/img/iconfull.svg#icon-star"></use>
        </svg>
        <button data-modal-open class="start-exercise openModalBtn" data-exercise-id="${exerciseData._id}">Start
          <svg class="icon-right-arrow" width="18" height="18" stroke="black">
            <use href="/img/iconfull.svg#icon-right-arrow"></use>
          </svg>
        </button>
      </div>
      <div class="title-exercise-wrap">
        <svg class="icon-title-exercises" width="24" height="24" stroke="black">
          <use href="/img/iconfull.svg#icon-run-men"></use>
        </svg>
        <h2 class="title-exercise">${exerciseData.name}</h2>
      </div>
      <div class="calories-target">
        <p class="burned-calories">BurnedCalories: ${exerciseData.burnedCalories}/<span class="time-exercise">${exerciseData.time}</span></p>
        <p class="part-exercise">Bodypart: ${exerciseData.bodypart}</p>
        <p class="target">Target: ${exerciseData.target}</p>
      </div>
    </div>`;

  return exerciseItem;
}

// Виклик функції для завантаження обраних вправ з локального сховища
loadFavoriteExercises();
