package com.example.quiz.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "Accounts") // Khớp với tên bảng trong MySQL
@Data // Tự động tạo Getter, Setter, toString, EqualsAndHashCode
@NoArgsConstructor // Tạo constructor không tham số
@AllArgsConstructor // Tạo constructor đầy đủ tham số

public class Account {
    //Xác định khóa chính, thiết lập tự động tăng
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "Account_Id") // Khớp chính xác với tên cột trong SQL
    private Integer accountId;

    @Column(name = "User_Name", nullable = false, unique = true, length = 50) 
    private String userName;

    @Column(name = "Password", nullable = false, length = 255)
    private String password;

    @Column(name = "Created_At", updatable = false)
    private LocalDateTime createdAt;

    
    // Hàm này tự động chạy trước khi bản ghi được chèn vào DB
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
