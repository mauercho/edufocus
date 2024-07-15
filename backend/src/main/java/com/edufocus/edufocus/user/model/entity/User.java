package com.edufocus.edufocus.user.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 설정
    private Long id;

    private String user_id;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING) // 혹은 EnumType.ORDINAL
    private UserRole role;



}
