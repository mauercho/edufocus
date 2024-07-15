package com.edufocus.edufocus.user.model.service;


import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.exception.UserException;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
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
        Optional<User> findUser = userRepository.findById(user.getId());

        if(findUser.isEmpty())
        {
            throw new UserException("없는 유저");

        }
        return findUser.get();
    }



}
