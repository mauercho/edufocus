package com.edufocus.edufocus.board.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class ResponseBoardDetailDto {
    private int id;
    private String name;
    private String content;
    private int viewCount;
    private LocalTime createdAt;
    private LocalTime modifiedAt;
}
