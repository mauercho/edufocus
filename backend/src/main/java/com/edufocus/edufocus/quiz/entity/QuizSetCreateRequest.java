package com.edufocus.edufocus.quiz.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuizSetCreateRequest {

    private Long UserId;

    private String title;

    private String image;

    private List<QuizCreateRequest> quizzes;

}