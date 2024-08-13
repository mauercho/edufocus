package com.edufocus.edufocus.user.model.entity.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PasswordDto {
    String currentPassword;
    String newPassword;
    String newPasswordCheck;
}
