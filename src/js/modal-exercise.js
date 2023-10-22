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

const { addFavoriteButton, giveRatingButton, openModalBtn, exerciseList, modal, closeModalBtn } = ref;
let isModalOpen = false;

function openExerciseModal() {
    if (!isModalOpen) {
        const exerciseID = '64f389465ae26083f39b17a2'; // ID вправи
        fetchExerciseData(exerciseID)
            .then(data => {
                const exerciseMarkup = createExerciseMarkup(data);
                exerciseList.innerHTML = exerciseMarkup;

                addFavoriteButton.classList.remove('is-hidden');
                giveRatingButton.classList.remove('is-hidden');
            });

        isModalOpen = true;  
        modal.classList.add('is-open');
        closeModalBtn.addEventListener('click', closeExerciseModal);
        window.addEventListener('keydown', handleEscKey);
    }
}

function closeExerciseModal() {
    modal.classList.remove('is-open');
    addFavoriteButton.classList.add('is-hidden');
    giveRatingButton.classList.add('is-hidden');
    isModalOpen = false;

    // Зняття обробників подій при закритті
    modal.removeEventListener('click', closeExerciseModal);
    closeModalBtn.removeEventListener('click', closeExerciseModal);
    window.removeEventListener('keydown', handleEscKey);
}

// Функція для закриття модального вікна при натисканні клавіші ESC
function handleEscKey(event) {
    if (event.key === 'Escape') {
        closeExerciseModal();
    }
}

// Додавання обробника події для кнопки "Відкрити модальне вікно"
openModalBtn.addEventListener('click', openExerciseModal);

async function fetchExerciseData(exerciseID) {
    try {
        const response = await axios.get(`${API_URL}/${exerciseID}`);
        return response.data;
    } catch (error) {
        console.error('Помилка запиту до API:', error);
        return null;
    }
}

function createRatingStars(rating) {
    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating-container');

    // Розрахунок кількості повних та напівзаповнених зірок
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.1 && rating % 1 <= 0.9;

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        if (i < fullStars) {
            star.classList.add('yellow-star');
        } else if (i === fullStars && hasHalfStar) {
            star.classList.add('half-filled-star');
        } else {
            star.classList.add('gray-star');
        }

        ratingContainer.appendChild(star);
    }

    return ratingContainer;
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

        return `<section class="modal-exercise container-wide">
            <div class="exercise-wrap">
                <img class="exercise-list__img" src="${gifUrl}" alt="foto" loading="lazy" />
            </div>
            <div class="exercise-details">
                <h2 class="exercise-list__title">${name}</h2>
              <div class="rating_value"><span> ${rating}</span> ${ratingStars.outerHTML}</div>
                <div class="line"></div>
                <div class="start">
                    <ul class="start-body-rate">
                        <li class="start-body">target: <span>${target}</span></li>
                        <li class="start-body">bodyPart: <span>${bodyPart}</span></li>
                        <li class="start-body">equipment: <span>${equipment}</span></li>
                        <li class="start-body">popularity:<span>${popularity}</span></li>
                    </ul>
                    <li class="start-calories">burnedCalories:<span>${burnedCalories}</span></li>
                </div>
                <div class="line"></div>
                <p class="description">description:${description}</p>
            </div>
        </section>`;
    }
}
