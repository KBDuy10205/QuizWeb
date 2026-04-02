package com.example.quiz.service;

import com.example.quiz.model.Flashcard;
import com.example.quiz.repository.FlashcardRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class FlashcardService {
    private final FlashcardRepository flashcardRepository;

    //Lấy tất cả Flashcard theo SetId
    public List<Flashcard> getCardsBySet(Integer setId) {
        return flashcardRepository.findByFlashcardSet_SetId(setId);
    }
}
