// DATA - 5 phim, link ảnh trực tuyến
const movies = [
  {
    title: "Titanic",
    year: 1997,
    genre: ["Romance", "Drama"],
    poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Titanic_poster.jpg",
    description: "Phim tình cảm nổi tiếng về con tàu Titanic.",
    director: "James Cameron",
    actors: "Leonardo DiCaprio, Kate Winslet"
  },
  {
    title: "The Avengers",
    year: 2012,
    genre: ["Action", "Sci-Fi"],
    poster: "https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg",
    description: "Các siêu anh hùng Marvel hợp lực bảo vệ Trái Đất.",
    director: "Joss Whedon",
    actors: "Robert Downey Jr., Chris Evans, Scarlett Johansson"
  },
  {
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    poster: "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",
    description: "Một nhóm đánh cắp ý tưởng qua giấc mơ.",
    director: "Christopher Nolan",
    actors: "Leonardo DiCaprio, Joseph Gordon-Levitt"
  },
  {
    title: "Joker",
    year: 2019,
    genre: ["Drama", "Thriller"],
    poster: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg",
    description: "Câu chuyện về nguồn gốc của Joker.",
    director: "Todd Phillips",
    actors: "Joaquin Phoenix, Robert De Niro"
  },
  {
    title: "Frozen",
    year: 2013,
    genre: ["Animation", "Family", "Adventure"],
    poster: "https://upload.wikimedia.org/wikipedia/en/0/05/Frozen_%282013_film%29.jpg",
    description: "Cuộc phiêu lưu kỳ diệu của hai chị em Elsa và Anna.",
    director: "Chris Buck, Jennifer Lee",
    actors: "Kristen Bell, Idina Menzel"
  }
];

// ELEMENTS
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
      <img src="${movie.poster}" alt="${movie.title}">
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
  modalBody.innerHTML = `
    <h2>${movie.title} (${movie.year})</h2>
    <img src="${movie.poster}" alt="${movie.title}">
    <p><strong>Mô tả:</strong> ${movie.description}</p>
    <p><strong>Đạo diễn:</strong> ${movie.director}</p>
    <p><strong>Diễn viên:</strong> ${movie.actors}</p>
    <p><strong>Thể loại:</strong> ${movie.genre.join(", ")}</p>
  `;
}

document.getElementById("closeModal").onclick = () => modal.classList.add("hidden");

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
