package com.edufocus.edufocus.user.model.service;

import com.edufocus.edufocus.user.model.entity.dto.InfoDto;
import com.edufocus.edufocus.user.model.entity.dto.PasswordDto;
import com.edufocus.edufocus.user.model.entity.dto.RequestJoinDto;
import com.edufocus.edufocus.user.model.entity.vo.User;

public interface UserService {
    void join(RequestJoinDto requestJoinDto);

    User login(User user);

    void saveRefreshToken(Long id, String refreshToken);

    String getRefreshToken(Long id);

    void deleteRefreshToken(Long id);

    User userInfo(Long id);

    String getUserName(Long id);

    void changeUserInfo(InfoDto infoDto, Long id);

    void changePassword(PasswordDto passwordDto, Long id);

    boolean isUserIdExist(String userId);

    boolean isEmailExist(String email);

    void changeForgottenPassword(String email, String newPassword);
}
