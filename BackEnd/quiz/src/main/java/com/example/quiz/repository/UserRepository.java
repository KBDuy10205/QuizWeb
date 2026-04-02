package com.example.quiz.repository;

import com.example.quiz.model.User;
import com.example.quiz.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Tìm thông tin User dựa trên đối tượng Account (Khóa ngoại)
    Optional<User> findByAccount(Account account);
}