const movies = [
  {
    title: "Titanic",
    year: 1997,
    genre: ["Romance", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    description: "Phim tình cảm nổi tiếng",
    director: "James Cameron"
  },
  {
    title: "The Avengers",
    year: 2012,
    genre: ["Action", "Sci-Fi"],
    poster: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    description: "Siêu anh hùng Marvel",
    director: "Joss Whedon"
  },
  {
    title: "Inception",
    year: 2010,
    genre: ["Sci-Fi", "Action"],
    poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    description: "Giấc mơ trong giấc mơ",
    director: "Christopher Nolan"
  },
  {
    title: "Parasite",
    year: 2019,
    genre: ["Drama"],
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    description: "Phim đoạt Oscar",
    director: "Bong Joon-ho"
  }
];

// DOM elements
const movieList = document.getElementById("movieList");
const genreList = document.getElementById("genreList");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const toggleBtn = document.getElementById("toggleTheme");

// Modal dự án
const projectModal = document.getElementById("projectModal");
const showProjectBtn = document.getElementById("showProjectBtn");
const closeProjectModal = document.getElementById("closeProjectModal");

// Render movie cards
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
      <img src="${movie.poster}" alt="${movie.title}">
      <h4>${movie.title}</h4>
      <p><b>Năm:</b> ${movie.year}</p>
      <p><b>Thể loại:</b> ${movie.genre.join(", ")}</p>
    `;

    card.onclick = () => showModal(movie);
    movieList.appendChild(card);
  });
}

// Render genre checkboxes
function renderGenres() {
  const genres = [...new Set(movies.flatMap(m => m.genre))];
  genres.forEach(g => {
    const div = document.createElement("div");
    div.innerHTML = `<input type="checkbox" value="${g}"> ${g}`;
    genreList.appendChild(div);
  });
}

// Filter movies
function filterMovies() {
  const keyword = searchInput.value.toLowerCase();
  const checked = [...document.querySelectorAll("#genreList input:checked")].map(cb => cb.value);

  const filtered = movies.filter(m => {
    const matchName = m.title.toLowerCase().includes(keyword);
    const matchGenre = checked.length === 0 || checked.some(g => m.genre.includes(g));
    return matchName && matchGenre;
  });

  renderMovies(filtered);
}

// Debounce
function debounce(fn, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

// Event listeners
searchInput.addEventListener("input", debounce(filterMovies, 400));
document.addEventListener("change", filterMovies);

// Show movie modal
function showModal(movie) {
  modal.classList.remove("hidden");
  modalBody.innerHTML = `
    <div class="modal-content">
      <span id="closeModal">&times;</span>
      <h2>${movie.title} (${movie.year})</h2>
      <img src="${movie.poster}" width="250" style="display:block; margin-bottom:15px;">
      <p><b>Thể loại:</b> ${movie.genre.join(", ")}</p>
      <p><b>Mô tả:</b> ${movie.description}</p>
      <p><b>Đạo diễn:</b> ${movie.director}</p>
    </div>
  `;

  document.getElementById("closeModal").onclick = () => {
    modal.classList.add("hidden");
  };
}

// Show project modal
showProjectBtn.onclick = () => {
  projectModal.style.display = "block";
};
closeProjectModal.onclick = () => {
  projectModal.style.display = "none";
};

// Dark/Light mode
toggleBtn.onclick = () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
};
if(localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// Initialize
renderGenres();
renderMovies(movies);
