// Khi trang web tải xong, hiển thị mặc định trang chủ
window.onload = () => {
    showSection('home');
};

function showSection(section) {
    const title = document.getElementById('section-title');
    const mainView = document.getElementById('main-view');
    
    // Đổi màu menu
    document.querySelectorAll('.menu-item').forEach(btn => btn.classList.remove('active'));
    // Lưu ý: Cần thêm logic để tìm nút tương ứng hoặc dùng event
    
    switch(section) {
        case 'home':
            title.innerText = "Chào mừng trở lại!";
            mainView.innerHTML = `<div class="stat-card"><h3>${quizzes.length}</h3><p>Bài thi hiện có</p></div>`;
            break;
        case 'create':
            title.innerText = "Quản lý bài thi";
            renderQuizList(); // Gọi từ quiz-form.js
            break;
        case 'take-quiz':
            title.innerText = "Làm bài tập";
            mainView.innerHTML = "<p>Tính năng đang phát triển...</p>";
            break;
        // ... các case khác
    }
}