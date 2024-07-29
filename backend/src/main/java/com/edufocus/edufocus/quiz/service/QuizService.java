package com.edufocus.edufocus.quiz.service;

import com.edufocus.edufocus.quiz.entity.QuizCreateRequest;
import com.edufocus.edufocus.quiz.entity.QuizSet;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuizService {

    void createQuiz(QuizSet quizSet, QuizCreateRequest quizCreateRequest);

    boolean deleteQuiz(long quizId);
}
