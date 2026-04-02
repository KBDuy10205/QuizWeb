package com.example.quiz.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Flashcards") 
@Data
@AllArgsConstructor 
@NoArgsConstructor 

public class Flashcard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Card_Id")
    private Integer flashcardId;

    @Column(name = "Front_Text", nullable = false)
    private String frontText;

    @Column(name = "Back_Text", nullable = false)
    private String backText;

    @ManyToOne
    @JoinColumn(name = "Set_Id") // khóa ngoại
    @JsonIgnore // tránh vòng lặp vô hạn khi serial hóa
    private FlashcardSet flashcardSet; 
}