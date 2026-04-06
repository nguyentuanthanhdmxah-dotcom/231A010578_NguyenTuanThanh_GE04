const movies = [
    { id: 1, title: "Inception", year: 2010, genres: ["Hành động", "Viễn tưởng"], poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", description: "Kẻ trộm cắp thông tin thông qua việc xâm nhập vào tiềm thức của mục tiêu...", director: "Christopher Nolan", cast: "Leonardo DiCaprio, Joseph Gordon-Levitt" },
    { id: 2, title: "The Dark Knight", year: 2008, genres: ["Hành động", "Tội phạm"], poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", description: "Người Dơi phải đối mặt với một mối đe dọa mới mang tên The Joker...", director: "Christopher Nolan", cast: "Christian Bale, Heath Ledger" },
    { id: 3, title: "Parasite", year: 2019, genres: ["Giật gân", "Hài hước"], poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", description: "Câu chuyện về hai gia đình ở hai tầng lớp xã hội hoàn toàn khác biệt...", director: "Bong Joon Ho", cast: "Song Kang-ho, Lee Sun-kyun" },
    { id: 4, title: "Interstellar", year: 2014, genres: ["Viễn tưởng", "Phiêu lưu"], poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", description: "Một nhóm thám hiểm du hành qua lỗ sâu để tìm kiếm ngôi nhà mới cho nhân loại.", director: "Christopher Nolan", cast: "Matthew McConaughey, Anne Hathaway" },
    { id: 5, title: "John Wick", year: 2014, genres: ["Hành động", "Giật gân"], poster: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg", description: "Sát thủ huyền thoại quay lại giới giang hồ để báo thù...", director: "Chad Stahelski", cast: "Keanu Reeves, Michael Nyqvist" },
    { id: 6, title: "Toy Story", year: 1995, genres: ["Hoạt hình", "Hài hước", "Phiêu lưu"], poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg", description: "Đồ chơi của cậu bé Andy trở nên sống động khi vắng mặt con người...", director: "John Lasseter", cast: "Tom Hanks, Tim Allen" }
];

// Các biến DOM
const movieGrid = document.getElementById('movie-grid');
const genreContainer = document.getElementById('genre-container');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('movie-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

// Trạng thái bộ lọc
let currentSearchTerm = "";
let selectedGenres = [];

// --- BÀI 2.1: Hiển thị dữ liệu ---
function displayMovies(movieArray) {
    movieGrid.innerHTML = ""; // Xóa nội dung cũ
    if (movieArray.length === 0) {
        movieGrid.innerHTML = "<p>Không tìm thấy phim nào phù hợp.</p>";
        return;
    }

    movieArray.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
<img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.year} | ${movie.genres.join(', ')}</p>
            </div>
        `;
        // Thêm sự kiện click để mở Modal (Bài 3.1)
        card.addEventListener('click', () => openModal(movie));
        movieGrid.appendChild(card);
    });
}

// --- BÀI 2.2: Tự động tạo Checkbox Thể loại ---
function generateGenres() {
    // Thu thập tất cả các thể loại duy nhất (Sử dụng Set để lọc trùng)
    const allGenres = new Set();
    movies.forEach(movie => {
        movie.genres.forEach(genre => allGenres.add(genre));
    });

    // Render checkbox
    allGenres.forEach(genre => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" value="${genre}" class="genre-checkbox">
            ${genre}
        `;
        genreContainer.appendChild(label);
    });

    // Bắt sự kiện khi tick/bỏ tick
    const checkboxes = document.querySelectorAll('.genre-checkbox');
    checkboxes.forEach(box => {
        box.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedGenres.push(e.target.value);
            } else {
                selectedGenres = selectedGenres.filter(g => g !== e.target.value);
            }
            filterMovies(); // Gọi hàm lọc tích hợp
        });
    });
}

// --- BÀI 2.4: Tư duy tích hợp (Lọc đồng thời Tìm kiếm + Thể loại) ---
function filterMovies() {
    const filtered = movies.filter(movie => {
        // 1. Kiểm tra Search (không phân biệt hoa thường)
        const matchesSearch = movie.title.toLowerCase().includes(currentSearchTerm.toLowerCase());
        
        // 2. Kiểm tra Thể loại (Phim phải có chứa ít nhất 1 thể loại đang được chọn, hoặc nếu không chọn gì thì lấy hết)
        const matchesGenre = selectedGenres.length === 0 || selectedGenres.some(genre => movie.genres.includes(genre));

        return matchesSearch && matchesGenre;
    });

    displayMovies(filtered);
}

// --- BÀI 2.5: Kỹ thuật Debounce (Tối ưu hiệu năng tìm kiếm) ---
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId); // Hủy timer cũ nếu người dùng vẫn đang gõ
        timeoutId = setTimeout(() => {
            func.apply(this, args); // Thực thi hàm sau khi ngừng gõ [delay] ms
        }, delay);
    };
}

// Bắt sự kiện tìm kiếm với Debounce (chỉ chạy sau khi ngừng gõ 400ms)
searchInput.addEventListener('input', debounce((e) => {
    currentSearchTerm = e.target.value;
    filterMovies();
}, 400));


// --- BÀI 3.1: Logic Modal ---
function openModal(movie) {
    modalBody.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="modal-details">
<h2>${movie.title} (${movie.year})</h2>
            <p><strong>Thể loại:</strong> ${movie.genres.join(', ')}</p>
            <p><strong>Đạo diễn:</strong> ${movie.director}</p>
            <p><strong>Diễn viên:</strong> ${movie.cast}</p>
            <p><strong>Nội dung:</strong> ${movie.description}</p>
        </div>
    `;
    modal.style.display = "flex";
}

closeBtn.addEventListener('click', () => { modal.style.display = "none"; });
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = "none";
});


// --- BÀI 3.2: Hoàn thiện Light/Dark Mode với LocalStorage ---
const toggleSwitch = document.getElementById('checkbox');

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark'); // Lưu cấu hình
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme);

// Kiểm tra theme đã lưu khi tải trang
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        document.body.classList.add('dark-mode');
    }
}

// Khởi tạo ban đầu
displayMovies(movies);
generateGenres();
