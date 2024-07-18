package com.edufocus.edufocus.user.model.service;

import com.edufocus.edufocus.user.model.entity.User;

public interface UserService {
     void join(User user) throws Exception;
     User login(User user) throws Exception;
     public void saveRefreshToken(Long id, String refreshToken) throws Exception;
     public String getRefreshToken(Long id) throws Exception;
     public void deleteRefreshToken(Long id) throws Exception;

}
