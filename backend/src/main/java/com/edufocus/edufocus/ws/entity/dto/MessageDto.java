package com.edufocus.edufocus.ws.entity.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDto {
    long lectureId;
    long userId;
    String name;
    String content;
}
