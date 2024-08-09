package com.edufocus.edufocus.board.entity.vo;


import com.edufocus.edufocus.board.entity.dto.ResponseBoardDetailDto;
import com.edufocus.edufocus.board.entity.dto.ResponseBoardSummaryDto;
import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@EntityListeners(AuditingEntityListener.class)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Board {

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = true)
    private int viewCount;

    @Column
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date modifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Lecture lecture;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Comment> comments;

    public ResponseBoardSummaryDto makeSummaryDto(){
        return ResponseBoardSummaryDto.builder()
                .id(id)
                .title(title)
                .name(user.getName())
                .createdAt(createdAt)
                .build();
    }

    public ResponseBoardDetailDto makeDetailDto(long userId){
        return ResponseBoardDetailDto.builder()
                .id(id)
                .name(user.getName())
                .title(title)
                .content(content)
                .isMine(user.getId() == userId)
                .createdAt(createdAt)
                .modifiedAt(modifiedAt)
                .build();
    }
}
