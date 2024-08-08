package com.edufocus.edufocus.report.entity.vo;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.report.entity.dto.ReportSetResponse;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;


import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;



@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportSet {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    @CreatedDate
    private LocalDateTime createAt;

    @OneToMany(mappedBy = "reportSet", cascade = CascadeType.ALL)
    private List<Report> reports;

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @ManyToOne
    @JoinColumn(name = "quizSet_id")
    private QuizSet quizSet;

    public ReportSetResponse makeReportSetResponse() {
        return ReportSetResponse.builder()
                .reportSetId(id)
                .quizSetTitle(quizSet.getTitle())
                .testAt(createAt)
                .build();
    }
}
