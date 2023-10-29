import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import axios from 'axios';



const BASE_URL = 'https://your-energy.b.goit.study/api';

// Отримати дані з локального сховища
let favoriteIdList = JSON.parse(localStorage.getItem('LS_FAVORITES_ID'));
if (favoriteIdList && Array.isArray(favoriteIdList)) {
    console.log(favoriteIdList);
} else {
    console.log("Error.");
}

const exerciseList = document.querySelector('.exercise-list'); 

async function fetchAndDisplayExercises() {
    for (const exerciseId of favoriteIdList) {
        try {
            const response = await axios.get(`${BASE_URL}/exercises/${exerciseId}`);
            const data = response.data;

            if (data) {
                handleResponseEx(data);
            } else {
                console.error('Wrong params:', data);
            }
        } catch (error) {
            console.error('Error requesting data rejection: ', error);
        }
    }
}

fetchAndDisplayExercises();

function handleResponseEx(data) {
    const { bodyPart, burnedCalories, name, rating, target, time, _id } = data;
    let exerciseId = _id;
    let exerciseHtml = `<li class="exercise-list">
        <div class="rating-start-exercise">
            <div class="rating-start-exercise-wrap">
                <p class="workout">Workout</p>
                <p class="rating-exercise-card"></p><svg class="icon-star-exercises" width="18" height="18" fill="rgba(238, 161, 12, 1)">
          <use href="./img/iconfull.svg#icon-star"></use></svg>
          <button type="button"class="openModalBtn">Start<svg class="icon-right-arrow" width="18" height="18" stroke="black"><use href="./img/iconfull.svg#icon-right-arrow"></use></svg></button> </div>
           <div class = "title-exercise-wrap">
            <svg class="icon-title-exercises" width="24" height="24" stroke="black">
                <use href="./img/iconfull.svg#icon-run-men"></use>
          </svg>     
          <h2 class="title-exercise">${name}</h2>
            </div>
             <div class="calories-target">
                <p class="burned-calories">BurnedCalories: ${burnedCalories}/<span class="time-exercise">${time}</span></p>
                <p class="part-exercise">Bodypart: ${bodyPart}</p>
                <p class="target">Target: ${target}</p>
        </div>
        </div>
    </li>`;

    exerciseList.innerHTML += exerciseHtml;
}