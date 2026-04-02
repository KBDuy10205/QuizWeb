package com.example.quiz.service;

import com.example.quiz.model.Account;
import com.example.quiz.model.Answer;
import com.example.quiz.model.Exam;
import com.example.quiz.model.Question;
import com.example.quiz.repository.ExamRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService {
    private final ExamRepository examRepository;
    private final CrudRepository<Account,Integer> accountRepository; 
    
    // Tạo đề thi mới với danh sách câu hỏi
    @Transactional
    public Exam createExam(Exam exam) {
        // 1. Kiểm tra nếu bài thi có danh sách câu hỏi
        if (exam.getQuestions() != null) {
            for (Question question : exam.getQuestions()) {
                
                // Gán bài thi (cha) cho câu hỏi (con)
                question.setExam(exam);

                // 2. Kiểm tra nếu câu hỏi có danh sách đáp án
                if (question.getAnswers() != null) {
                    for (Answer answer : question.getAnswers()) {
                        // Gán câu hỏi (cha) cho đáp án (con)
                        answer.setQuestion(question);
                    }
                }
            }
        }

        // 3. Tính toán lại tổng số câu hỏi nếu cần
        exam.setTotalQuestions(exam.getQuestions() != null ? exam.getQuestions().size() : 0);

        // 4. Tìm Account thật trong DB
        Integer accountId = exam.getCreatedBy().getAccountId();

        Account account = accountRepository.findById(accountId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng này!"));

        // 5. Gán Account đã tìm thấy vào Exam
        exam.setCreatedBy(account);

        // 6. Lưu toàn bộ (Cascade sẽ tự động lưu Questions và Answers)
        return examRepository.save(exam);
    }

    // Lấy tất cả đề thi
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    // Lấy thông tin đề thi theo ID
    public Exam getExamById(Integer id) {
        return examRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy đề thi với ID: " + id));
    }

    //Chỉnh sửa đề thi theo ID
    @Transactional
    public Exam updateExam(Integer id, Exam examDetails) {
        // 1. Tìm bài thi gốc trong DB
        Exam existingExam = examRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy bài thi ID: " + id));

        // 2. Cập nhật thông tin cơ bản
        existingExam.setExamName(examDetails.getExamName());
        existingExam.setTimeLimit(examDetails.getTimeLimit());

        // 3. Xử lý danh sách câu hỏi (Xóa cũ, thay bằng mới từ Request)
        // Để đơn giản hóa, ta sẽ gán lại toàn bộ danh sách
        if (examDetails.getQuestions() != null) {
            // Thiết lập lại mối quan hệ cho các câu hỏi mới gửi lên
            // Gán bài thi (cha) cho mỗi câu hỏi (con) và gán câu hỏi (cha) cho mỗi đáp án (con)
            examDetails.getQuestions().forEach(q -> {
                q.setExam(existingExam);    // Gán bài thi (cha) cho câu hỏi (con)
                if (q.getAnswers() != null) {
                    q.getAnswers().forEach(a -> a.setQuestion(q)); // Gán câu hỏi (cha) cho đáp án (con)
                }
            });
            
            // Xóa danh sách cũ và thêm danh sách mới
            existingExam.getQuestions().clear();    // Xóa hết câu hỏi cũ (và tự động xóa đáp án cũ nhờ Cascade)
            existingExam.getQuestions().addAll(examDetails.getQuestions()); // Thêm câu hỏi mới (và tự động thêm đáp án mới nhờ Cascade)

             // Cập nhật lại tổng số câu hỏi
            existingExam.setTotalQuestions(existingExam.getQuestions().size());
        }

        // 4. Lưu lại (Hibernate sẽ tự động INSERT/UPDATE/DELETE nhờ Cascade)
        return examRepository.save(existingExam);
    }
    
    // Xoá đề thi theo ID
    public void deleteExamById(Integer id) {
        examRepository.deleteById(id);
    }
}