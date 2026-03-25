
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

// Thêm tham số containerId vào hàm
function addCardInputRow(containerId = 'cards-list-input') {
    const container = document.getElementById(containerId);
    
    // Kiểm tra nếu không tìm thấy container (phòng trường hợp truyền sai ID)
    if (!container) {
        console.error("Không tìm thấy container: " + containerId);
        return;
    }

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
    renderFlashcardUI();
}


//Hàm sửa
function editFlashcardSet(setId) {
    // 1. Tìm bộ thẻ cần sửa trong mảng dữ liệu
    const set = flashcardSets.find(s => s.id === setId);
    if (!set) return alert("Không tìm thấy bộ thẻ!");

    const mainView = document.getElementById('main-view');
    document.getElementById('section-title').innerText = "Chỉnh sửa bộ thẻ";

    // 2. Hiển thị lại Form giống hệt lúc tạo, nhưng có sẵn Value
    mainView.innerHTML = `
        <div class="create-form-container">
            <div class="form-group">
                <label>Tên bộ thẻ</label>
                <input type="text" id="edit-set-title" value="${set.title}">
            </div>
            <div class="form-group">
                <label>Mô tả</label>
                <textarea id="edit-set-desc" rows="2">${set.description || ''}</textarea>
            </div>

            <hr style="margin: 20px 0; border-top: 1px solid #eee;">

            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4>Danh sách thẻ</h4>
                <button class="btn-secondary" onclick="addCardInputRow('edit-cards-list')">
                    <i class="fas fa-plus"></i> Thêm thẻ
                </button>
            </div>

            <div id="edit-cards-list" style="margin-top: 15px;">
                </div>

            <div class="form-actions" style="margin-top: 30px; display: flex; gap: 10px;">
                <button class="btn-secondary" style="flex: 1;" onclick="renderFlashcardUI()">Hủy</button>
                <button class="btn-primary" style="flex: 2;" onclick="saveEditedSet(${setId})">
                    <i class="fas fa-check"></i> Cập nhật thay đổi
                </button>
            </div>
        </div>
    `;

    // 3. Đổ các cặp thẻ cũ vào Form
    const container = document.getElementById('edit-cards-list');
    set.cards.forEach(card => {
        const row = document.createElement('div');
        row.className = 'fc-input-row';
        row.innerHTML = `
            <div class="fc-row-inputs">
                <input type="text" class="fc-front" value="${card.term}" placeholder="Mặt trước">
                <input type="text" class="fc-back" value="${card.definition}" placeholder="Mặt sau">
            </div>
            <button class="btn-remove-row" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(row);
    });
}

function saveEditedSet(setId) {
    const newTitle = document.getElementById('edit-set-title').value;
    const newDesc = document.getElementById('edit-set-desc').value;
    const rows = document.querySelectorAll('#edit-cards-list .fc-input-row');

    if (!newTitle) return alert("Tên bộ thẻ không được để trống!");
    if (rows.length < 3) return alert("Phải có ít nhất 3 thẻ!");

    const updatedCards = [];
    let isValid = true;

    rows.forEach(row => {
        const front = row.querySelector('.fc-front').value;
        const back = row.querySelector('.fc-back').value;
        if (!front || !back) isValid = false;
        updatedCards.push({ term: front, definition: back });
    });

    if (!isValid) return alert("Vui lòng điền đủ 2 mặt cho các thẻ!");

    // Tìm vị trí của bộ thẻ cũ trong mảng và thay thế
    const index = flashcardSets.findIndex(s => s.id === setId);
    if (index !== -1) {
        flashcardSets[index] = {
            ...flashcardSets[index], // Giữ lại ID cũ
            title: newTitle,
            description: newDesc,
            cards: updatedCards
        };
        
        alert("Đã cập nhật bộ thẻ!");
        renderFlashcardUI(); // Quay lại danh sách
    }
}


//Xóa bộ
function deleteFlashcardSet(setId) {
    // 1. Hiển thị hộp thoại xác nhận để tránh xóa nhầm
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa bộ thẻ này không? Hành động này không thể hoàn tác.");

    if (confirmDelete) {
        // 2. Tìm vị trí của bộ thẻ trong mảng
        const index = flashcardSets.findIndex(set => set.id === setId);

        if (index !== -1) {
            // 3. Xóa 1 phần tử tại vị trí index
            flashcardSets.splice(index, 1);

            // 4. (Tùy chọn) Nếu bạn có dùng LocalStorage, hãy cập nhật lại ở đây
            // localStorage.setItem('flashcardSets', JSON.stringify(flashcardSets));

            alert("Đã xóa bộ thẻ thành công!");

            // 5. Vẽ lại danh sách bộ thẻ để cập nhật giao diện
            // Lưu ý: Tên hàm phải khớp với hàm hiển thị danh sách của bạn (renderFlashcardUI hoặc renderFlashcardManager)
            if (typeof renderFlashcardUI === "function") {
                renderFlashcardUI();
            } else {
                renderFlashcardManager();
            }
        } else {
            alert("Lỗi: Không tìm thấy bộ thẻ để xóa!");
        }
    }
}