package com.edufocus.edufocus.user.model.entity.dto;

import com.edufocus.edufocus.user.model.entity.vo.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class RequestJoinDto {
    private String userId;
    private String email;
    private String password;
    private UserRole role;
    private String name;
}
