package com.edufocus.edufocus.quiz.service;

import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.quiz.entity.SetCreateRequest;
import com.edufocus.edufocus.quiz.repository.QuizSetRepository;
import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizSetServiceImpl implements QuizSetService {

    private final QuizSetRepository quizSetRepository;

    private final UserRepository userRepository;


    @Override
    public QuizSet createQuizSet(SetCreateRequest setCreateRequest) {
        QuizSet quizSet = new QuizSet();

        User user = userRepository.findById(setCreateRequest.getUserId()).get();

        quizSet.setUser(user);

        quizSet.setTitle(setCreateRequest.getTitle());
        quizSet.setImage(setCreateRequest.getImage());

        return quizSetRepository.save(quizSet);
    }

    @Override
    public void updateQuizSet(QuizSet quizSet) {

    }

    @Override
    public void deleteQuizSet(long quizSetId) {
        quizSetRepository.deleteById(quizSetId);
    }
}
