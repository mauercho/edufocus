package com.edufocus.edufocus.user.model.service;


import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.exception.UserException;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    @Autowired
    private final UserRepository userRepository;


    public void join(User user)
    {
        userRepository.save(user);
    }

    public User login(User user) throws SQLException
    {
        Optional<User> findUser = userRepository.findByUserId(user.getUserId());


        if(findUser.isEmpty())
        {
            throw new UserException("없는 유저");

        }


        if(findUser.isPresent())
        {

            User find = findUser.get();
            if(find.getPassword().equals(user.getPassword()))
            {
                return find;
            }
            else{
                throw new UserException("비밀번호 틀림");

            }
        }
        else{
            throw new UserException("없는 유저");


        }

    }
    @Override
    public void saveRefreshToken(Long id, String refreshToken) throws Exception {
        userRepository.saveRefreshToken(id, refreshToken);
    }

    @Override
    public String getRefreshToken(Long id) throws Exception {
        return userRepository.getRefreshToken(id);
    }

    @Override
    public void deleteRefreshToken(Long id) throws Exception {
        userRepository.deleteRefreshToken(id);
    }

}
