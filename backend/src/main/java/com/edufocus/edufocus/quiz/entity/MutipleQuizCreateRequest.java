package com.edufocus.edufocus.quiz.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MutipleQuizCreateRequest extends QuizCreateRequest {

    private String choice1;

    private String choice2;

    private String choice3;

    private String choice4;
}
