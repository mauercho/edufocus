package com.edufocus.edufocus.report.entity.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ReportListResponseDto {
    private String title;
    private Date date;
    private Long reportId;
}