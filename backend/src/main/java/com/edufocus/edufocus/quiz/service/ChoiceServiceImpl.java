package com.edufocus.edufocus.quiz.service;

import com.edufocus.edufocus.quiz.entity.Choice;
import com.edufocus.edufocus.quiz.entity.ChoiceCreateRequest;
import com.edufocus.edufocus.quiz.repository.ChoiceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ChoiceServiceImpl implements ChoiceService {

    private final ChoiceRepository choiceRepository;

    public void createChoice(ChoiceCreateRequest choiceCreateRequest) {
        Choice choice = new Choice().builder()
                .num(choiceCreateRequest.getNum())
                .content(choiceCreateRequest.getContent())
                .build();

        choiceRepository.save(choice);
    }
}
