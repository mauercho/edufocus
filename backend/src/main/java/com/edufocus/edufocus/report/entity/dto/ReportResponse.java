package com.edufocus.edufocus.report.entity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Builder
public class ReportResponse {
    private long reportId;
    private String name;
    private String title;
    private int allCount;
    private int correctCount;
    private LocalDateTime date;
}
