package com.edufocus.edufocus.quiz.entity;

import com.edufocus.edufocus.report.entity.dto.ChoiceDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Choice {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name = "QuizId")
    @JsonBackReference
    private Quiz quiz;

    @Column
    private int num;

    @Column
    private String content;

    public ChoiceDto makeChoiceDto(){
        return ChoiceDto.builder()
                .num(num)
                .content(content)
                .build();
    }
}
