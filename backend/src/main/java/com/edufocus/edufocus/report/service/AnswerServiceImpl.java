package com.edufocus.edufocus.report.service;

import com.edufocus.edufocus.report.entity.Answer;
import com.edufocus.edufocus.report.repository.AnswerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService{

    private final AnswerRepository answerRepository;

    @Override
    public void save(Answer answer) {

        answerRepository.save(answer);

    }
}
