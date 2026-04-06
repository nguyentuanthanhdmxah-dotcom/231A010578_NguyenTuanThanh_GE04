// DỮ LIỆU PHIM
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
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: ["Sci-Fi", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    description: "Cuộc hành trình xuyên vũ trụ",
    director: "Christopher Nolan"
  },
  {
    title: "Spider-Man: No Way Home",
    year: 2021,
    genre: ["Action", "Adventure", "Sci-Fi"],
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    description: "Siêu anh hùng người nhện trở lại",
    director: "Jon Watts"
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description: "Batman đối đầu Joker",
    director: "Christopher Nolan"
  },
  {
    title: "Joker",
    year: 2019,
    genre: ["Crime", "Drama", "Thriller"],
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    description: "Nguồn gốc Joker",
    director: "Todd Phillips"
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    genre: ["Action", "Adventure", "Sci-Fi"],
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    description: "Cuộc chiến cuối cùng của Avengers",
    director: "Anthony Russo, Joe Russo"
  },
  {
    title: "Frozen II",
    year: 2019,
    genre: ["Animation", "Adventure", "Comedy"],
    poster: "https://image.tmdb.org/t/p/w500/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg",
    description: "Cuộc phiêu lưu của Elsa và Anna",
    director: "Chris Buck, Jennifer Lee"
  }
];

// ELEMENTS
const movieList = document.getElementById("movieList");
const genreList = document.getElementById("genreList");
const searchInput = document.getElementById("searchInput");

// RENDER MOVIES
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
      <p>${movie.year}</p>
    `;

    card.onclick = () => showModal(movie);

    movieList.appendChild(card);
  });
}

// RENDER GENRES
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
    <h2>${movie.title}</h2>
    <img src="${movie.poster}" width="200">
    <p>${movie.description}</p>
    <p><b>Đạo diễn:</b> ${movie.director}</p>
    <p><b>Năm phát hành:</b> ${movie.year}</p>
    <p><b>Thể loại:</b> ${movie.genre.join(", ")}</p>
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

// LOAD THEME
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// INIT
renderGenres();
renderMovies(movies);
