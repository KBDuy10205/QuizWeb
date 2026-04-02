package com.example.quiz.repository;

import com.example.quiz.model.Exam;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Integer> {
    Optional<Exam> findByExamName(String examName);
}