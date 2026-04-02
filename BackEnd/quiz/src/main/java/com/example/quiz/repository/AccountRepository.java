package com.example.quiz.repository;

import com.example.quiz.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByUserName(String userName);
}