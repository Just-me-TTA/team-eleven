const btnCategories = document.querySelectorAll(".btn-categories");
const containerForImages = document.querySelector('.js-container-for-images');
const bodyPartsFilterButton = document.getElementById('bodyPartsFilterButton');
// Зробіть кнопку "Body parts" активною

bodyPartsFilterButton.classList.add('active');

// Отримайте категорії для фільтру "Body parts" і вставте їх у блок
fetch('https://your-energy.b.goit.study/api/filters?filter=Body parts')
  .then(response => response.json())
    .then(data => {
        let results = data.results;
        let resultsHtml = results.map(({ filter, imgURL, name }) => {
        return  ` <div class="gallery__item">
            <a class="gallery__link" href="#">
                <img
                class="gallery__image"
                src="${imgURL   }"
                alt="${name}"
                />
            </a>
            <p class="textImage">${name}</p>
            <p class="filterImage">${filter}</p>
            </div>` ;
            

   }).join('');
    containerForImages.insertAdjacentHTML('beforeend', resultsHtml);

    
  })
  .catch(error => {
    console.error('Помилка при отриманні категорій: ', error);
  });

// Define the click event handler function.
function handleClick(event) {

    // Define the URL of the backend API or server. 
    const apiUrl = new URL('https://your-energy.b.goit.study/api/filters');
    const params = new URLSearchParams();

    const element = event.target;
    const categoryFilterValue = element.dataset.cgid;
    
    params.append('filter', categoryFilterValue);
    params.append('page', 1);
    params.append('limit', 12);

    apiUrl.search = params.toString();

    // Make a GET request to the backend. 
    fetch(apiUrl) 
    .then(response => { 
        // Check if the response status indicates success (e.g., 200 OK). 
        if (response.status === 200) { 
        // Parse the response data as JSON. 
        return response.json(); 
        } else { 
        // Handle non-successful response (e.g., display an error message). 
        throw new Error('Request failed'); 
        } 
    }) 
    .then(data => { 
        // Process the data received from the backend. 
        console.log(data);
        handleRespons(data); // You can do something with the data here.
    }) 
    .catch(error => { 
        // Handle any errors that occurred during the request. 
        console.error('Error:', error); 
    });
}

// Add the click event to each selected element.
btnCategories.forEach(function (element) {
  element.addEventListener('click', handleClick);
});

function handleRespons(data) {
    let results = data.results;
   let resultsHtml = results.map(({ filter, imgURL, name }) => {
      return  ` <div class="gallery__item">
        <a class="gallery__link" href="#">
            <img
            class="gallery__image"
            src="${imgURL   }"
            alt="${name}"
            />
        </a>
        <p class="textImage">${name}</p>
        <p class="filterImage">${filter}</p>
        </div>` ;
        

   }).join('');
    containerForImages.innerHTML = '';
    containerForImages.insertAdjacentHTML('beforeend', resultsHtml);

}

