package com.edufocus.edufocus.user.model.service;


import com.edufocus.edufocus.user.model.entity.dto.InfoDto;
import com.edufocus.edufocus.user.model.entity.dto.PasswordDto;
import com.edufocus.edufocus.user.model.entity.dto.RequestJoinDto;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.user.model.exception.UserException;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import com.edufocus.edufocus.user.util.PasswordUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;


    public void join(RequestJoinDto requestJoinDto) {
        User user = User.builder()
                .userId(requestJoinDto.getUserId())
                .email(requestJoinDto.getEmail())
                .password(PasswordUtils.hashPassword(requestJoinDto.getPassword()))
                .role(requestJoinDto.getRole())
                .name(requestJoinDto.getName())
                .build();
        userRepository.save(user);
    }


    public User login(User user) {
        Optional<User> findUser = userRepository.findByUserId(user.getUserId());

        if (findUser.isEmpty()) {
            throw new UserException("User does not exist");
        }

        User find = findUser.get();
        if (PasswordUtils.checkPassword(user.getPassword(), find.getPassword())) {
            return find;
        } else {
            throw new UserException("Incorrect password");
        }

    }

    @Override
    public User userInfo(Long id) {
        try {
            return userRepository.findById(id).get();
        } catch (Exception e) {
            throw new UserException(e.getMessage());
        }

    }


    @Override
    public String getUserName(Long id) {
        return userRepository.findById(id).get().getName();
    }


    @Override
    public void changeUserInfo(InfoDto infoDto, Long id) {

        User user = userRepository.findById(id).orElseThrow(IllegalArgumentException::new);

        if (infoDto.getName() != null)
            user.setName(infoDto.getName());

        if (infoDto.getEmail() != null)
            user.setEmail(infoDto.getEmail());

        userRepository.save(user);
    }


    @Override
    public void changePassword(PasswordDto passwordDto, Long id) {
        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            throw new UserException("User not found");
        }

        if (!PasswordUtils.checkPassword(passwordDto.getCurrentPassword(), user.getPassword())) {
            throw new UserException("Current password is incorrect");
        } else {
            if (!passwordDto.getNewPassword().equals(passwordDto.getNewPasswordCheck())) {
                throw new UserException("New password confirmation does not match");
            }
        }

        // Hash the new password before saving
        user.setPassword(PasswordUtils.hashPassword(passwordDto.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public boolean isUserIdExist(String userId) {
        return userRepository.findByUserId(userId).isPresent();
    }

    @Override
    public boolean isEmailExist(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public String getTempPassword() {
        char[] charSet = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
        String str = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    @Override
    public void saveRefreshToken(Long id, String refreshToken) {
        userRepository.saveRefreshToken(id, refreshToken);
    }

    @Override
    public String getRefreshToken(Long id) {
        return userRepository.getRefreshToken(id);
    }

    @Override
    public void deleteRefreshToken(Long id) {
        userRepository.deleteRefreshToken(id);
    }

    @Override
    public void changeForgottenPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            throw new UserException("User not found");
        }

        // Hash the new password before saving
        user.setPassword(PasswordUtils.hashPassword(newPassword));
        userRepository.save(user);
    }


}
