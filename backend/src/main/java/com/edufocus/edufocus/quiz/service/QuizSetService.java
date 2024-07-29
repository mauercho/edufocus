package com.edufocus.edufocus.quiz.service;

import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.quiz.entity.QuizSetResponse;
import org.springframework.stereotype.Service;

@Service
public interface QuizSetService {

    QuizSet createQuizSet(Long userId, String title);

    void updateQuizSet(QuizSet quizSet);

    void deleteQuizSet(long quizSetId);

    QuizSet findQuizSet(long quizSetId);

    QuizSetResponse findQuizSetResponse(long quizSetId);

}
