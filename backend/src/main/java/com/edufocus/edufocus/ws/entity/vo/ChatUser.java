package com.edufocus.edufocus.ws.entity.vo;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.ws.entity.dto.ChatUserDto;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column
    String sessionId;
    @OneToOne
    User user;
    @ManyToOne
    Lecture lecture;

    public ChatUserDto makeChatUserDto(){
        return ChatUserDto.builder()
                .userId(user.getId())
                .name(user.getName())
                .lectureId(lecture.getId())
                .build();
    }
}