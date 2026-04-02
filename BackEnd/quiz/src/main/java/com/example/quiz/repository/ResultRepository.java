package com.example.quiz.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.quiz.model.Account;
import com.example.quiz.model.Exam;
import com.example.quiz.model.Result;

public interface ResultRepository extends JpaRepository<Result, Integer> {
    Optional<Result> findByAccountAndExam(Account account, Exam exam);
    List<Result> findByAccount_AccountId(Integer accountId);
}
