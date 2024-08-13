package com.edufocus.edufocus.board.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class ResponseBoardDetailDto {
    private long id;
    private String name;
    private String title;
    private String content;
    private boolean isMine;
    private Date createdAt;
    private Date modifiedAt;
}
