package com.example.quiz.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
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
@Table(name = "Results")
@Data
@AllArgsConstructor 
@NoArgsConstructor

public class Result {
    @Id //Đánh dấu trường này là khóa chính
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Tự động tăng ID
    @Column(name = "Result_Id")
    private Integer resultId;

    @Column(name = "Score")
    private BigDecimal score;

    @Column(name = "Start_Time")
    private LocalDateTime startTime;

    @Column(name = "End_Time")
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "Exam_Id", referencedColumnName = "Exam_Id")
    private Exam exam;

    @ManyToOne
    @JoinColumn(name = "Account_Id", referencedColumnName = "Account_Id") 
    private Account account;

    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResultDetail> resultDetails;
}
