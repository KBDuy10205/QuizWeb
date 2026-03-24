// js/exam-logic.js
let quizData = JSON.parse(localStorage.getItem('currentQuiz'));
let playerName = localStorage.getItem('playerName');
let timer;

window.onload = () => {
    if (!quizData) {
        alert("Không tìm thấy dữ bộ đề!");
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('exam-title').innerText = quizData.title;
    document.getElementById('display-player-name').innerText = playerName;
    
    renderQuestions();
    startTimer(quizData.duration);
};

function renderQuestions() {
    const container = document.getElementById('questions-container');
    container.innerHTML = quizData.questions.map((q, idx) => `
        <div class="exam-question-card" style="background:white; padding:25px; border-radius:12px; margin-bottom:20px; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
            <p style="font-size:18px; margin-bottom:15px;">
                <strong>Câu ${idx + 1}:</strong> ${q.content}
            </p>

            <div style="display:grid; gap:10px;">
                ${q.options.map((opt, optIdx) => `
                    <label class="option-label" style="display:flex; align-items:center; gap:10px; padding:12px; border:1px solid #ddd; border-radius:8px; cursor:pointer;">
                        <input type="radio" name="q-${idx}" value="${optIdx}">
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function startTimer(minutes) {
    let seconds = minutes * 60;
    const display = document.getElementById('time-left');
    timer = setInterval(() => {
        let m = Math.floor(seconds / 60);
        let s = seconds % 60;
        display.innerText = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
        if (--seconds < 0) {
            clearInterval(timer);
            alert("Hết giờ!");
            submitExam();
        }
    }, 1000);
}

// Cập nhật hàm showResult trong exam-logic.js
function submitExam() {
    // Code tính điểm 
    clearInterval(timer);
    let score = 0;
    const total = quizData.questions.length;

    quizData.questions.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="q-${idx}"]:checked`);
        if (selected && q.correct.includes(parseInt(selected.value))) {
            score++;
        }
    });

    const percent = Math.round((score / total) * 100);

    // --- LƯU LỊCH SỬ VÀO LOCALSTORAGE ---
    const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
    const newRecord = {
        id: Date.now(),
        quizId: quizData.id,
        quizTitle: quizData.title,
        playerName: playerName,
        score: score,
        total: total,
        percent: percent,
        date: new Date().toLocaleString('vi-VN')
    };
    
    history.unshift(newRecord); // Đưa kết quả mới nhất lên đầu
    localStorage.setItem('quizHistory', JSON.stringify(history));
    
    // Hiển thị kết quả (Bạn có thể làm một trang result.html riêng hoặc hiện tại chỗ)

    document.body.innerHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f3f4f6;">
            <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: var(--shadow-md); text-align: center; max-width: 500px; width: 90%;">
                <div style="width: 80px; height: 80px; background: var(--soft-blue); color: var(--primary-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 40px;">
                    <i class="fas fa-trophy"></i>
                </div>
                <h2 style="color: var(--text-main); margin-bottom: 5px;">Hoàn thành bài thi!</h2>
                <p style="color: var(--text-sub); margin-bottom: 30px;">Chúc mừng <strong>${playerName}</strong> đã nỗ lực hết mình.</p>
                
                <div style="display: flex; justify-content: space-around; margin-bottom: 30px; background: var(--soft-blue); padding: 20px; border-radius: 15px;">
                    <div>
                        <div style="font-size: 24px; font-weight: bold; color: var(--primary-blue);">${score}/${quizData.questions.length}</div>
                        <div style="font-size: 12px; color: var(--text-sub);">Đúng</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: bold; color: var(--primary-blue);">${percent}%</div>
                        <div style="font-size: 12px; color: var(--text-sub);">Tỉ lệ</div>
                    </div>
                </div>

                <button onclick="window.location.href='Home.html'" class="btn-primary" style="width: 100%; padding: 12px;">
                    Quay về trang chủ
                </button>
            </div>
        </div>
    `;
}