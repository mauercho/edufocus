package com.edufocus.edufocus.quiz.entity;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizSetResponse {

    private String title;

    private String image;

    private List<QuizResponse> quizzes;
}
