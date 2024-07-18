package com.edufocus.edufocus.board.entity.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestBoardDto {
    private long lectureId;
    private String title;
    private String category;
    private String content;
}
