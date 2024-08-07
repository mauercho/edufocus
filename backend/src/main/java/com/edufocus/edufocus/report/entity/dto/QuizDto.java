package com.edufocus.edufocus.report.entity.dto;

import com.edufocus.edufocus.quiz.entity.Choice;
import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuizDto {
    private long id;
    private String question;
    private String image;
    private String answer;
    private String userAnswer;
    private List<ChoiceDto> choices;
}
