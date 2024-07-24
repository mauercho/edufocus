package com.edufocus.edufocus.report.entity.vo;


import com.edufocus.edufocus.quiz.entity.Quiz;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Answer {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String userAnswer;
    private boolean isCorrect;

    @ManyToOne
    @JoinColumn(name= "report_id")
    private Report report;

    @ManyToOne
    @JoinColumn(name= "quiz_id")
    private Quiz quiz;


}
