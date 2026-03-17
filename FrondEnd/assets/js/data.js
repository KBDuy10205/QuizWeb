let quizzes = [
    { 
        id: 1, 
        title: "Toán học giải tích", 
        duration: 45, 
        description: "Kiểm tra đạo hàm và tích phân", 
        difficulty: "Khó",
        totalQuestions: 10,
        createdAt: "2024-05-10"
    },
    { 
        id: 2, 
        title: "Từ vựng TOEIC", 
        duration: 30, 
        description: "Chủ đề văn phòng và thương mại", 
        difficulty: "Trung bình",
        totalQuestions: 20,
        createdAt: "2024-05-12"
    }
];

function getAllQuizzes() {
    return quizzes;
}