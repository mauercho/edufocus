package com.edufocus.edufocus.report.entity.vo;


import com.edufocus.edufocus.quiz.entity.Quiz;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @Column
    private String userAnswer;

    @Column
    private boolean isCorrect;

    @ManyToOne
    @JoinColumn(name = "report_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Report report;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Quiz quiz;

}
