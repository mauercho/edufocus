package com.edufocus.edufocus.quiz.service;

import com.edufocus.edufocus.quiz.entity.*;
import com.edufocus.edufocus.quiz.repository.QuizSetRepository;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizSetServiceImpl implements QuizSetService {

    private final QuizSetRepository quizSetRepository;

    private final UserRepository userRepository;

    @Override
    public QuizSet createQuizSet(long userId, String title) {
        User user = userRepository.findById(userId).orElseThrow(NoSuchElementException::new);

        QuizSet quizSet = QuizSet.builder()
                .user(user)
                .title(title)
                .build();

        return quizSetRepository.save(quizSet);
    }

    @Override
    public void updateQuizSet(QuizSet quizSet) {

    }

    @Override
    public boolean deleteQuizSet(long userId, long quizSetId) {
        QuizSet quizSet = quizSetRepository.findById(quizSetId).orElseThrow(NoSuchElementException::new);

        if (userId != quizSet.getUser().getId()) {
            return false;
        }

        quizSetRepository.deleteById(quizSetId);
        return true;
    }

    @Override
    public QuizSet findQuizSet(long quizSetId) {
        return quizSetRepository.findById(quizSetId).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public QuizSetResponse findQuizSetResponse(long quizSetId) {
        QuizSet quizSet = quizSetRepository.findById(quizSetId).orElseThrow(NoSuchElementException::new);

        List<QuizResponse> quizResponses = new ArrayList<>();
        for (Quiz quiz : quizSet.getQuizzes()) {
            QuizResponse quizResponse = QuizResponse.builder()
                    .question(quiz.getQuestion())
                    .image(quiz.getImage())
                    .choices(quiz.getChoices())
                    .build();
            quizResponses.add(quizResponse);
        }

        return QuizSetResponse.builder()
                .title(quizSet.getTitle())
                .quizzes(quizResponses)
                .build();

    }

    @Override
    public List<MyQuizSetResponse> findMyQuizSetResponses(long userId) {
        List<QuizSet> quizSetList = quizSetRepository.findQuizSetsByUserId(userId);

        List<MyQuizSetResponse> myQuizSetResponses = new ArrayList<>();
        for (QuizSet quizSet : quizSetList) {
            MyQuizSetResponse myQuizSetResponse = MyQuizSetResponse.builder()
                    .quizSetId(quizSet.getId())
                    .title(quizSet.getTitle())
                    .build();

            myQuizSetResponses.add(myQuizSetResponse);
        }

        return myQuizSetResponses;

    }

}
