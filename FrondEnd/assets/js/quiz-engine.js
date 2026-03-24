// js/quiz-engine.js

let currentPlayer = "";

// BƯỚC 1: Hiển thị danh sách bài thi và ô tìm kiếm
function renderQuizSelection() {
    const mainView = document.getElementById('main-view');
    const data = getAllQuizzes();

    mainView.innerHTML = `
        <div class="selection-container">
            <div class="search-box-container" style="margin-bottom: 30px; background: white; padding: 20px; border-radius: 12px;">
                <h4>Tìm kiếm bài thi</h4>
                <div style="display:flex; gap:10px; margin-top:10px;">
                    <input type="text" id="search-quiz-id" placeholder="Nhập mã bài thi (ID)..." style="flex:1; padding:10px; border:1px solid #ddd; border-radius:6px;">
                    <button class="btn-primary" onclick="searchQuizById()">Tìm kiếm</button>
                </div>
            </div>

            <div class="quiz-grid">
                ${data.map(q => `
                    <div class="quiz-card-simple" onclick="showEntryForm(${q.id})" style="background:white; padding:20px; border-radius:12px; cursor:pointer; border-left:5px solid #2563eb; transition:0.3s;">
                        <div style="font-weight:bold; font-size:18px;">${q.title}</div>
                        <p style="font-size:13px; color:#666; margin: 10px 0;">${q.description}</p>
                        <div style="display:flex; justify-content:space-between; font-size:12px; color:#2563eb;">
                            <span><i class="far fa-clock"></i> ${q.duration} phút</span>
                            <span>Mã số: #${q.id}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Hàm tìm kiếm theo ID
function searchQuizById() {
    const id = document.getElementById('search-quiz-id').value;
    const found = quizzes.find(q => q.id == id);
    if (found) {
        showEntryForm(found.id);
    } else {
        alert("Không tìm thấy bài thi với mã số này!");
    }
}

// BƯỚC 2: Form nhập thông tin người thi
function showEntryForm(quizId) {
    const quiz = quizzes.find(q => q.id == quizId);
    const mainView = document.getElementById('main-view');
    
    mainView.innerHTML = `
        <div class="entry-card" style="max-width:400px; margin: 50px auto; background:white; padding:30px; border-radius:15px; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
            <i class="fas fa-user-edit" style="font-size:40px; color:#2563eb; margin-bottom:20px;"></i>
            <h3>Thông tin người thi</h3>
            <p style="margin-bottom:20px; color:#666;">Bạn đang chuẩn bị thi: <strong>${quiz.title}</strong></p>
            <input type="text" id="player-name" placeholder="Nhập họ tên của bạn..." style="width:100%; padding:12px; margin-bottom:20px; border:1px solid #ddd; border-radius:8px;">
            <div style="display:flex; gap:10px;">
                <button class="btn-secondary" style="flex:1" onclick="renderQuizSelection()">Quay lại</button>
                <button class="btn-primary" style="flex:2" onclick="startActualQuiz(${quizId})">Bắt đầu làm bài</button>
            </div>
        </div>
    `;
}


function startActualQuiz(quizId) {
    const nameInput = document.getElementById('player-name').value;
    if (!nameInput.trim()) return alert("Vui lòng nhập tên!");

    // Ép kiểu quizId về cùng một dạng để tìm kiếm chính xác
    const quiz = quizzes.find(q => String(q.id) === String(quizId));
    
    // KIỂM TRA QUAN TRỌNG: Nếu không tìm thấy quiz thì dừng lại ngay
    if (!quiz) {
        console.error("Không tìm thấy bài thi với ID:", quizId);
        alert("Lỗi: Không tìm thấy dữ liệu bài thi này!");
        return;
    }

    // Kiểm tra xem bài thi có câu hỏi không
    if (!quiz.questions || quiz.questions.length === 0) {
        alert("Bài thi này chưa có câu hỏi, không thể bắt đầu!");
        return;
    }

    // Lưu dữ liệu
    localStorage.setItem('currentQuiz', JSON.stringify(quiz));
    localStorage.setItem('playerName', nameInput);

    // Chuyển hướng
    window.location.href = 'exam.html';
}

