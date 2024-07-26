package com.edufocus.edufocus.quiz.service;

import com.edufocus.edufocus.quiz.entity.QuizCreateRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuizService {

    void createQuiz(long quizSetId, QuizCreateRequest
            QuizCreateRequest);

    boolean deleteQuiz(long quizId);
}
