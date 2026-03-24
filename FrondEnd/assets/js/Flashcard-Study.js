// js/flashcard-study.js

let currentSet = null;
let currentCardIdx = 0;

function startFlashcardSession(setId) {
    currentSet = flashcardSets.find(s => s.id === setId);
    currentCardIdx = 0;
    renderStudyUI();
}

function renderStudyUI() {
    const mainView = document.getElementById('main-view');
    const card = currentSet.cards[currentCardIdx];

    mainView.innerHTML = `
        <div class="study-container" style="max-width:500px; margin:auto; text-align:center;">
            <p>Thẻ ${currentCardIdx + 1} / ${currentSet.cards.length}</p>
            
            <div class="flip-card" onclick="this.classList.toggle('flipped')">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <h2>${card.term}</h2>
                        <small>(Nhấn để xem đáp án)</small>
                    </div>
                    <div class="flip-card-back">
                        <h2>${card.definition}</h2>
                    </div>
                </div>
            </div>

            <div style="margin-top:30px; display:flex; gap:15px; justify-content:center;">
                <button class="btn-secondary" onclick="prevCard()" ${currentCardIdx === 0 ? 'disabled' : ''}>Trước</button>
                <button class="btn-primary" onclick="nextCard()">
                    ${currentCardIdx === currentSet.cards.length - 1 ? 'Kết thúc' : 'Tiếp theo'}
                </button>
            </div>
            <button class="btn-secondary" style="margin-top:20px; border:none;" onclick="renderFlashcardManager()">Thoát ôn tập</button>
        </div>`;
}

function nextCard() {
    if(currentCardIdx < currentSet.cards.length - 1) {
        currentCardIdx++;
        renderStudyUI();
    } else {
        alert("Chúc mừng! Bạn đã hoàn thành bộ thẻ này.");
        renderFlashcardManager();
    }
}

function prevCard() {
    if(currentCardIdx > 0) {
        currentCardIdx--;
        renderStudyUI();
    }
}