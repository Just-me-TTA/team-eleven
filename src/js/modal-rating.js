// "use strict"

import axios from 'axios';



const ratings = document.querySelectorAll('.rating');

if (ratings.length > 0) {
    initRatings();
}

function initRatings() {
    let ratingActive, ratingValue;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }

    // concrete initialisation

    function initRating(rating) {
        initRatingVars(rating);

        setRatingActiveWidth();

        if (rating.classList.contains('rating_set')) {
            setRating(rating);
        }
    }

    // initialisation

    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }

    // changing width

    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const RatingActiveWidth = index / 0.05;
        ratingActive.style.width = `${RatingActiveWidth}%`;
    }

// showing grade
    function setRating(rating) {
const ratingItems = rating.querySelectorAll(".rating__item");

for (let index = 0; index < ratingItems.length; index ++) {
    const ratingItem = ratingItems[index];

    ratingItem.addEventListener("mouseenter", function (e) {
        initRatingVars(rating);
        setRatingActiveWidth(ratingItem.value);
    });

    ratingItem.addEventListener("mouseleave", function(e){
        setRatingActiveWidth();
    });
    ratingItem.addEventListener("click", function(e) {
        initRatingVars(rating);

        if(rating.dataset.ajax) {
            setRatingValue(ratingItem.value, rating)
        } else {
            ratingValue.innerHTML = index + 1;
            setRatingActiveWidth();
        }
    })
    }
    }
}
function closeRatingModal() {
    const ratingModal = document.getElementById('ratingModal');
    ratingModal.classList.remove('is-open');
}

// close btn

const ratingModal = document.getElementById('ratingModal');
const closeModalInputBtn = document.querySelector(".close-modal-btn")

closeModalInputBtn.addEventListener("click", closeModalInput);


function closeModalInput() {
    ratingModal.classList.remove('is-open');
}


// feedback form



const refs = {
form: document.querySelector('.js-form'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit (evt) {
evt.preventDefault();

console.log(evt.currentTarget.elements)
 const { email, comment,} = evt.currentTarget.elements

 const userData = {
    email:  email.value,
    comment: comment.value,
    // rating: rating.value,
 };

 serviceQuest(userData).then(() => alert("Success!")).catch(() => alert("Oops! Check the information"))
 
}


function serviceQuest(data) {
    return axios.post(`https://your-energy.b.goit.study/api/exercises/${id}/rating`, data);
   }


