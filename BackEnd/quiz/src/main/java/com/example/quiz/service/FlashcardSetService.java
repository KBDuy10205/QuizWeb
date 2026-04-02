package com.example.quiz.service;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.example.quiz.model.Account;
import com.example.quiz.model.Flashcard;
import com.example.quiz.model.FlashcardSet;
import com.example.quiz.repository.FlashcardRepository;
import com.example.quiz.repository.FlashcardSetRepository;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FlashcardSetService {

    private final FlashcardSetRepository flashcardSetRepository;
    private final FlashcardRepository flashcardRepository;
    private final CrudRepository<Account,Integer> accountRepository;

    //Tạo một FlashcardSet mới
    public FlashcardSet createFlashcardSet(FlashcardSet flashcardSet) {
        // 1. Lấy ID của account từ object gửi lên (giả sử tên trường là id)
        Integer accountId = flashcardSet.getCreatedBy().getAccountId();

        // 2. Tìm Account thật trong DB
        Account account = accountRepository.findById(accountId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng này!"));

        // 3. Gán Account "thật" đã tìm thấy vào Set
        flashcardSet.setCreatedBy(account);
        
        // 4. Lưu FlashcardSet vào DB
        return flashcardSetRepository.save(flashcardSet);
    }

    //Cập nhật FlashcardSet
    public FlashcardSet updateFlashcardSet(Integer setId, FlashcardSet updatedSet) {
        FlashcardSet existingSet = flashcardSetRepository.findById(setId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bộ thẻ với ID: " + setId));

        existingSet.setSetName(updatedSet.getSetName());
        existingSet.setDescription(updatedSet.getDescription());

        return flashcardSetRepository.save(existingSet);
    }

    //Lấy ra tất cả FlashcardSet
    public List<FlashcardSet> getAllSets() {
        return flashcardSetRepository.findAll();
    }

    // Thêm thẻ vào set
    @Transactional
    public List<Flashcard> addCardsToSet(Integer setId, List<Flashcard> flashcards) {
        FlashcardSet flashcardSet = flashcardSetRepository.findById(setId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bộ thẻ với ID: " + setId));

        for (Flashcard card : flashcards) {
            card.setFlashcardSet(flashcardSet);
        }

        return flashcardRepository.saveAll(flashcards);
    }

    //Xóa thẻ khỏi set
    @Transactional
    public void removeCardFromSet(Integer setId, Integer cardId) {
        Flashcard card = flashcardRepository.findById(setId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thẻ"));

        if (card.getFlashcardSet() != null) {
            card.setFlashcardSet(null);
        }
    }
}