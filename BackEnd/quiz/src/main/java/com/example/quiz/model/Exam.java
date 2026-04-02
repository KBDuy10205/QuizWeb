package com.example.quiz.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import java.time.LocalDateTime;

@Entity
@Table(name = "Exams")
@Data
@AllArgsConstructor 
@NoArgsConstructor
public class Exam {
    @Id //Đánh dấu trường này là khóa chính
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Tự động tăng ID
    @Column(name = "Exam_Id")
    private Integer examId;

    @Column(name = "Exam_Name")
    private String examName;

    @Column(name = "Time_Limit")
    private Integer timeLimit;

    @Column(name = "Total_Questions")
    private Integer totalQuestions;

    @Column(name = "Created_At")
    private LocalDateTime createdAt = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now(); // Tự động gán thời gian hiện tại khi INSERT
    }

    @ManyToOne
    @JoinColumn(name = "Created_By", referencedColumnName = "Account_Id") // Khóa ngoại liên kết với Account
    private Account createdBy;
    
    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true) // Quan hệ một-nhiều với Question
    private List<Question> questions; 
    
    
}