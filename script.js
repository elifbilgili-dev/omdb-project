
const movieInput = document.getElementById("movieInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");

const movieCard = document.getElementById("movieCard");
const moviePoster = document.getElementById("moviePoster");
const movieTitle = document.getElementById("movieTitle");
const movieYear = document.getElementById("movieYear");
const movieGenre = document.getElementById("movieGenre");
const movieDirector = document.getElementById("movieDirector");
const movieRating = document.getElementById("movieRating");

const apiKey = "424c1f6b";

async function searchMovie(movieName) {
  message.textContent = "";
  movieCard.classList.add("hidden");

  if (!movieName) {
    message.textContent = "Please enter a movie name.";
    return;
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Response === "False") {
      message.textContent = data.Error;
      return;
    }

    moviePoster.src = data.Poster !== "N/A" ? data.Poster : "";
    moviePoster.alt = data.Title;
    movieTitle.textContent = data.Title;
    movieYear.textContent = data.Year;
    movieGenre.textContent = data.Genre;
    movieDirector.textContent = data.Director;
    movieRating.textContent = data.imdbRating;

    movieCard.classList.remove("hidden");

    localStorage.setItem("lastMovie", movieName);
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
  }
}

searchBtn.addEventListener("click", () => {
  const movieName = movieInput.value.trim();
  searchMovie(movieName);
});

window.addEventListener("load", () => {
  const lastMovie = localStorage.getItem("lastMovie");
  if (lastMovie) {
    movieInput.value = lastMovie;
    searchMovie(lastMovie);
  }
});