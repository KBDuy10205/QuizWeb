package com.example.quiz.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quiz.model.Account;
import com.example.quiz.model.User;
import com.example.quiz.repository.AccountRepository;
import com.example.quiz.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class AuthService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository; // Bạn cần tạo tương tự AccountRepository

    public Map<String, Object> login(String username, String password) {
        // 1. Tìm account
        Account account = accountRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại!"));

        // 2. Kiểm tra mật khẩu (Nên dùng BCrypt ở bước tiếp theo)
        if (!account.getPassword().equals(password)) {
            throw new RuntimeException("Mật khẩu không chính xác!");
        }

        // 3. Lấy thông tin User chi tiết thông qua đối tượng account
        User user = userRepository.findByAccount(account)
        .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin chi tiết người dùng!"));

        // 4. Trả về thông tin cần thiết cho Frontend
        Map<String, Object> response = new HashMap<>();
        response.put("accountId", account.getAccountId());
        response.put("fullName", user.getFullName());
        response.put("email", user.getEmail());
        
        return response;
    }

    //Đăng ký
    @Transactional // Đảm bảo nếu lưu User lỗi thì Account cũng sẽ bị hủy (Rollback)
    public void register(Map<String, String> data) {
        // 1. Kiểm tra trùng lặp Username
        if (accountRepository.findByUserName(data.get("username")).isPresent()) {
            throw new RuntimeException("Tên đăng nhập này đã được sử dụng!");
        }

        // 2. Tạo đối tượng Account và lưu xuống DB
        Account account = new Account();
        account.setUserName(data.get("username"));
        account.setPassword(data.get("password")); // Tạm thời để text, sau này sẽ dùng BCrypt
        account = accountRepository.save(account); // Lưu xong 'account' sẽ có ID tự sinh từ MySQL

        // 3. Tạo đối tượng User và gắn mối quan hệ với Account vừa tạo
        User user = new User();
        user.setFullName(data.get("fullName"));
        user.setEmail(data.get("email"));
        user.setPhone(data.get("phone"));
        user.setAccount(account); // Gắn Account_Id vào bảng Users
        
        userRepository.save(user);
    }
}