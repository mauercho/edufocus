package com.edufocus.edufocus.qna.entity;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.user.model.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.checkerframework.checker.units.qual.C;

import java.util.Date;

@Entity
@Getter
@Setter
public class Qna {

    // 연관관계 주인


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "qna_id")
    private Long id;


    @Column
    private String title;

    @Column
    private String content;


    @Column(name = "created_at")
    @Temporal(TemporalType.DATE)
    private Date createdAt;

    @Column(name = "modified_at")
    @Temporal(TemporalType.DATE)
    private Date modifiedAt;

    @Column
    private String answer;


    @ManyToOne
    @JoinColumn(name= "id")
    private User user;

    @ManyToOne
    @JoinColumn(name= "lecture_id")
    private Lecture lecture;


}
