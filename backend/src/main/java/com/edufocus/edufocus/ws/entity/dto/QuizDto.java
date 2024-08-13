package com.edufocus.edufocus.ws.entity.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class QuizDto {
    long userId;
    long quizSetId;
    UUID ReportSetId;
}
