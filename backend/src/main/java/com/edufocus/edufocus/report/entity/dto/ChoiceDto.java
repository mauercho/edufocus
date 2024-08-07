package com.edufocus.edufocus.report.entity.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Builder
public class ChoiceDto {
    int num;
    String content;
}
