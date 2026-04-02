package com.example.quiz.repository;

import com.example.quiz.model.FlashcardSet;

//import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Integer> {
    //Optional<FlashcardSet> findByName(String setName);
}
