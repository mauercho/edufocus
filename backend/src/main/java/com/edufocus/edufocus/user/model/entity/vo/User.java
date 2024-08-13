package com.edufocus.edufocus.user.model.entity.vo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 설정
    @Column(name = "id")
    private Long id;


    @Column(name = "user_id", unique = true, nullable = false)
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    @NotBlank(message = "아이디는 필수 입력 값입니다.")

    private String userId;

    @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "이메일 형식이 올바르지 않습니다.")
    private String email;
    private String password;
    @Enumerated(EnumType.STRING) // 혹은 EnumType.ORDINAL
    private UserRole role;
    private String refreshToken;

    private String name;




}
