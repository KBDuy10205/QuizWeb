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

// Thêm hàm đánh giá mức độ
function rateCard(level) {
    const card = currentSet.cards[currentIndex];
    
    // Lưu mức độ vào đối tượng card (để có thể thống kê sau này)
    card.level = level; 

    // Hiệu ứng màu sắc tạm thời để người dùng biết đã chọn
    const cardElement = document.querySelector('.flip-card-inner');
    if (level === 'easy') cardElement.style.borderColor = '#16a34a';
    if (level === 'medium') cardElement.style.borderColor = '#ca8a04';
    if (level === 'hard') cardElement.style.borderColor = '#dc2626';

    // Đợi 300ms rồi tự động chuyển sang thẻ tiếp theo
    setTimeout(() => {
        cardElement.style.borderColor = ''; // Reset màu
        nextCard();
    }, 300);
}

// Cập nhật hàm nextCard để báo cáo kết quả khi hết bộ thẻ
function nextCard() {
    if (currentIndex < currentSet.cards.length - 1) {
        currentIndex++;
        renderCard();
    } else {
        showStudySummary();
    }
}

function showStudySummary() {
    const easyCount = currentSet.cards.filter(c => c.level === 'easy').length;
    const midCount = currentSet.cards.filter(c => c.level === 'medium').length;
    const hardCount = currentSet.cards.filter(c => c.level === 'hard').length;

    alert(`Chúc mừng! Bạn đã hoàn thành bộ thẻ.
    --------------------------
    ✅ Đã thuộc: ${easyCount}
    ⚠️ Tạm nhớ: ${midCount}
    ❌ Quên: ${hardCount}`);
    
    window.location.href = 'Home.html';
}