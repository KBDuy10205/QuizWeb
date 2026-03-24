// js/main.js

function renderResults() {
    const mainView = document.getElementById('main-view');
    const history = JSON.parse(localStorage.getItem('quizHistory')) || [];

    if (history.length === 0) {
        mainView.innerHTML = `
            <div style="text-align:center; padding:100px; color:#94a3b8;">
                <i class="fas fa-history" style="font-size:60px; margin-bottom:20px; opacity:0.3;"></i>
                <h3>Chưa có lịch sử làm bài</h3>
                <p>Hãy tham gia làm bài thi để xem kết quả tại đây!</p>
            </div>`;
        return;
    }

    mainView.innerHTML = `
        <div class="results-page">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px;">
                <h3>Lịch sử lượt thi (${history.length})</h3>
                <button class="btn-secondary" onclick="clearHistory()" style="color:var(--danger-red); border-color:var(--danger-red);">Xóa tất cả</button>
            </div>
            
            <div class="results-list">
                ${history.map(item => `
                    <div class="result-item-card">
                        <div class="res-info">
                            <span class="res-date">${item.date}</span>
                            <h4 class="res-title">${item.quizTitle}</h4>
                            <p class="res-player"><i class="fas fa-user-circle"></i> ${item.playerName}</p>
                        </div>
                        <div class="res-score-box">
                            <div class="res-percent ${item.percent >= 50 ? 'pass' : 'fail'}">${item.percent}%</div>
                            <div class="res-detail">${item.score}/${item.total} câu</div>
                        </div>
                        <div class="res-action">
                            <button class="btn-primary" onclick="retakeFromHistory(${item.quizId})">
                                <i class="fas fa-redo"></i> Làm lại
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Hàm hỗ trợ làm lại
function retakeFromHistory(quizId) {
    // Tận dụng lại dữ liệu bài thi từ quiz-data.js hoặc localStorage
    const quiz = quizzes.find(q => q.id == quizId);
    if (quiz) {
        localStorage.setItem('currentQuiz', JSON.stringify(quiz));
        // Giữ nguyên tên cũ hoặc cho phép đổi tên
        window.location.href = 'exam.html';
    } else {
        alert("Rất tiếc, bài thi gốc này đã bị xóa khỏi hệ thống!");
    }
}

function clearHistory() {
    if(confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử thi?")) {
        localStorage.removeItem('quizHistory');
        renderResults();
    }
}