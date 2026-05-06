const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieCard = document.getElementById("movieCard");
const errorMessage = document.getElementById("errorMessage");

const API_KEY = "424c1f6b";

function searchMovie() {
  const movieName = searchInput.value.trim();

  if (movieName === "") {
    showError("Please enter a movie name.");
    return;
  }

  localStorage.setItem("lastSearch", movieName);
  findMovie(movieName);
}

async function findMovie(movieName) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      showError("Movie not found. Please try another title.");
      return;
    }

    showMovie(data);

  } catch (error) {
    showError("Something went wrong. Please check your internet connection.");
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  movieCard.classList.add("hidden");
}

function clearScreen() {
  errorMessage.classList.add("hidden");
  movieCard.classList.add("hidden");
}

function showMovie(movie) {
  clearScreen();

  const poster = movie.Poster !== "N/A" 
    ? movie.Poster 
    : "https://via.placeholder.com/150x220?text=No+Poster";

  movieCard.innerHTML = `
    <img src="${poster}" alt="${movie.Title} poster" />
    <div class="movie-info">
      <h2>${movie.Title}</h2>
      <p><span>Year:</span> ${movie.Year}</p>
      <p><span>Genre:</span> ${movie.Genre}</p>
      <p><span>Director:</span> ${movie.Director}</p>
      <p><span>IMDB Rating:</span> ${movie.imdbRating}</p>
      <p><span>Plot:</span> ${movie.Plot}</p>
    </div>
  `;

  movieCard.classList.remove("hidden");
}

searchBtn.addEventListener("click", function() {
  clearScreen();
  searchMovie();
});

searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    clearScreen();
    searchMovie();
  }
});

window.addEventListener("load", function() {
  const lastSearch = localStorage.getItem("lastSearch");

  if (lastSearch) {
    searchInput.value = lastSearch;
    findMovie(lastSearch);
  }
});