package com.edufocus.edufocus.report.entity.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportSetResponse {
    private UUID reportSetId;
    private String quizSetTitle;
    private LocalDateTime testAt;
}
