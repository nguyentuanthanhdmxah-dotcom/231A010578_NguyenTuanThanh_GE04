// DATA: 10 phim
const movies = [
  {title:"Titanic",year:1997,genre:["Romance","Drama"],poster:"https://upload.wikimedia.org/wikipedia/en/2/2e/Titanic_poster.jpg",description:"Phim tình cảm nổi tiếng về chuyện tình Jack và Rose.",director:"James Cameron",actors:"Leonardo DiCaprio, Kate Winslet"},
  {title:"The Avengers",year:2012,genre:["Action","Sci-Fi"],poster:"https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg",description:"Siêu anh hùng Marvel hợp lực cứu thế giới.",director:"Joss Whedon",actors:"Robert Downey Jr., Chris Evans, Scarlett Johansson"},
  {title:"Inception",year:2010,genre:["Action","Sci-Fi","Thriller"],poster:"https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",description:"Một nhóm chuyên đánh cắp bí mật qua giấc mơ.",director:"Christopher Nolan",actors:"Leonardo DiCaprio, Joseph Gordon-Levitt"},
  {title:"Interstellar",year:2014,genre:["Sci-Fi","Drama"],poster:"https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",description:"Hành trình vượt không gian và thời gian để cứu Trái Đất.",director:"Christopher Nolan",actors:"Matthew McConaughey, Anne Hathaway"},
  {title:"The Dark Knight",year:2008,genre:["Action","Crime","Drama"],poster:"https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg",description:"Batman đối đầu Joker trong trận chiến công lý.",director:"Christopher Nolan",actors:"Christian Bale, Heath Ledger"},
  {title:"Jurassic Park",year:1993,genre:["Adventure","Sci-Fi"],poster:"https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",description:"Công viên khủng long sống lại gây ra thảm họa.",director:"Steven Spielberg",actors:"Sam Neill, Laura Dern"},
  {title:"The Matrix",year:1999,genre:["Action","Sci-Fi"],poster:"https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",description:"Neo phát hiện thế giới thực chất là ảo ảnh và nổi dậy.",director:"The Wachowskis",actors:"Keanu Reeves, Laurence Fishburne"},
  {title:"Avatar",year:2009,genre:["Action","Adventure","Sci-Fi"],poster:"https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg",description:"Hành tinh Pandora với con người và Na’vi.",director:"James Cameron",actors:"Sam Worthington, Zoe Saldana"},
  {title:"Forrest Gump",year:1994,genre:["Drama","Romance"],poster:"https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",description:"Cuộc đời đặc biệt của Forrest Gump qua nhiều thập kỷ.",director:"Robert Zemeckis",actors:"Tom Hanks, Robin Wright"},
  {title:"Gladiator",year:2000,genre:["Action","Drama","Adventure"],poster:"https://upload.wikimedia.org/wikipedia/en/8/8d/Gladiator_ver1.jpg",description:"Maximus tìm đường trả thù sau khi Hoàng đế bị sát hại.",director:"Ridley Scott",actors:"Russell Crowe, Joaquin Phoenix"}
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
    card.innerHTML = `<img src="${movie.poster}" alt="${movie.title}"><h4>${movie.title}</h4><p>${movie.year}</p>`;
    card.onclick = () => showModal(movie);
    movieList.appendChild(card);
  });
}

// RENDER GENRES
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
    <img src="${movie.poster}" alt="${movie.title}" width="200">
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
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");

// INIT
renderGenres();
renderMovies(movies);
