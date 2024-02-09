const apiChuckNorris = 'https://api.chucknorris.io/jokes/random';
const apiRandomImage = 'https://source.unsplash.com/800x600/?';
var history = [];

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
   saveHistory();
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

function saveHistory() {
   history.push(document.querySelector('#search-input').value);

}

function closeModal() {
   document.querySelector('.modal').style.display = "none";
}

function search() {
   document.querySelector('.modal').style.display = 'block';
   getJoke();
   getImage();
}