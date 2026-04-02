package com.example.quiz.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Flashcard_Sets")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class FlashcardSet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Set_Id")
    private Integer setId;

    @Column(name = "Set_Name", nullable = false, length = 255)
    private String setName;

    @Column(name = "Description", length = 500)
    private String description;

    @Column(name = "Created_At", updatable = false)
    private String createdAt;

    @ManyToOne
    @JoinColumn(name = "Created_By", referencedColumnName = "Account_Id")
    private Account createdBy;

    @OneToMany(mappedBy = "flashcardSet")
    private List<Flashcard> flashcards;
}
