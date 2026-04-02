package com.example.quiz.service;

import org.springframework.stereotype.Service;

import com.example.quiz.model.Question;
import com.example.quiz.repository.QuestionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class QuestionService {
    private final QuestionRepository questionRepository;

    //Thêm nhiều câu hỏi vào cơ sở dữ liệu
    //Iterable<Question> thay vì List<Question> để linh hoạt hơn với các loại collection khác nhau
    public Iterable<Question> addQuestions(Iterable<Question> questions) {
        return questionRepository.saveAll(questions);
    }
}
