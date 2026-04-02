package com.example.quiz.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Users") // Khớp với tên bảng Users trong MySQL
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "User_Id")
    private Integer userId;

    @Column(name = "Full_Name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "Email", unique = true, length = 100)
    private String email;

    @Column(name = "Phone", length = 15)
    private String phone;

    // Thiết lập mối quan hệ 1-1 với bảng Accounts
    @OneToOne
    @JoinColumn(name = "Account_Id", referencedColumnName = "Account_Id")
    private Account account;
}