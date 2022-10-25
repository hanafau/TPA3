const API_KEY = "api_key=e8d560a7d2bc24c27c1efee6bd41ca3e";
const BASE_URL = "https://api.themoviedb.org/3";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date } = movie;
    const movie1 = document.createElement("div");
    movie1.classList.add("movie");
    movie1.innerHTML = `
        <img
          src="${IMG_URL + poster_path}"
          alt="image"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="green">${vote_average}</span>
        </div>
        <div class="overview">${release_date}</div>
        `;
    main.appendChild(movie1);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
