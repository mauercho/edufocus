package com.edufocus.edufocus.report.entity.vo;

import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.report.entity.dto.ReportResponse;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int allCount;

    private int correctCount;

    @Column
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date testAt;

    private Long lectureId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "quizset_id")
    private QuizSet quizSet;

    @ManyToOne
    @JoinColumn(name = "reportset_id")
    private ReportSet reportSet;

    @OneToMany(mappedBy = "report",  cascade = CascadeType.REMOVE)
    private List<Answer> answers;

    public ReportResponse makeReportResponse(){
        return ReportResponse.builder()
                .reportId(id)
                .name(user.getName())
                .title(quizSet.getTitle())
                .allCount(allCount)
                .correctCount(correctCount)
                .date(testAt)
                .build();
    }
}
