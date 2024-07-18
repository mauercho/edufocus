package com.edufocus.edufocus.quiz.controller;

import com.edufocus.edufocus.quiz.entity.*;
import com.edufocus.edufocus.quiz.service.QuizService;
import com.edufocus.edufocus.quiz.service.QuizSetService;
import com.edufocus.edufocus.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quiz")
@Slf4j
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    private final QuizSetService quizSetService;

    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createQuizSet(@RequestBody QuizSetCreateRequest quizSetCreateRequest) {

        Long userId = 1L;

        String title = quizSetCreateRequest.getTitle();
        String image = quizSetCreateRequest.getImage();

        SetCreateRequest setCreateRequest = new SetCreateRequest(userId, title, image);

        QuizSet quizSet = quizSetService.createQuizSet(setCreateRequest);

        for (QuizCreateRequest quizCreateRequest : quizSetCreateRequest.getQuizzes()) {
            quizService.createQuiz(quizSet.getId(), quizCreateRequest);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
