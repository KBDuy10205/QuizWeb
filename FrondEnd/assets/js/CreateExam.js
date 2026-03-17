// 1. Hiển thị danh sách dạng Bảng
function renderQuizList() {
    const mainView = document.getElementById('main-view');
    const data = getAllQuizzes();
    
    mainView.innerHTML = `
        <div class="quiz-manager">
            <div class="action-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3>Danh sách bài thi</h3>
                <button class="btn-primary" onclick="showCreateForm()">
                    <i class="fas fa-plus"></i> Thêm bài thi mới
                </button>
            </div>
            
            <div class="quiz-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Tên bài thi</th>
                            <th>Thời gian</th>
                            <th>Độ khó</th>
                            <th>Số câu hỏi</th>
                            <th>Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(q => `
                            <tr>
                                <td><strong>${q.title}</strong><br><small>${q.description}</small></td>
                                <td>${q.duration} phút</td>
                                <td><span class="badge">${q.difficulty}</span></td>
                                <td>${q.totalQuestions} câu</td>
                                <td>${q.createdAt}</td>
                                <td>
                                    <button onclick="alert('Tính năng sửa đang phát triển')" style="color: blue; border:none; background:none; cursor:pointer;"><i class="fas fa-edit"></i></button>
                                    <button onclick="alert('Tính năng xóa đang phát triển')" style="color: red; border:none; background:none; cursor:pointer; margin-left:10px;"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
}

// 2. Hiển thị Form tạo bài thi chi tiết
let questionCount = 0; // Biến đếm số thứ tự câu hỏi

function showCreateForm() {
    questionCount = 0; // Reset khi mở form mới
    const mainView = document.getElementById('main-view');
    document.getElementById('section-title').innerText = "Thiết lập bài thi mới";
    
    mainView.innerHTML = `
        <div class="create-form" style="max-width: 800px;">
            <div class="form-grid">
                <div class="form-group full-width"><label>Tên bài thi</label><input type="text" id="q-title"></div>
                <div class="form-group"><label>Thời gian (phút)</label><input type="number" id="q-duration" value="30"></div>
                <div class="form-group"><label>Độ khó</label>
                    <select id="q-diff">
                        <option>Dễ</option><option>Trung bình</option><option>Khó</option>
                    </select>
                </div>
            </div>

            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4>Nội dung câu hỏi</h4>
                <button class="btn-primary" onclick="addNewQuestion()" style="padding: 5px 15px; font-size: 14px;">
                    <i class="fas fa-plus"></i> Thêm câu hỏi
                </button>
            </div>

            <div id="questions-container" style="margin-top: 15px;">
                </div>

            <div class="form-actions" style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                <button class="btn-secondary" onclick="renderQuizList()">Quay lại</button>
                <button class="btn-primary" onclick="handleSaveNewQuiz()">Xuất bản bài thi</button>
            </div>
        </div>`;

    // Tự động thêm câu hỏi đầu tiên
    addNewQuestion();
}

// Hàm thêm một cụm câu hỏi mới vào danh sách
function addNewQuestion() {
    questionCount++;
    const container = document.getElementById('questions-container');
    const qHtml = document.createElement('div');
    qHtml.className = 'question-item';
    qHtml.id = `q-block-${questionCount}`;
    
    qHtml.innerHTML = `
        <button class="btn-remove-q" onclick="this.parentElement.remove()">Xóa câu hỏi</button>
        <div class="form-group">
            <label>Câu hỏi ${questionCount}:</label>
            <input type="text" class="question-text" placeholder="Nhập nội dung câu hỏi...">
        </div>
        <div class="form-grid" style="margin-top:10px;">
            <div class="answer-option">
                <input type="checkbox" title="Đánh dấu là đáp án đúng">
                <input type="text" placeholder="Đáp án A">
            </div>
            <div class="answer-option">
                <input type="checkbox" title="Đánh dấu là đáp án đúng">
                <input type="text" placeholder="Đáp án B">
            </div>
            <div class="answer-option">
                <input type="checkbox" title="Đánh dấu là đáp án đúng">
                <input type="text" placeholder="Đáp án C">
            </div>
            <div class="answer-option">
                <input type="checkbox" title="Đánh dấu là đáp án đúng">
                <input type="text" placeholder="Đáp án D">
            </div>
        </div>
    `;
    container.appendChild(qHtml);
}

// Cập nhật hàm lưu để đếm đúng số câu thực tế
function handleSaveNewQuiz() {
    const title = document.getElementById('q-title').value;
    const qBlocks = document.querySelectorAll('.question-item');

    if (!title) return alert("Vui lòng điền tên bài thi!");
    if (qBlocks.length === 0) return alert("Bài thi phải có ít nhất 1 câu hỏi!");

    const newQuiz = {
        id: Date.now(),
        title: title,
        duration: document.getElementById('q-duration').value,
        difficulty: document.getElementById('q-diff').value,
        totalQuestions: qBlocks.length, // Đếm số lượng thực tế trong DOM
        createdAt: new Date().toLocaleDateString('sv-SE')
    };

    quizzes.push(newQuiz);
    alert(`Đã lưu thành công bài thi với ${qBlocks.length} câu hỏi!`);
    renderQuizList();
}

