package com.edufocus.edufocus.ws.entity.dto;


import lombok.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatUserDto {
    long userId;
    long lectureId;
    String name;
}
