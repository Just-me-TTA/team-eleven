import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
//import 'slim-select/dist/slimselect.css';//
import axios from 'axios';
//import SimpleLightbox from "simplelightbox";//
//import "simplelightbox/dist/simple-lightbox.min.css";//

const API_URL = 'https://your-energy.b.goit.study/api/exercises';

const ref = {
    openModalBtn: document.querySelector('.openModalBtn'),
    addFavoriteButton: document.querySelector('.add-favorite'),
    giveRatingButton: document.querySelector('.give-rating'),
    exerciseList: document.querySelector('.exercise'),
    modal: document.getElementById('outerModal'),
   closeModalBtn: document.querySelector('.closeModalBtn'),
};

const { addFavoriteButton, giveRatingButton, openModalBtn, exerciseList, modal,closeModalBtn } = ref;

function openExerciseModal() {
  const exerciseID = '64f389465ae26083f39b17a2'; // ID вправи
  fetchExerciseData(exerciseID)
    .then(data => {
      const exerciseMarkup = createExerciseMarkup(data);
      exerciseList.innerHTML = exerciseMarkup;
    });

  modal.style.display = 'block';
}

// Додавання обробника події для кнопки "Відкрити модальне вікно"
openModalBtn.addEventListener('click', openExerciseModal);

 closeModalBtn.addEventListener('click', closeExerciseModal);
function closeExerciseModal() {
    modal.style.display = 'none';
}



async function fetchExerciseData(exerciseID) {
  try {
    const response = await axios.get(`${API_URL}/${exerciseID}`);
    return response.data;
  } catch (error) {
    console.error('Помилка запиту до API:', error);
    return null;
  }
}
//рейтинг зірок//
function createRatingStars(rating) {
  let stars = '<div class="rating-stars">';
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars += '<span class="star-filled">★</span>';
    } else {
      stars += '<span class="star-empty">☆</span>';
    }
  }
  stars += '</div>';
  return stars;
}

function createExerciseMarkup(data) {
  if (data) {
    const {
      bodyPart,
      _id,
      equipment,
      name,
      target,
      description,
      rating,
      burnedCalories,
      time,
    popularity,
      gifUrl,
    } = data;
    const ratingStars = createRatingStars(rating);
    
    return `<div class='exercise-wrap' data-id='${_id}'>
            <img class='exercise-list__img'
              src='${gifUrl}'
              alt='foto'
              loading='lazy'
            />   </div>
   <h2 class='exercise-list__title'>${name}</h2>
    <div class="rating_value">${ratingStars}</div>
    <div class="line"></div> 
    <div class="start" >
    <ul class="start-body-rate">
        <li class ="start-body">target:<span> ${target}</span></li>
        <li class ="start-body">bodyPart: <span>${bodyPart}</span></li>
        <li class ="start-body">equipment: <span>${equipment}</span></li>
        <li class ="start-body">popularity:<span> ${popularity}</span></li>
        </ul>
        <li class ="start-calories">burnedCalories:<span> ${burnedCalories}</span></li>
        </div> 
        <div class="line"></div>
        <p class="description">description:${description}</p>
        
    </div>`;
  }
  
}


