package com.edufocus.edufocus.board.entity.vo;


import com.edufocus.edufocus.user.model.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class Comment {
    @Id
    @GeneratedValue
    private long id;
    @Column
    private String content;

    @Column
    private LocalTime createdAt;

    @Column
    private LocalTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "board_id")
    Board board;


}
