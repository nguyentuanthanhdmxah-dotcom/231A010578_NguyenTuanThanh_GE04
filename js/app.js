// DATA PHIM
const movies = [
  {
    title: "Titanic",
    year: 1997,
    genre: ["Romance", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    description: "Một chuyện tình lãng mạn trên con tàu Titanic huyền thoại.",
    director: "James Cameron",
    actors: ["Leonardo DiCaprio", "Kate Winslet"]
  },
  {
    title: "The Avengers",
    year: 2012,
    genre: ["Action", "Sci-Fi"],
    poster: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    description: "Siêu anh hùng Marvel hợp sức bảo vệ thế giới khỏi mối nguy hiểm lớn.",
    director: "Joss Whedon",
    actors: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"]
  },
  {
    title: "Inception",
    year: 2010,
    genre: ["Sci-Fi", "Action"],
    poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    description: "Một nhóm tội phạm chuyên xâm nhập giấc mơ để đánh cắp thông tin.",
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]
  },
  {
    title: "Parasite",
    year: 2019,
    genre: ["Drama", "Thriller"],
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    description: "Một gia đình nghèo dần thâm nhập vào gia đình giàu có, gây ra nhiều bi kịch.",
    director: "Bong Joon-ho",
    actors: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"]
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: ["Sci-Fi", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    description: "Một nhóm nhà khoa học du hành xuyên không gian để tìm kiếm nơi sống mới cho nhân loại.",
    director: "Christopher Nolan",
    actors: ["Matthew McConaughey", "Anne Hathaway"]
  },
  {
    title: "Joker",
    year: 2019,
    genre: ["Drama", "Thriller"],
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    description: "Câu chuyện khai sinh của gã hề tội ác Joker.",
    director: "Todd Phillips",
    actors: ["Joaquin Phoenix"]
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description: "Batman phải đối đầu với Joker để bảo vệ Gotham.",
    director: "Christopher Nolan",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  },
  {
    title: "Avatar",
    year: 2009,
    genre: ["Sci-Fi", "Action"],
    poster: "https://image.tmdb.org/t/p/w500/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg",
    description: "Chuyện về hành tinh Pandora và cuộc chiến sinh tồn giữa con người và người Na'vi.",
    director: "James Cameron",
    actors: ["Sam Worthington", "Zoe Saldana"]
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    genre: ["Action", "Sci-Fi"],
    poster: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    description: "Các siêu anh hùng tập hợp để đảo ngược thảm họa do Thanos gây ra.",
    director: "Anthony Russo, Joe Russo",
    actors: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"]
  },
  {
    title: "La La Land",
    year: 2016,
    genre: ["Romance", "Drama", "Musical"],
    poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    description: "Một câu chuyện tình yêu lãng mạn giữa nhạc sĩ jazz và nữ diễn viên trẻ.",
    director: "Damien Chazelle",
    actors: ["Ryan Gosling", "Emma Stone"]
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
    div.innerHTML = `<input type="checkbox" value="${g}"> ${g}`;
    genreList.appendChild(div);
  });
}

// FILTER MOVIES
function filterMovies() {
  const keyword = searchInput.value.toLowerCase();
  const checked = [...document.querySelectorAll("#genreList input:checked")].map(cb => cb.value);

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
    <p><b>Mô tả:</b> ${movie.description}</p>
    <p><b>Đạo diễn:</b> ${movie.director}</p>
    <p><b>Diễn viên:</b> ${movie.actors.join(", ")}</p>
    <p><b>Thể loại:</b> ${movie.genre.join(", ")}</p>
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
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// INIT
renderGenres();
renderMovies(movies);
