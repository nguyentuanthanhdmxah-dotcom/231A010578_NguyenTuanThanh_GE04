// ===== DỮ LIỆU PHIM =====
const movies = [
  { title: "Titanic", year: 1997, genre: ["Romance", "Drama"], poster: "images/titanic.jpg", description: "Phim tình cảm nổi tiếng.", director: "James Cameron", actors: "Leonardo DiCaprio, Kate Winslet" },
  { title: "The Avengers", year: 2012, genre: ["Action", "Sci-Fi"], poster: "images/avengers.jpg", description: "Siêu anh hùng Marvel.", director: "Joss Whedon", actors: "Robert Downey Jr., Chris Evans" },
  { title: "Inception", year: 2010, genre: ["Action", "Sci-Fi", "Thriller"], poster: "images/inception.jpg", description: "Kẻ đánh cắp giấc mơ.", director: "Christopher Nolan", actors: "Leonardo DiCaprio, Joseph Gordon-Levitt" },
  { title: "Joker", year: 2019, genre: ["Drama", "Crime"], poster: "images/joker.jpg", description: "Nguồn gốc Joker.", director: "Todd Phillips", actors: "Joaquin Phoenix" },
  { title: "Avatar", year: 2009, genre: ["Action", "Adventure", "Sci-Fi"], poster: "images/avatar.jpg", description: "Hành tinh Pandora.", director: "James Cameron", actors: "Sam Worthington, Zoe Saldana" },
  { title: "Interstellar", year: 2014, genre: ["Adventure", "Drama", "Sci-Fi"], poster: "images/interstellar.jpg", description: "Hành trình vượt thời gian.", director: "Christopher Nolan", actors: "Matthew McConaughey, Anne Hathaway" },
  { title: "Thor", year: 2011, genre: ["Action", "Fantasy"], poster: "images/thor.jpg", description: "Thần sấm Marvel.", director: "Kenneth Branagh", actors: "Chris Hemsworth" },
  { title: "Batman", year: 2008, genre: ["Action", "Crime"], poster: "images/batman.jpg", description: "Người Dơi.", director: "Christopher Nolan", actors: "Christian Bale, Heath Ledger" },
  { title: "Black Widow", year: 2021, genre: ["Action", "Adventure"], poster: "images/blackwidow.jpg", description: "Siêu điệp viên Natasha.", director: "Cate Shortland", actors: "Scarlett Johansson" },
  { title: "The Matrix", year: 1999, genre: ["Action", "Sci-Fi"], poster: "images/matrix.jpg", description: "Thế giới ảo.", director: "Lana Wachowski, Lilly Wachowski", actors: "Keanu Reeves, Laurence Fishburne" },
  { title: "Frozen", year: 2013, genre: ["Animation", "Family"], poster: "images/frozen.jpg", description: "Câu chuyện Elsa và Anna.", director: "Chris Buck, Jennifer Lee", actors: "Kristen Bell, Idina Menzel" }
];

// ===== ELEMENT =====
const movieList = document.getElementById("movieList");
const genreList = document.getElementById("genreList");
const searchInput = document.getElementById("searchInput");

// ===== RENDER MOVIES =====
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

// ===== RENDER GENRES =====
function renderGenres() {
  const genres = [...new Set(movies.flatMap(m => m.genre))];
  genres.forEach(g => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${g}"> ${g}`;
    genreList.appendChild(label);
  });
}

// ===== FILTER + SEARCH =====
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

// ===== DEBOUNCE =====
function debounce(fn, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

searchInput.addEventListener("input", debounce(filterMovies, 400));
document.addEventListener("change", filterMovies);

// ===== MODAL =====
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

function showModal(movie) {
  modal.classList.remove("hidden");
  modalBody.innerHTML = `
    <h2>${movie.title} (${movie.year})</h2>
    <img src="${movie.poster}" alt="${movie.title}">
    <p><strong>Thể loại:</strong> ${movie.genre.join(", ")}</p>
    <p><strong>Đạo diễn:</strong> ${movie.director}</p>
    <p><strong>Diễn viên:</strong> ${movie.actors}</p>
    <p><strong>Mô tả:</strong> ${movie.description}</p>
  `;
}

closeModalBtn.onclick = () => modal.classList.add("hidden");
modal.onclick = (e) => { if(e.target===modal) modal.classList.add("hidden"); };

// ===== DARK MODE =====
const toggleBtn = document.getElementById("toggleTheme");
toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

if(localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// ===== INIT =====
renderGenres();
renderMovies(movies);
