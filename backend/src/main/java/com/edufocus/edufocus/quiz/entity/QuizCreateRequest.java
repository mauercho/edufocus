package com.edufocus.edufocus.quiz.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuizCreateRequest {

    private String question;

    private String answer;

    private List<ChoiceCreateRequest> choices;
}
