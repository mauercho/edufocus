package com.edufocus.edufocus.registration.entity;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.report.entity.vo.Report;
import com.edufocus.edufocus.report.entity.vo.ReportSet;
import com.edufocus.edufocus.user.model.entity.vo.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @Enumerated(EnumType.STRING)
    private RegistrationStatus status;

    public boolean isAccepted(){
        return status == RegistrationStatus.ACCEPTED;
    }

    public Report makeReport(ReportSet reportSet, QuizSet quizSet, long lectureId){
        return Report.builder()
                .allCount(0)
                .correctCount(-1)
                .lectureId(lectureId)
                .user(user)
                .build();

    }
}
