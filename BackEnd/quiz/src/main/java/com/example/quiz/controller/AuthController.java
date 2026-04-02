package com.example.quiz.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.quiz.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") 
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    //API đăng nhập
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            String username = loginData.get("username");
            String password = loginData.get("password");

            Map<String, Object> userData = authService.login(username, password);
            return ResponseEntity.ok(userData);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    //API đăng ký
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> data) {
        try {
            authService.register(data);
            // Trả về JSON cho đồng bộ với fetch()
            return ResponseEntity.ok(Map.of("message", "Đăng ký thành công!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}