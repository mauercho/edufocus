package com.edufocus.edufocus.quiz.service;

import com.edufocus.edufocus.quiz.entity.*;
import com.edufocus.edufocus.quiz.repository.ChoiceRepository;
import com.edufocus.edufocus.quiz.repository.QuizRepository;
import com.edufocus.edufocus.quiz.repository.QuizSetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final ChoiceRepository choiceRepository;

    private final QuizRepository quizRepository;

    private final QuizSetRepository quizSetRepository;

    @Override
    public void createQuiz(QuizSet quizSet, QuizCreateRequest quizCreateRequest) {
        Quiz quiz = new Quiz().builder()
                .quizSet(quizSet)
                .question(quizCreateRequest.getQuestion())
                .answer(quizCreateRequest.getAnswer())
                .build();

        List<Choice> choices = new ArrayList<>();

        for (ChoiceCreateRequest choiceCreateRequest : quizCreateRequest.getChoices()) {
            Choice choice = new Choice().builder()
                    .quiz(quiz)
                    .num(choiceCreateRequest.getNum())
                    .content(choiceCreateRequest.getContent())
                    .build();
            choices.add(choice);
            choiceRepository.save(choice);
        }

        quiz.setChoices(choices);

        quizRepository.save(quiz);
    }

    @Override
    public boolean deleteQuiz(long quizId) {
        // 유저 아이디 정보 조회 후 검증 로직 추가 예정
        // jwt -> 로그인 유저 정보 조회
        // quizId -> 퀴즈 정보 조회 -> 퀴즈셋 정보 조회
        // 퀴즈셋 생성자와 로그인 유저의 id값이 일치하는지 확인 -> 불일치시 삭제 실패

        quizRepository.deleteById(quizId);
        return true;
    }

}
