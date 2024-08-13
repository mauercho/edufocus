package com.edufocus.edufocus.quiz.entity;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyQuizSetResponse {

    private long quizSetId;

    private String title;
}
