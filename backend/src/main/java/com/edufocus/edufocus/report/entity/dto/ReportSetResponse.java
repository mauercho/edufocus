package com.edufocus.edufocus.report.entity.dto;


import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportSetResponse {
    private UUID reportSetId;
    private String quizSetTitle;
    private LocalDateTime testAt;
}
