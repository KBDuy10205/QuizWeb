package com.example.quiz.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.quiz.model.Flashcard;
import com.example.quiz.model.FlashcardSet;
import com.example.quiz.service.FlashcardService;
import com.example.quiz.service.FlashcardSetService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/flashcards")
@RequiredArgsConstructor
public class FlashcardController {
    public final FlashcardService flashcardService;
    public final FlashcardSetService flashcardSetService;
    
    //Thêm một FlashcardSet
    @PostMapping("/set")
    public ResponseEntity<?> createFlashcardSet(@RequestBody FlashcardSet flashcardSet) {
        try {
            FlashcardSet savedSet = flashcardSetService.createFlashcardSet(flashcardSet);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi tạo bộ thẻ: " + e.getMessage());
        }
    }

    //Thêm Flashcard vào FlashcardSet
    @PostMapping("/{setId}/add-flashcards")
    public ResponseEntity<?> addCardsToSet(@PathVariable Integer setId, 
                                            @RequestBody List<Flashcard> flashcards) {
        try {
            // Đẩy toàn bộ dữ liệu xuống Service xử lý
            List<Flashcard> savedCards = flashcardSetService.addCardsToSet(setId, flashcards);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedCards);
        } catch (IllegalArgumentException e) {
            // Bắt lỗi nếu không tìm thấy Set (Mã 404)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Bắt các lỗi hệ thống khác (Mã 500)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi thêm thẻ: " + e.getMessage());
        }
    }
    

    //Lấy tất cả flashcard theo setId
    @GetMapping("/set/{setId}")
    public List<Flashcard> getCardsBySet(@PathVariable Integer setId) {
        return flashcardService.getCardsBySet(setId);
    }
}
