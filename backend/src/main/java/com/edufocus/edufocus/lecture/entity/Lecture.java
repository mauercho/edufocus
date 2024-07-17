package com.edufocus.edufocus.lecture.entity;

import com.edufocus.edufocus.qna.entity.Qna;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Lecture {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name="lecture_id")
    private Long id;

    @Column(name = "teacher_id")
    private String teacherId;

    @Column
    private String title;

    @Lob
    private String description;

    @Column(name = "start_date")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Lob
    private String plan;

    @Column
    private boolean online;

//
//    @OneToMany(mappedBy = "lecture")
//    private List<Qna> qnas = new ArrayList<>();

}
