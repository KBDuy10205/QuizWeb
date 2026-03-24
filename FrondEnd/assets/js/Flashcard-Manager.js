// js/flashcard-manager.js

// Hàm hiển thị danh sách các bộ thẻ (Trang quản lý chính)
function renderFlashcardManager() {
    const mainView = document.getElementById('main-view');
    // Giả sử flashcardSets được khai báo ở flashcard-data.js
    const data = (typeof flashcardSets !== 'undefined') ? flashcardSets : [];

    mainView.innerHTML = `
        <div class="flashcard-container">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                <h3>Quản lý bộ thẻ ghi nhớ</h3>
                <button class="btn-primary" onclick="showCreateFlashcardSet()">
                    <i class="fas fa-plus"></i> Tạo bộ thẻ mới
                </button>
            </div>

            <div class="flashcard-grid">
                ${data.length === 0 ? '<p>Chưa có bộ thẻ nào. Hãy tạo mới!</p>' : 
                    data.map(set => `
                    <div class="fc-set-card">
                        <div class="fc-info">
                            <h4>${set.title}</h4>
                            <p>${set.description || 'Không có mô tả'}</p>
                            <span class="badge">${set.cards ? set.cards.length : 0} thẻ</span>
                        </div>
                        <div class="fc-actions">
                            <button class="btn-study-sm">Ôn tập</button>
                            <button onclick="deleteFCSet(${set.id})" class="btn-icon-del"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Hàm hiển thị FORM THÊM BỘ MỚI
function showCreateFlashcardSet() {
    const mainView = document.getElementById('main-view');
    mainView.innerHTML = `
        <div class="create-form-container" style="max-width: 800px; margin: auto;">
            <div class="form-header">
                <h4>Tạo bộ Flashcards mới</h4>
                <p>Mỗi bộ cần ít nhất 3 thẻ để lưu.</p>
            </div>
            
            <div class="form-group">
                <label>Tên bộ thẻ</label>
                <input type="text" id="fc-set-title" placeholder="Ví dụ: 3000 từ vựng thông dụng">
            </div>
            
            <div class="form-group">
                <label>Mô tả</label>
                <textarea id="fc-set-desc" rows="2" placeholder="Bộ thẻ này dùng để học..."></textarea>
            </div>

            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">

            <div id="cards-list-input">
                </div>

            <button class="btn-secondary" style="width: 100%; margin-top: 10px;" onclick="addCardInputRow()">
                <i class="fas fa-plus"></i> Thêm thẻ tiếp theo
            </button>

            <div class="form-actions" style="margin-top: 30px; display: flex; gap: 10px;">
                <button class="btn-secondary" style="flex: 1;" onclick="renderFlashcardManager()">Hủy bỏ</button>
                <button class="btn-primary" style="flex: 2;" onclick="saveFlashcardSet()">Lưu bộ thẻ này</button>
            </div>
        </div>
    `;

    // Mặc định tạo 3 hàng khi mở form
    for (let i = 0; i < 3; i++) addCardInputRow();
}

function addCardInputRow() {
    const container = document.getElementById('cards-list-input');
    const row = document.createElement('div');
    row.className = 'fc-input-row';
    row.innerHTML = `
        <div class="fc-row-inputs">
            <input type="text" class="fc-front" placeholder="Mặt trước (Khái niệm)">
            <input type="text" class="fc-back" placeholder="Mặt sau (Định nghĩa)">
        </div>
        <button class="btn-remove-row" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(row);
}

function saveFlashcardSet() {
    const title = document.getElementById('fc-set-title').value;
    const desc = document.getElementById('fc-set-desc').value;
    const rows = document.querySelectorAll('.fc-input-row');

    if (!title) return alert("Vui lòng nhập tên bộ thẻ!");
    if (rows.length < 3) return alert("Bạn cần ít nhất 3 thẻ!");

    const cards = [];
    let isFull = true;
    rows.forEach(row => {
        const front = row.querySelector('.fc-front').value;
        const back = row.querySelector('.fc-back').value;
        if (!front || !back) isFull = false;
        cards.push({ term: front, definition: back });
    });

    if (!isFull) return alert("Vui lòng nhập đủ cả 2 mặt của các thẻ!");

    // Lưu vào mảng (Lưu ý: flashcardSets phải được khai báo toàn cục)
    flashcardSets.unshift({
        id: Date.now(),
        title: title,
        description: desc,
        cards: cards
    });

    alert("Đã lưu thành công!");
    renderFlashcardManager();
}