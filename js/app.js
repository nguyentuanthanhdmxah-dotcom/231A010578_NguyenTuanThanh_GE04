// Dữ liệu phim
const movies = [
  {
    title: "Titanic",
    year: 1997,
    genre: ["Romance", "Drama"],
    poster: "images/titanic.jpg",
    description: "Phim tình cảm nổi tiếng kể về câu chuyện tình yêu trên con tàu Titanic.",
    director: "James Cameron",
    cast: ["Leonardo DiCaprio", "Kate Winslet"]
  },
  {
    title: "The Avengers",
    year: 2012,
    genre: ["Action", "Sci-Fi"],
    poster: "images/avengers.jpg",
    description: "Siêu anh hùng Marvel hợp sức cứu thế giới khỏi kẻ thù hùng mạnh.",
    director: "Joss Whedon",
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"]
  },
  {
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    poster: "images/inception.jpg",
    description: "Giấc mơ trong giấc mơ, hành trình chạm đến tiềm thức.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    poster: "images/interstellar.jpg",
    description: "Cuộc hành trình vượt không gian và thời gian để cứu nhân loại.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway"]
  },
  {
    title: "Joker",
    year: 2019,
    genre: ["Drama", "Crime", "Thriller"],
    poster: "images/joker.jpg",
    description: "Câu chuyện đen tối về nguồn gốc nhân vật Joker.",
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix"]
  },
  {
    title: "Spider-Man: No Way Home",
    year: 2021,
    genre: ["Action", "Adventure", "Sci-Fi"],
    poster: "images/spiderman.jpg",
    description: "Cuộc phiêu lưu mới của Người Nhện xuyên đa vũ trụ.",
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya"]
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    poster: "images/darkknight.jpg",
    description: "Batman đối đầu với Joker trong cuộc chiến giành Gotham.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger"]
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    genre: ["Action", "Adventure", "Sci-Fi"],
    poster: "images/endgame.jpg",
    description: "Cuộc chiến cuối cùng của các siêu anh hùng Avengers.",
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"]
  },
  {
    title: "Jumanji: Welcome to the Jungle",
    year: 2017,
    genre: ["Adventure", "Comedy", "Fantasy"],
    poster: "images/jumanji.jpg",
    description: "Nhóm bạn bị cuốn vào trò chơi Jumanji đầy bí ẩn.",
    director: "Jake Kasdan",
    cast: ["Dwayne Johnson", "Kevin Hart"]
  }
];

// ELEMENTS
const movieList = document.getElementById("movieList");
const genreList = document.getElementById("genreList");
const searchInput = document.getElementById("searchInput");

// HIỂN THỊ PHIM
function renderMovies(data) {
  movieList.innerHTML = "";

  if(data.length === 0){
    movieList.innerHTML = "<p>Không tìm thấy phim phù hợp.</p>";
    return;
  }

  data.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.poster}" alt="Poster phim ${movie.title}">
      <h4>${movie.title}</h4>
      <p>${movie.year}</p>
    `;

    card.onclick = () => showModal(movie);

    movieList.appendChild(card);
  });
}

// TỰ ĐỘNG LẤY THỂ LOẠI
function renderGenres() {
  const genres = [...new Set(movies.flatMap(m => m.genre))];
  genreList.innerHTML = "";

  genres.forEach(g => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" value="${g}"> ${g}
    `;
    genreList.appendChild(label);
  });
}

// LỌC VÀ TÌM KIẾM PHIM
function filterMovies() {
  const keyword = searchInput.value.toLowerCase();
  const checkedGenres = [...document.querySelectorAll("#genreList input[type=checkbox]:checked")].map(cb => cb.value);

  const filtered = movies.filter(movie => {
    const matchName = movie.title.toLowerCase().includes(keyword);
    const matchGenre = checkedGenres.length === 0 || checkedGenres.some(g => movie.genre.includes(g));
    return matchName && matchGenre;
  });

  renderMovies(filtered);
}

// DEBOUNCE (tránh gọi filter quá nhanh)
function debounce(fn, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

// MODAL
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

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

// Đóng modal
closeModalBtn.onclick = () => {
  modal.classList.add("hidden");
  modal.setAttribute('aria-hidden', 'true');
};

// Đóng modal khi click ra ngoài vùng nội dung
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.setAttribute('aria-hidden', 'true');
  }
};

// DARK MODE
const toggleBtn = document.getElementById("toggleTheme");

toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

// LOAD THEME LƯU TRỮ
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️";
} else {
  toggleBtn.textContent = "🌙";
}

// EVENT LISTENERS
searchInput.addEventListener("input", debounce(filterMovies, 400));
genreList.addEventListener("change", filterMovies);

// KHỞI TẠO
renderGenres();
renderMovies(movies);
