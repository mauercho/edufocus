package com.edufocus.edufocus.lecture.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LectureSearchResponse {

    private Long id;

    private String title;

    private String image;
}
