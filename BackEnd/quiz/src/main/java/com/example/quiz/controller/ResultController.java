package com.example.quiz.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.quiz.model.Result;
import com.example.quiz.service.ResultService;

import lombok.RequiredArgsConstructor;

@RestController // Đánh dấu đây là một controller trong Spring Boot
@RequestMapping("/api/results") // Định nghĩa đường dẫn cơ sở cho tất cả các API trong controller này
@RequiredArgsConstructor // Tự động tạo constructor với tất cả các trường final
@CrossOrigin("*") // Cho phép tất cả các nguồn gốc truy cập vào API này
public class ResultController {
    private final ResultService resultService; 

    // API: Lưu kết quả làm bài thi của học sinh
    @PostMapping("/save")
    public ResponseEntity<?> saveResult(@RequestBody Result result) {
        try {
            resultService.saveResult(result);
            return ResponseEntity.ok("Kết quả đã được lưu thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi lưu kết quả: " + e.getMessage());
        }
    }

    // API: Lấy kết quả làm bài thi của học sinh theo ResultId
    @GetMapping("/{resultId}")
    public ResponseEntity<?> getResultById(@PathVariable Integer resultId) {
        return ResponseEntity.ok(resultService.getResultById(resultId));
    }

    // API: Xóa kết quả làm bài thi của học sinh theo ResultId
    @DeleteMapping("/delete/{resultId}")  
    public ResponseEntity<?> deleteResultById(@PathVariable Integer resultId) {
        try {
            resultService.deleteResultById(resultId);
            return ResponseEntity.ok("Kết quả đã được xóa thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi xóa kết quả: " + e.getMessage());
        }
    }

    // Lấy tất cả kết quả làm bài thi của học sinh theo Account_Id
    @GetMapping("/get/{accountId}")
    public ResponseEntity<?> getResultsByAccountId(@PathVariable Integer accountId) {
        return ResponseEntity.ok(resultService.getResultsByAccountId(accountId));
    }
}
