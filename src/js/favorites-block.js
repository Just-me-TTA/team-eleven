let favoriteIdList = [];

function loadFavoritesFromLocalStorage() {
  const favoriteData = localStorage.getItem('LS_FAVORITES_ID');
  if (favoriteData) {
    favoriteIdList = JSON.parse(favoriteData);
  } else {
    favoriteIdList = [];
  }
}

