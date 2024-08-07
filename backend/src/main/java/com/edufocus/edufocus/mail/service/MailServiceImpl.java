package com.edufocus.edufocus.mail.service;

import com.edufocus.edufocus.redis.util.RedisUtil;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import com.edufocus.edufocus.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Random;

@Service
@Slf4j
@ToString
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;

    private final UserRepository userRepository;

    private final UserService userService;

    private final RedisUtil redisUtil;

    @Override
    public void sendMail(String email) {
        String code = createRandomCode();
        redisUtil.setDataExpire(code, email, 60 * 5L);

        SimpleMailMessage mail = createEmail(email, "[EDUFOCUS] 비밀번호 찾기 안내", code);
        mailSender.send(mail);
    }

    @Override
    public boolean verifyCode(String code, String email) {
        String registedEmail = redisUtil.getData(code);

        return registedEmail != null && registedEmail.equals(email);
    }

    private SimpleMailMessage createEmail(String to, String title, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(title);
        message.setText("인증번호 6자리입니다 : " + code);

        return message;
    }

    @Override
    public String createRandomCode() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 3; i++) {
            sb.append((char) (random.nextInt(26) + 65));
        }
        for (int i = 0; i < 3; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }

}
