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
@Table(name = "Result_Details")
@Data
@AllArgsConstructor 
@NoArgsConstructor
public class ResultDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Result_Detail_Id")
    private Integer resultDetailId;

    @ManyToOne
    @JoinColumn(name = "Result_Id")
    @JsonIgnore
    private Result result;
    

    @ManyToOne
    @JoinColumn(name = "Question_Id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "Answer_Id")
    private Answer answer;
}
