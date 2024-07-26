package com.edufocus.edufocus.quiz.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuizCreateRequest {

    private String title;

    private String description;

    private String answer;

    private String quizType;

    private String choice1;

    private String choice2;

    private String choice3;

    private String choice4;
}
