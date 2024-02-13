const apiChuckNorris = 'https://api.chucknorris.io/jokes/random';
const apiRandomImage = 'https://source.unsplash.com/800x600/?';

document.addEventListener('DOMContentLoaded', () => {
    loadHistory();

    // Add event listener for 'Enter' key on the search input
    document.getElementById('search-input').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            search();
        }
    });
});


function getJoke() {
   fetch(apiChuckNorris)
   .then(function (response) {
      if (!response.ok) {
         throw new Error('Network response was not ok');
      }
      return response.json();
   })
   .then(function (data) {
      document.querySelector('#chuckText').textContent = data.value;
   })
   .catch(function (error) {
      console.error('Error:', error);
   });
}

function getImage() {
   fetch(apiRandomImage + document.querySelector('#search-input').value)
   .then(function (response) {
      if (!response.ok) {
         throw new Error('Network response was not ok');
      }
      return response;
   })
   .then(function (data) {
      document.querySelector('#searchedImage').src = data.url;
   })
   .catch(function (error) {
      console.error('Error:', error);
   });
}

function saveToHistory(searchTerm) {
    let history = getHistory();
    history.push(searchTerm);
    history = [...new Set(history)]; // Remove duplicates
    localStorage.setItem('searchHistory', JSON.stringify(history));
    loadHistory();
}

function getHistory() {
    let historyJson = localStorage.getItem('searchHistory');
    return historyJson ? JSON.parse(historyJson) : [];
}

function loadHistory() {
    let historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    let history = getHistory();
    let recentSearches = history.slice(-5);
    history.forEach(searchTerm => {
        let listItem = document.createElement('li');
        listItem.textContent = searchTerm;
        listItem.addEventListener('click', () => {
            document.getElementById('search-input').value = searchTerm;
            search();
        });
        historyList.appendChild(listItem);
    });
}

function closeModal() {
   document.querySelector('.modal').style.display = "none";
}

function search() {
   const searchInput = document.getElementById('search-input');
   const searchTerm = searchInput.value.trim();

   if (searchTerm) {
       saveToHistory(searchTerm);
       document.querySelector('.modal').style.display = 'block';
       getJoke();
       getImage();
   }
}
