package com.edufocus.edufocus.quiz.service;

import com.edufocus.edufocus.quiz.entity.MyQuizSetResponse;
import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.quiz.entity.QuizSetResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuizSetService {

    QuizSet createQuizSet(long userId, String title);

    void updateQuizSet(QuizSet quizSet);

    boolean deleteQuizSet(long userId, long quizSetId);

    QuizSet findQuizSet(long quizSetId);

    QuizSetResponse findQuizSetResponse(long quizSetId);

    List<MyQuizSetResponse> findMyQuizSetResponses(long userId);
}
