package com.edufocus.edufocus.quiz.service;

import com.edufocus.edufocus.quiz.entity.*;
import com.edufocus.edufocus.quiz.repository.QuizRepository;
import com.edufocus.edufocus.quiz.repository.QuizSetRepository;
import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizSetServiceImpl implements QuizSetService {

    private final QuizSetRepository quizSetRepository;

    private final UserRepository userRepository;

    @Override
    public QuizSet createQuizSet(Long userId, String title) {
        QuizSet quizSet = new QuizSet();

        User user = userRepository.findById(userId).get();
        quizSet.setUser(user);
        quizSet.setTitle(title);

        return quizSetRepository.save(quizSet);
    }

    @Override
    public void updateQuizSet(QuizSet quizSet) {

    }

    @Override
    public void deleteQuizSet(long quizSetId) {
        quizSetRepository.deleteById(quizSetId);
    }

    @Override
    public QuizSet findQuizSet(long quizSetId) {
        return quizSetRepository.findById(quizSetId).get();
    }

    @Override
    public QuizSetResponse findQuizSetResponse(long quizSetId) {
        QuizSet quizSet = findQuizSet(quizSetId);

        List<QuizResponse> quizResponses = new ArrayList<>();
        for (Quiz quiz : quizSet.getQuizzes()) {
            QuizResponse quizResponse = new QuizResponse().builder()
                    .question(quiz.getQuestion())
                    .choices(quiz.getChoices())
                    .build();
            quizResponses.add(quizResponse);
        }

        QuizSetResponse quizSetResponse = new QuizSetResponse().builder()
                .title(quizSet.getTitle())
                .image(quizSet.getImage())
                .quizzes(quizResponses)
                .build();

        return quizSetResponse;
    }


}
