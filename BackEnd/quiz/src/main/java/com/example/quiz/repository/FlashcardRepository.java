package com.example.quiz.repository;

import com.example.quiz.model.Flashcard;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface FlashcardRepository extends JpaRepository<Flashcard, Integer> {
    List<Flashcard> findByFlashcardSet_SetId(Integer setId);
}