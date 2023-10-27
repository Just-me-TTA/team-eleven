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




// const refs = {
// form: document.querySelector('.js-form'),
// };
// let exerciseId = [];


// refs.form.addEventListener('submit', handleSubmit);


// function loadFavoritesFromLocalStorage() {
//   const favoriteData = localStorage.getItem('LS_FAVORITES_ID');
//   if (favoriteData) {
//     exerciseId = JSON.parse(favoriteData);
//   } else {
//     exerciseId = [];
//   }
// }

// function handleSubmit (evt) {
// evt.preventDefault();

// loadFavoritesFromLocalStorage()

//  const { email, comment,} = evt.currentTarget.elements

//  const userData = {
//     email:  email.value,
//     comment: comment.value,
//     exerciseId: exerciseId,
//     // rating: rating.value,
//  };

//  serviceQuest(userData).then(() => alert("Success!")).catch(() => alert("Oops! Check the information"))
 
// }



// function serviceQuest(data, exerciseId) {
//     return axios.post(`https://your-energy.b.goit.study/api/exercises/${exerciseId}/rating`, data);
// }




////////////////////////////////////////////////////
const refs = {
    form: document.querySelector('.js-form'),
  };
  
  let exerciseId = [];
  
  refs.form.addEventListener('submit', handleSubmit);
  
  function loadFavoritesFromLocalStorage() {
    const favoriteData = localStorage.getItem('LS_FAVORITES_ID');
    if (favoriteData) {
      exerciseId = JSON.parse(favoriteData);
    } else {
      exerciseId = [];
    }
  }
  
  function handleSubmit(evt) {
    evt.preventDefault();
  
    loadFavoritesFromLocalStorage();
  
    const { email, comment } = evt.currentTarget.elements;
  
    const userData = {
      email: email.value,
      comment: comment.value,
    };
  
    serviceQuest(userData, exerciseId)
      .then(() => alert('Success!'))
      .then (() => closeModalInput())
      .catch(() => alert('Oops! Check the information'));
  }
  
  function serviceQuest(data, exerciseIds) {
    const url = 'https://your-energy.b.goit.study/api/exercises/rating';
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, exerciseIds }),
    };
  
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((responseData) => {
        console.log(responseData); // Handle the response data as needed
      })
      .catch((error) => {
        console.error(error); // Handle the error
      });
  }