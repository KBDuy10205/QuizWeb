package com.example.quiz.controller;

import com.example.quiz.model.Exam;
import com.example.quiz.service.ExamService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ExamController {

    private final ExamService examService;
    // API: Tạo đề thi mới với danh sách câu hỏi
    @PostMapping("/create")
    @Transactional
    public ResponseEntity<?> createExam(@RequestBody Exam exam) {
        try {
            Exam createdExam = examService.createExam(exam);
            return ResponseEntity.ok(createdExam);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi tạo đề thi: " + e.getMessage());
        }
    }

    // API: Lấy tất cả đề thi
    @GetMapping
    public ResponseEntity<List<Exam>> getAll() {
        return ResponseEntity.ok(examService.getAllExams());
    }

    // API: Lấy thông tin đề thi theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Exam> getOne(@PathVariable Integer id) {
        return ResponseEntity.ok(examService.getExamById(id));
    }

    // API: Xoá đề thi theo ID (nếu cần)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Integer id) {
        examService.deleteExamById(id);
        return ResponseEntity.noContent().build();
    }

    // API: Cập nhật đề thi theo ID
    @PutMapping("/{id}")
    @Transactional 
    public ResponseEntity<?> updateExam(@PathVariable Integer id, @RequestBody Exam exam) {
        try {
            Exam updatedExam = examService.updateExam(id, exam);
            return ResponseEntity.ok(updatedExam);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi cập nhật đề thi: " + e.getMessage());
        }
    }

}