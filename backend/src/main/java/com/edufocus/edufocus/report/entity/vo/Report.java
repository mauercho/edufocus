package com.edufocus.edufocus.report.entity.vo;

import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.user.model.entity.vo.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int allCount;
    private int correctCount;
    private Date testAt;

    @ManyToOne
    @JoinColumn(name= "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name= "quizset_id")
    private QuizSet quizSet;

}
