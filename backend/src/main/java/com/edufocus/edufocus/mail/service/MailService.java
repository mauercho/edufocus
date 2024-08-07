package com.edufocus.edufocus.mail.service;

import org.springframework.stereotype.Service;

@Service
public interface MailService {

    void sendMail(String to);

    String createRandomCode();

    boolean verifyCode(String code, String email);
}
