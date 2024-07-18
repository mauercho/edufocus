package com.edufocus.edufocus.quiz.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuizCreateRequest {

    private String title;

    private String description;

    private boolean isSingle;

    private String answer;

    private String image;

}
