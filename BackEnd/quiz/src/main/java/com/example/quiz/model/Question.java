package com.example.quiz.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Questions")
@Data
@AllArgsConstructor 
@NoArgsConstructor

public class Question {
    @Id //Đánh dấu trường này là khóa chính
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Tự động tăng ID
    @Column(name = "Question_Id")
    private Integer questionId;
    
    @Column(name = "Content")
    private String content;

    @Enumerated(EnumType.STRING) // Lưu giá trị enum dưới dạng chuỗi trong DB
    @Column(name = "Level")
    private QuestionLevel level; // Easy, Medium, Hard

    @Column(name = "Created_At")
    private LocalDateTime createdAt = LocalDateTime.now();

    
    @ManyToOne
    @JoinColumn(name = "Exam_Id")
    @JsonIgnore // Tránh vòng lặp vô hạn khi serializing
    private Exam exam;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true) 
    private List<Answer> answers;
}

enum QuestionLevel { Easy, Medium, Hard }