package com.edufocus.edufocus.quiz.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuizSetUpdateRequest {

    private long id;

    private String title;

    private List<QuizUpdateRequest> quizzes;

}
