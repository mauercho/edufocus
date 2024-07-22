package com.edufocus.edufocus.ws.entity.vo;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.user.model.entity.User;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 설정
    int id;
    @Column
    String sessionId;
    @OneToOne
    User user;
    @ManyToOne
    Lecture lecture;
}