package com.edufocus.edufocus.qna.entity;

import jakarta.persistence.Column;
import lombok.*;

@Getter
public class QnaRequestDto {


    private String title;
    private String content;
    private String answer;

    public static Qna toEntity(QnaRequestDto qnaRequestDto) {
        {

            return Qna.builder()
                    .content(qnaRequestDto.getContent())
                    .title(qnaRequestDto.getTitle())
                    .answer(qnaRequestDto.getAnswer())
                    .build();
        }
    }
}
