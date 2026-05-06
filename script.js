
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieCard = document.getElementById("movieCard");
const errorMessage = document.getElementById("errorMessage");

const API_KEY = "424c1f6b";

function filmiAra() {
  const arananFilm = searchInput.value.trim();

  if (arananFilm === "") {
    hataGoster("Lütfen bir film adı girin.");
    return;
  }
  localStorage.setItem("sonArama", arananFilm);
  filmiBul(arananFilm);
}

async function filmiBul(filmAdi) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(filmAdi)}`;

  try {
    const cevap = await fetch(url);
    const veri = await cevap.json();

    if (veri.Response === "False") {
      hataGoster("Film bulunamadı. Lütfen başka bir isim deneyin.");
      return;
    }

    filmiGoster(veri);

  } catch (hata) {
    hataGoster("Bir hata oluştu. İnternet bağlantınızı kontrol edin.");
  }
}

function hataGoster(mesaj) {
  errorMessage.textContent = mesaj;
  errorMessage.classList.remove("hidden");
  movieCard.classList.add("hidden");
}

function ekraniTemizle() {
  errorMessage.classList.add("hidden");
  movieCard.classList.add("hidden");
}

function filmiGoster(film) {
  ekraniTemizle();

  const poster = film.Poster !== "N/A" ? film.Poster : "https://via.placeholder.com/150x220?text=Poster+Yok";

  movieCard.innerHTML = `
    <img src="${poster}" alt="${film.Title} posteri" />
    <div class="movie-info">
      <h2>${film.Title}</h2>
      <p><span>Yıl:</span> ${film.Year}</p>
      <p><span>Tür:</span> ${film.Genre}</p>
      <p><span>Yönetmen:</span> ${film.Director}</p>
      <p><span>IMDB Puanı:</span> ${film.imdbRating}</p>
      <p><span>Özet:</span> ${film.Plot}</p>
    </div>
  `;

  movieCard.classList.remove("hidden");
}

searchBtn.addEventListener("click", function() {
  ekraniTemizle();
  filmiAra();
});

searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    ekraniTemizle();
    filmiAra();
  }
});

window.addEventListener("load", function() {
  const sonArama = localStorage.getItem("sonArama");
  if (sonArama) {
    searchInput.value = sonArama;
    filmiBul(sonArama);
  }
});