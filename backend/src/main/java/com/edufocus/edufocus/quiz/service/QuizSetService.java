package com.edufocus.edufocus.quiz.service;

import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.quiz.entity.SetCreateRequest;
import org.springframework.stereotype.Service;

@Service
public interface QuizSetService {

    QuizSet createQuizSet(SetCreateRequest setCreateRequest);

    void updateQuizSet(QuizSet quizSet);

    void deleteQuizSet(long quizSetId);

    QuizSet findQuizSet(long quizSetId);
}
