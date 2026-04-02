package com.example.quiz.repository;



import org.springframework.data.jpa.repository.JpaRepository;


import com.example.quiz.model.ResultDetail;

public interface ResultDetailRepository extends JpaRepository<ResultDetail, Integer> {
}
