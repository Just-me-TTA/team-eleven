import { exercise } from './exercise-filter.js';

const refs = {
  exercisesContainer: document.createElement('exercise'),
  addExercise: document.querySelector('.js-add'),
};

refs.addExercise.addEventListener('click', handleAdd);

async function fetchExercise() {
  const result = await newsApiService.fetchExercise();
  const { hits } = result;
  isShown += hits.length;

  try {
    if ((isShown = 0)) {
      Notify.info(
        "It appears that you haven't added any exercises to your favorites yet.To get started, you can add exercises that you like to your favorites for easier access in the future."
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function onChoosenExercise(elements) {
  const markup = elements
    .map(
      ({
        btnWorkout,
        iconTrash, btnStart,
        title,
        burnedCalories,
        bodyPart,
        target,
      }) => {
        return `<li class="exercise-favor">
    <div class="top">
      <button class="btn-workout">Workout${btnWorkout}</button>
      <svg xmlns="http://www.w3.org/2000/svg"${iconTrash}></svg>
      <button class="btn-workout">Start${btnStart}</button>
    </div>
    <h5 class="title-exercise">Barbell${title}</h5>
    <div class="achive">
      <p class="info-item">
        <b>Burned calories</b>
        ${burnedCalories}
      </p>
      <p class="info-item">
        <b>Body part</b>
        ${bodyPart}
      </p>
      <p class="info-item">
        <b>Target</b>
        ${target}
      </p>
    </div>
    </li>`;
      }
    )
    .join('');
  refs.exerciseContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function onKeyDownEscape(event) {
  if (event.key === 'Escape') {
    instance.close();
  }
}
