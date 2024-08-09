package com.edufocus.edufocus.qna.entity;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.user.model.entity.vo.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor


public class Qna {

    // 연관관계 주인


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qna_id")
    private Long id;


    @Column
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;


    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "modified_at")
    @Temporal(TemporalType.DATE)
    private Date modifiedAt;

    @Column(columnDefinition = "TEXT")
    private String answer;


    private String name;
    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    private boolean isMine;


}
