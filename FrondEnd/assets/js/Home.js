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
            title.innerText = "Bảng điều khiển";
            
            // Lấy dữ liệu từ localStorage để hiển thị thống kê thực tế
            const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
            const fcSets = (typeof flashcardSets !== 'undefined') ? flashcardSets : [];

            mainView.innerHTML = `
                <div class="dashboard">
                    <div class="stats-row">
                        <div class="stat-card">
                            <div class="stat-icon" style="background: #dbeafe; color: #2563eb;"><i class="fas fa-file-alt"></i></div>
                            <div class="stat-info">
                                <h3>${quizzes.length}</h3>
                                <p>Bài thi</p>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon" style="background: #dbeafe; color: #16a34a;">
                                <i class="fas fa-clone"></i>
                            </div>

                            <div class="stat-info">
                                <h3>${fcSets.length}</h3>
                                <p>Bộ Flashcards</p>
                            </div>
                        </div>

                        <div class="stat-card">
                            <div class="stat-icon" style="background: #fef9c3; color: #ca8a04;"><i class="fas fa-check-double"></i></div>
                            <div class="stat-info">
                                <h3>${history.length}</h3>
                                <p>Lượt đã thi</p>
                            </div>
                        </div>
                    </div>

                    <div class="quick-actions" style="margin-top: 30px;">
                        <h4 style="margin-bottom: 15px;">Thao tác nhanh</h4>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                            <button class="btn-primary" onclick="showSection('take-quiz')">
                                <i class="fas fa-play"></i> Làm bài thi ngay
                            </button>

                            <button class="btn-secondary" onclick="showSection('flashcards')">
                                <i class="fas fa-graduation-cap"></i> Ôn tập Flashcards
                            </button>
                        </div>
                    </div>

                    <div class="recent-activity" style="margin-top: 30px;">
                        <h4 style="margin-bottom: 15px;">Lượt thi gần nhất</h4>
                        ${history.length > 0 ? `
                            <div class="activity-item" style="background: white; padding: 15px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm);">
                                <div>
                                    <strong>${history[0].quizTitle}</strong>
                                    <p style="font-size: 12px; color: #666;">${history[0].date}</p>
                                </div>
                                <div style="font-weight: bold; color: #2563eb;">${history[0].percent}%</div>
                            </div>
                        ` : `<p style="color: #999; font-style: italic;">Bạn chưa thực hiện bài thi nào.</p>`}
                    </div>
                </div>
            `;
            break;
        case 'create':
            title.innerText = "Quản lý bài thi";
            renderQuizList(); // Gọi từ CreateExam.js
            break;

        case 'take-quiz':
            title.innerText = "Chọn bài thi";
            renderQuizSelection(); // Gọi hàm từ quiz-engine.js
            break;
        
        case 'results':
            title.innerText = "Kết quả";
            renderResults(); //Gọi hàm từ Result.js
            break;
        
        case 'flashcards':
            title.innerText = "Ghi nhớ với Flashcards";
            renderFlashcardUI();
            break;
    }
}