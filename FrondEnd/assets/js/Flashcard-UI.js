function renderFlashcardUI() {
    const mainView = document.getElementById('main-view');
    
    mainView.innerHTML = `
        <div class="flashcard-manager">
            <div class="action-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                <div>
                    <h3 style="margin-bottom:5px;">Bộ thẻ ghi nhớ</h3>
                    <p style="font-size:13px; color:var(--text-sub);">Tạo và ôn tập kiến thức qua thẻ Flashcards</p>
                </div>
                <button class="btn-primary" onclick="showCreateFlashcardSet()">
                    <i class="fas fa-plus"></i> Thêm bộ thẻ mới
                </button>
            </div>

            <div class="flashcard-grid">
                ${flashcardSets.map(set => `
                    <div class="fc-set-card">
                        <div class="fc-card-icon">
                            <i class="fas fa-clone"></i>
                        </div>
                        <div class="fc-card-info">
                            <h4>${set.title}</h4>
                            <p>${set.description}</p>
                            <span class="fc-count">${set.count} thẻ</span>
                        </div>
                        <div class="fc-card-actions">
                            <button class="btn-study" onclick="startFlashcardSession(${set.id})" title="Ôn tập">
                                <i class="fas fa-graduation-cap"></i> Ôn tập
                            </button>
                            <div class="fc-edit-group">
                                <button onclick="editFlashcardSet(${set.id})" title="Chỉnh sửa"><i class="fas fa-pen"></i></button>
                                <button onclick="deleteFlashcardSet(${set.id})" title="Xóa" style="color:var(--danger-red);"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}