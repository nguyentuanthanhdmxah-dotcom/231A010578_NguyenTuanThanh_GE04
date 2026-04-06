const movies = [
  {
    title: "Titanic",
    year: 1997,
    genre: ["Romance", "Drama"],
    poster: "images/titanic.jpg",
    description: "Phim tình cảm nổi tiếng",
    director: "James Cameron"
  },
  {
    title: "The Avengers",
    year: 2012,
    genre: ["Action", "Sci-Fi"],
    poster: "images/avengers.jpg",
    description: "Siêu anh hùng Marvel",
    director: "Joss Whedon"
  },
  {
    title: "Inception",
    year: 2010,
    genre: ["Sci-Fi", "Action"],
    poster: "images/inception.jpg",
    description: "Giấc mơ trong giấc mơ",
    director: "Christopher Nolan"
  },
  {
    title: "Parasite",
    year: 2019,
    genre: ["Drama"],
    poster: "images/parasite.jpg",
    description: "Phim đoạt Oscar",
    director: "Bong Joon-ho"
  }
];

const movieList = document.getElementById("movieList");
const genreList = document.getElementById("genreList");
const searchInput = document.getElementById("searchInput");

// HIỂN THỊ PHIM
function renderMovies(data) {
  movieList.innerHTML = "";

  if (data.length === 0) {
    movieList.innerHTML = "<p>Không tìm thấy phim</p>";
    return;
  }

  data.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.poster}">
      <h4>${movie.title}</h4>
      <p>${movie.year}</p>
    `;

    card.onclick = () => showModal(movie);

    movieList.appendChild(card);
  });
}

// TẠO THỂ LOẠI
function renderGenres() {
  const genres = [...new Set(movies.flatMap(m => m.genre))];

  genres.forEach(g => {
    const div = document.createElement("div");
    div.innerHTML = `
      <input type="checkbox" value="${g}"> ${g}
    `;
    genreList.appendChild(div);
  });
}

// FILTER + SEARCH
function filterMovies() {
  const keyword = searchInput.value.toLowerCase();

  const checked = [...document.querySelectorAll("#genreList input:checked")]
    .map(cb => cb.value);

  const result = movies.filter(m => {
    const matchName = m.title.toLowerCase().includes(keyword);

    const matchGenre =
      checked.length === 0 ||
      checked.some(g => m.genre.includes(g));

    return matchName && matchGenre;
  });

  renderMovies(result);
}

// DEBOUNCE
function debounce(fn, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

searchInput.addEventListener("input", debounce(filterMovies, 400));
document.addEventListener("change", filterMovies);

// MODAL
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

function showModal(movie) {
  modal.classList.remove("hidden");

  modalBody.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="${movie.poster}" width="200">
    <p>${movie.description}</p>
    <p><b>Đạo diễn:</b> ${movie.director}</p>
  `;
}

document.getElementById("closeModal").onclick = () => {
  modal.classList.add("hidden");
};

// DARK MODE
const toggleBtn = document.getElementById("toggleTheme");

toggleBtn.onclick = () => {
  document.body.classList.toggle("dark-mode");

  localStorage.setItem("theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// INIT
renderGenres();
renderMovies(movies);
