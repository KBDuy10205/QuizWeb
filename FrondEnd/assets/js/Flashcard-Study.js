let currentSet = null;
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lấy dữ liệu bộ thẻ từ LocalStorage
    const savedData = localStorage.getItem('currentFlashcardSet');
    if (!savedData) {
        alert("Không tìm thấy dữ liệu ôn tập!");
        window.location.href = 'Home.html';
        return;
    }

    currentSet = JSON.parse(savedData);
    renderCard();
});

function renderCard() {
    const card = currentSet.cards[currentIndex];
    
    // Cập nhật nội dung thẻ
    document.getElementById('study-set-title').innerText = currentSet.title;
    document.getElementById('card-term').innerText = card.term;
    document.getElementById('card-definition').innerText = card.definition;
    
    // Đảm bảo thẻ luôn hiện mặt trước khi chuyển câu mới
    document.getElementById('main-card').classList.remove('flipped');

    // Cập nhật tiến độ
    const total = currentSet.cards.length;
    const progress = ((currentIndex + 1) / total) * 100;
    document.getElementById('progress-text').innerText = `${currentIndex + 1} / ${total}`;
    document.getElementById('study-progress').style.width = `${progress}%`;

    // Cập nhật trạng thái nút
    document.getElementById('btn-prev').disabled = currentIndex === 0;
}

function nextCard() {
    if (currentIndex < currentSet.cards.length - 1) {
        currentIndex++;
        renderCard();
    } else {
        if(confirm("Bạn đã hoàn thành bộ thẻ! Quay lại trang chủ?")) {
            window.location.href = 'Home.html';
        }
    }
}

function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCard();
    }
}