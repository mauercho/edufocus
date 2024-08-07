package com.edufocus.edufocus.mail.controller;

import com.edufocus.edufocus.mail.service.MailService;
import com.edufocus.edufocus.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    private final UserService userService;

    @PostMapping("/sendcode")
    public ResponseEntity<?> sendMail(@RequestParam String email) {
        if (!userService.isEmailExist(email)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        mailService.sendMail(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestParam String code, @RequestParam String email) {
        if (!mailService.verifyCode(code, email)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
