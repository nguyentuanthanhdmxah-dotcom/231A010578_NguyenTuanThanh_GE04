// DATA
const movies = [
  {
    title: "Titanic",
    year: 1997,
    genre: ["Romance", "Drama"],
    poster: "images/titanic.jpg",
    description: "Phim tình cảm nổi tiếng về con tàu Titanic",
    director: "James Cameron",
    cast: ["Leonardo DiCaprio", "Kate Winslet"]
  },
  {
    title: "The Avengers",
    year: 2012,
    genre: ["Action", "Sci-Fi"],
    poster: "images/avengers.jpg",
    description: "Siêu anh hùng Marvel hợp sức bảo vệ Trái Đất",
    director: "Joss Whedon",
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"]
  },
  {
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    poster: "images/inception.jpg",
    description: "Một chuyên gia đánh cắp bí mật qua giấc mơ",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: ["Sci-Fi", "Drama"],
    poster: "images/interstellar.jpg",
    description: "Hành trình vượt không gian và thời gian để cứu Trái Đất",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway"]
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    poster: "images/darkknight.jpg",
    description: "Batman đối mặt với Joker để bảo vệ Gotham",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger"]
  }
];

// ELEMENT
const movieList = document.getElementById("movieList");
const genreList = document.getElementById("genreList");
const searchInput = document.getElementById("searchInput");

// RENDER MOVIES
function renderMovies(data) {
  movieList.innerHTML = "";

  data.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.poster}" alt="Poster ${movie.title}">
      <h4>${movie.title}</h4>
      <p>${movie.year}</p>
    `;

    card.onclick = () => showModal(movie);
    movieList.appendChild(card);
  });
}

// GENRES AUTO
function renderGenres() {
  const genres = [...new Set(movies.flatMap(m => m.genre))];

  genres.forEach(g => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${g}"> ${g}`;
    genreList.appendChild(label);
  });
}

// FILTER + SEARCH
function filterMovies() {
  const keyword = searchInput.value.toLowerCase();
  const checked = [...document.querySelectorAll("input[type=checkbox]:checked")].map(cb => cb.value);

  const result = movies.filter(m => {
    const matchName = m.title.toLowerCase().includes(keyword);
    const matchGenre = checked.length === 0 || checked.some(g => m.genre.includes(g));
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
  modal.setAttribute('aria-hidden', 'false');

  modalBody.innerHTML = `
    <h2 id="modalTitle">${movie.title}</h2>
    <img src="${movie.poster}" alt="Poster phim ${movie.title}">
    <p><strong>Mô tả:</strong> ${movie.description}</p>
    <p><strong>Đạo diễn:</strong> ${movie.director}</p>
    <p><strong>Diễn viên:</strong> ${movie.cast ? movie.cast.join(", ") : "Chưa cập nhật"}</p>
    <p><strong>Thể loại:</strong> ${movie.genre.join(", ")}</p>
    <p><strong>Năm phát hành:</strong> ${movie.year}</p>
  `;
}

document.getElementById("closeModal").onclick = () => {
  modal.classList.add("hidden");
};

// DARK MODE
const toggleBtn = document.getElementById("toggleTheme");
toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

// LOAD THEME
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// INIT
renderGenres();
renderMovies(movies);
