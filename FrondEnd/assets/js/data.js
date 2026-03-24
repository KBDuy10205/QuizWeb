// Bổ sung thêm mảng questions vào mỗi quiz
let quizzes = [
    { 
        id: 1, 
        title: "Toán học giải tích", 
        duration: 1, // Để 1 phút để test timer cho nhanh
        description: "Kiểm tra đạo hàm cơ bản", 
        difficulty: "Dễ",
        questions: [
            {
                content: "Đạo hàm của x^2 là gì?",
                options: ["x", "2x", "x^3", "2"],
                correct: [1] // Chỉ số của đáp án đúng (2x)
            },
            {
                content: "Đạo hàm của hằng số bằng mấy?",
                options: ["1", "x", "0", "Vô cùng"],
                correct: [2]
            }
        ],
        createdAt: "2024-05-10"
    }
];

let flashcardSets = [
    {
        id: 1,
        title: "Từ vựng IELTS - Topic Environment",
        description: "Các từ vựng nâng cao về chủ đề môi trường",
        count: 15,
        cards: [
            { term: "Biodiversity", definition: "Đa dạng sinh học" },
            { term: "Conservation", definition: "Sự bảo tồn" }
        ]
    },
    {
        id: 2,
        title: "Công thức Đạo hàm",
        description: "Toán học lớp 12 cơ bản",
        count: 10,
        cards: []
    }
];

function getAllQuizzes() { return quizzes; }
function getAllQuizzes() {
    return quizzes;
}
