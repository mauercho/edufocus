package com.edufocus.edufocus.report.entity.dto;

import com.edufocus.edufocus.quiz.entity.Quiz;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Builder
public class ReportDetailResponseDto {
    private int allCount;
    private String title;
    private int correctCount;
    private LocalDateTime testAt;
    private List<QuizDto> correctQuizzes;
    private List<QuizDto> incorrectQuizzes;


}