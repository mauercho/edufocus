package com.edufocus.edufocus.user.model.entity;

import com.edufocus.edufocus.qna.entity.Qna;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.checkerframework.checker.units.qual.A;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 설정
    @Column(name = "id")
    private Long id;


    @Column(name = "user_id", unique = true, nullable = false)
    private String userId;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING) // 혹은 EnumType.ORDINAL
    private UserRole role;
    private String refreshToken;

    private String name;




}
