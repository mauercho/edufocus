package com.edufocus.edufocus.quiz.controller;

import com.edufocus.edufocus.quiz.entity.*;
import com.edufocus.edufocus.quiz.repository.QuizRepository;
import com.edufocus.edufocus.quiz.service.QuizService;
import com.edufocus.edufocus.quiz.service.QuizSetService;
import com.edufocus.edufocus.user.model.service.UserService;
import com.edufocus.edufocus.user.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/quiz")
@Slf4j
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    private final QuizSetService quizSetService;

    private final UserService userService;

    private final JWTUtil jwtUtil;
    private final QuizRepository quizRepository;

    @PostMapping
    public ResponseEntity<?> createQuizSet(@RequestHeader("Authorization") String accessToken, @RequestBody QuizSetCreateRequest quizSetCreateRequest) {
        Long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        String title = quizSetCreateRequest.getTitle();
        String image = quizSetCreateRequest.getImage();

        SetCreateRequest setCreateRequest = new SetCreateRequest(userId, title, image);

        QuizSet quizSet = quizSetService.createQuizSet(setCreateRequest);

        for (QuizCreateRequest quizCreateRequest : quizSetCreateRequest.getQuizzes()) {
            quizService.createQuiz(quizSet.getId(), quizCreateRequest);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{quizsetId}")
    public ResponseEntity<?> getQuizzes(@PathVariable Long quizsetId) {
        QuizSet quizSet = quizSetService.findQuizSet(quizsetId);

        return new ResponseEntity<>(quizSet, HttpStatus.OK);
    }
}
