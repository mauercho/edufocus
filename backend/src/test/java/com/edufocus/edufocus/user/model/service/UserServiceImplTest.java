package com.edufocus.edufocus.user.model.service;

import static org.junit.jupiter.api.Assertions.*;


import com.edufocus.edufocus.user.model.entity.*;
import com.edufocus.edufocus.user.model.exception.UserException;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JavaMailSender mailSender;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testJoin() {
        User user = new User();
        user.setId(1L);
        user.setName("John Doe");

        userService.join(user);

        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testLoginSuccess() throws Exception {
        User user = new User();
        user.setUserId("john");
        user.setPassword("password");

        User returnedUser = new User();
        returnedUser.setUserId("john");
        returnedUser.setPassword("password");

        when(userRepository.findByUserId(user.getUserId())).thenReturn(Optional.of(returnedUser));

        User result = userService.login(user);

        assertNotNull(result);
        assertEquals("john", result.getUserId());
        assertEquals("password", result.getPassword());
    }

    @Test
    void testLoginUserNotFound() {
        User user = new User();
        user.setUserId("john");
        user.setPassword("password");

        when(userRepository.findByUserId(user.getUserId())).thenReturn(Optional.empty());

        UserException exception = assertThrows(UserException.class, () -> userService.login(user));

        assertEquals("없는 유저", exception.getMessage());
    }

    @Test
    void testLoginIncorrectPassword() {
        User user = new User();
        user.setUserId("john");
        user.setPassword("password");

        User returnedUser = new User();
        returnedUser.setUserId("john");
        returnedUser.setPassword("wrongPassword");

        when(userRepository.findByUserId(user.getUserId())).thenReturn(Optional.of(returnedUser));

        UserException exception = assertThrows(UserException.class, () -> userService.login(user));

        assertEquals("비밀번호 틀림", exception.getMessage());
    }

    @Test
    void testUserInfo() {
        User user = new User();
        user.setId(1L);
        user.setName("John Doe");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.userInfo(1L);

        assertNotNull(result);
        assertEquals("John Doe", result.getName());
    }

    @Test
    void testSendEmail() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");
        user.setUserId("testUser");
        user.setName("Test User");

        MailDto mailDto = new MailDto();
        mailDto.setAddress("test@example.com");
        mailDto.setTitle("Test Title");
        mailDto.setMessage("Test Message");

        doNothing().when(mailSender).send(any(SimpleMailMessage.class));
        doReturn(mailDto).when(userService).createMailAndChargePassword(user);

        userService.sendEamail(user);

        verify(mailSender, times(1)).send(any(SimpleMailMessage.class));
    }

    @Test
    void testUserCheck() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setUserId("testUser");
        user.setEmail("test@example.com");
        user.setName("Test User");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        userService.userCheck(1L);

        verify(userRepository, times(1)).findById(1L);
        verify(userService, times(1)).sendEamail(user);
    }

    @Test
    void testUserCheckInvalidId() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.userCheck(1L));

        assertEquals("유효하지 않은 아이디입니다. 다시 입력하세요", exception.getMessage());
    }

    @Test
    void testChangeUserInfo() throws Exception {
        Long userId = 1L;
        InfoDto infoDto = new InfoDto();
        infoDto.setName("New Name");
        infoDto.setEmail("new.email@example.com");

        User user = new User();
        user.setId(userId);
        user.setName("Old Name");
        user.setEmail("old.email@example.com");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        userService.changeuInfo(infoDto, userId);

        assertEquals("New Name", user.getName());
        assertEquals("new.email@example.com", user.getEmail());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testChangeUserInfoUserNotFound() {
        Long userId = 1L;
        InfoDto infoDto = new InfoDto();
        infoDto.setName("New Name");
        infoDto.setEmail("new.email@example.com");

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> userService.changeuInfo(infoDto, userId));

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void testChangePasswordSuccess() throws Exception {
        Long userId = 1L;
        PasswordDto passwordDto = new PasswordDto();
        passwordDto.setCurrentPassword("oldPassword");
        passwordDto.setNewPassword("newPassword");
        passwordDto.setNewPasswordCheck("newPassword");

        User user = new User();
        user.setId(userId);
        user.setPassword("oldPassword");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        userService.changePassword(passwordDto, userId);

        assertEquals("newPassword", user.getPassword());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testChangePasswordUserNotFound() {
        Long userId = 1L;
        PasswordDto passwordDto = new PasswordDto();
        passwordDto.setCurrentPassword("oldPassword");
        passwordDto.setNewPassword("newPassword");
        passwordDto.setNewPasswordCheck("newPassword");

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> userService.changePassword(passwordDto, userId));

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void testChangePasswordIncorrectCurrentPassword() {
        Long userId = 1L;
        PasswordDto passwordDto = new PasswordDto();
        passwordDto.setCurrentPassword("wrongPassword");
        passwordDto.setNewPassword("newPassword");
        passwordDto.setNewPasswordCheck("newPassword");

        User user = new User();
        user.setId(userId);
        user.setPassword("oldPassword");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        Exception exception = assertThrows(Exception.class, () -> userService.changePassword(passwordDto, userId));

        assertEquals("Current password is incorrect", exception.getMessage());
    }

    @Test
    void testChangePasswordNewPasswordMismatch() {
        Long userId = 1L;
        PasswordDto passwordDto = new PasswordDto();
        passwordDto.setCurrentPassword("oldPassword");
        passwordDto.setNewPassword("newPassword");
        passwordDto.setNewPasswordCheck("differentNewPassword");

        User user = new User();
        user.setId(userId);
        user.setPassword("oldPassword");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        Exception exception = assertThrows(Exception.class, () -> userService.changePassword(passwordDto, userId));

        assertEquals("New password confirmation does not match", exception.getMessage());
    }

    @Test
    void testSaveRefreshToken() throws Exception {
        Long userId = 1L;
        String refreshToken = "refresh-token";

        doNothing().when(userRepository).saveRefreshToken(userId, refreshToken);

        userService.saveRefreshToken(userId, refreshToken);

        verify(userRepository, times(1)).saveRefreshToken(userId, refreshToken);
    }

    @Test
    void testGetRefreshToken() throws Exception {
        Long userId = 1L;
        String refreshToken = "refresh-token";

        when(userRepository.getRefreshToken(userId)).thenReturn(refreshToken);

        String result = userService.getRefreshToken(userId);

        assertEquals(refreshToken, result);
    }

//    @Test
//    void testDeleteRefreshToken() throws Exception {
//        Long userId = 1L;
//
//        doNothing().when(userRepository).delete
//    }
}