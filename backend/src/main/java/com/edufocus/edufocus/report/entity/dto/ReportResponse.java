package com.edufocus.edufocus.report.entity.dto;

import com.edufocus.edufocus.report.entity.vo.Answer;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class ReportResponse {

    private Long quizesetId;
    private Long userId;

    private String title;
    private int allCount;
    private int correctCount;
    private Date testAt;



}
