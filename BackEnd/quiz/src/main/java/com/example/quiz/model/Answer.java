package com.example.quiz.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Answers")
@Data
@AllArgsConstructor 
@NoArgsConstructor

public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Answer_Id")
    private Long answerId;

    @Column(name = "Content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "Is_Correct")
    private Boolean isCorrect = false;

    @ManyToOne
    @JoinColumn(name = "Question_Id")
    @JsonBackReference // Tránh vòng lặp vô hạn khi serializing
    private Question question;
}