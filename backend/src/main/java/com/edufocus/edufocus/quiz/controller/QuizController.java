package com.edufocus.edufocus.quiz.controller;

import com.edufocus.edufocus.quiz.entity.*;
import com.edufocus.edufocus.quiz.service.QuizService;
import com.edufocus.edufocus.quiz.service.QuizSetService;
import com.edufocus.edufocus.user.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/quiz")
@Slf4j
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    private final QuizSetService quizSetService;

    private final JWTUtil jwtUtil;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createQuizSet(@RequestHeader("Authorization") String accessToken, @RequestPart QuizSetCreateRequest quizSetCreateRequest
            , @RequestPart(value = "images", required = false) List<MultipartFile> images) throws IOException {
        long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        if (quizSetCreateRequest.getQuizzes().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        for (MultipartFile image : images) {
            if (!image.isEmpty() && !image.getContentType().startsWith("image")) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        QuizSet quizSet = quizSetService.createQuizSet(userId, quizSetCreateRequest.getTitle());

        int imageIdx = 0;
        for (QuizCreateRequest quizCreateRequest : quizSetCreateRequest.getQuizzes()) {
            quizService.createQuiz(quizSet, quizCreateRequest, images.get(imageIdx++));
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/student/{quizsetId}")
    public ResponseEntity<?> getQuizzes(@PathVariable Long quizsetId) {
        QuizSetResponse quizSet = quizSetService.findQuizSetResponse(quizsetId);

        return new ResponseEntity<>(quizSet, HttpStatus.OK);
    }

    @GetMapping("/teacher/{quizsetId}")
    public ResponseEntity<?> getQuizzesIncludeAnswer(@RequestHeader("Authorization") String accessToken, @PathVariable Long quizsetId) {
        long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        QuizSet quizSet = quizSetService.findQuizSet(quizsetId);
        if (quizSet.getUser().getId() != userId) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(quizSet, HttpStatus.OK);
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateQuizSet(@RequestHeader("Authorization") String accessToken, @RequestPart QuizSetUpdateRequest quizSetUpdateRequest
            , @RequestPart(value = "images", required = false) List<MultipartFile> images) throws IOException {
        long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        QuizSet quizset = quizSetService.findQuizSet(quizSetUpdateRequest.getId());
        if (userId != quizset.getUser().getId()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (quizset.isTested()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        for (MultipartFile image : images) {
            if (!image.isEmpty() && !image.getContentType().startsWith("image")) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        quizSetService.updateQuizSet(quizSetUpdateRequest.getId(), quizSetUpdateRequest.getTitle());

        Map<Long, Boolean> quizUpdatedCheckMap = new HashMap<>();
        for (Quiz quiz : quizset.getQuizzes()) {
            quizUpdatedCheckMap.put(quiz.getId(), false);
        }
        int imageIdx = 0;
        for (QuizUpdateRequest quizUpdateRequest : quizSetUpdateRequest.getQuizzes()) {
            if (quizUpdateRequest.getId() == null) {
                QuizCreateRequest quizCreateRequest = QuizCreateRequest.builder()
                        .question(quizUpdateRequest.getQuestion())
                        .answer(quizUpdateRequest.getAnswer())
                        .choices(quizUpdateRequest.getChoices())
                        .build();

                quizService.createQuiz(quizset, quizCreateRequest, images.get(imageIdx++));
            } else {
                quizService.updateQuiz(quizUpdateRequest, images.get(imageIdx++));

                quizUpdatedCheckMap.put(quizUpdateRequest.getId(), true);
            }
        }

        for (Long quizId : quizUpdatedCheckMap.keySet()) {
            if (!quizUpdatedCheckMap.get(quizId)) {
                quizService.removeQuiz(quizId);
            }
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{quizsetId}")
    public ResponseEntity<?> deleteQuizSet(@RequestHeader("Authorization") String accessToken, @PathVariable long quizsetId) {
        long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        if (!quizSetService.deleteQuizSet(userId, quizsetId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<?> getQuizSets(@RequestHeader("Authorization") String accessToken) {
        long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        return new ResponseEntity<>(quizSetService.findMyQuizSetResponses(userId), HttpStatus.OK);
    }
}
