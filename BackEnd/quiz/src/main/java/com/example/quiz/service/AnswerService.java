package com.example.quiz.service;

import org.springframework.stereotype.Service;

import com.example.quiz.model.Answer;
import com.example.quiz.repository.AnswerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class AnswerService {
    private final AnswerRepository answerRepository;

    //Lưu câu trả lời vào cơ sở dữ liệu
    public void saveAnswer(Answer answer) {
        answerRepository.save(answer);
    }
}
