package com.example.quiz.service;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.example.quiz.model.Account;
import com.example.quiz.model.Exam;
import com.example.quiz.model.Result;
import com.example.quiz.model.ResultDetail;
import com.example.quiz.repository.ResultDetailRepository;
import com.example.quiz.repository.ResultRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResultService {
    private final ResultRepository resultRepository;
    private final ResultDetailRepository resultDetailRepository;
    private final CrudRepository<Account,Integer> accountRepository;
    private final CrudRepository<Exam,Integer> examRepository;

    // Lưu kết quả làm bài thi của học sinh
    @Transactional
    public void saveResult(Result result) {
        // Thiết lập mối quan hệ giữa Result và ResultDetail
        for (ResultDetail rd : result.getResultDetails()) {
            rd.setResult(result);
        }

        // 1. Tìm Account thật trong DB
        Integer accountId = result.getAccount().getAccountId();

        Account account = accountRepository.findById(accountId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng này!"));
        
        result.setAccount(account);

        // 2. Tìm Exam thật trong DB
        Integer examId = result.getExam().getExamId();
        Exam exam = examRepository.findById(examId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy bài thi này!"));

        result.setExam(exam);

        // Lưu đối tượng Result vào cơ sở dữ liệu
        resultRepository.save(result);
    }

    // Lấy kết quả làm bài thi của học sinh theo resultId
    public Optional<Result> getResultById(Integer resultId) {
        return resultRepository.findById(resultId);
    }

    // Xóa kết quả làm bài thi của học sinh theo resultId
    @Transactional
    public void deleteResultById(Integer resultId) {
        Optional<Result> resultOpt = resultRepository.findById(resultId);
        if (resultOpt.isPresent()) { // Kiểm tra nếu Result tồn tại
            Result result = resultOpt.get();
            // Xóa tất cả các ResultDetail liên quan đến Result này
            resultDetailRepository.deleteAll(result.getResultDetails());
            // Sau đó xóa Result
            resultRepository.delete(result);
        }
    }

    //Lấy tất cả kết quả làm bài thi của học sinh theo Account_Id
    public Iterable<Result> getResultsByAccountId(Integer accountId) { 
        return resultRepository.findByAccount_AccountId(accountId);
    }
}
