package com.edufocus.edufocus.lecture.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LectureDetailResponse {

    private Long id;

    private String teacherName;

    private String title;

    private String description;

    private String image;

    private Date startDate;

    private Date endDate;

    private String plan;

    private boolean online;
}
