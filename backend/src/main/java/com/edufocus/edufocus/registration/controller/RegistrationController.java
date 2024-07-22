package com.edufocus.edufocus.registration.controller;

import com.edufocus.edufocus.registration.entity.Registration;
import com.edufocus.edufocus.registration.service.RegistrationService;
import com.edufocus.edufocus.user.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration")
@Slf4j
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationServiceImpl;

    private final JWTUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> register(@RequestHeader("Authorization") String accessToken, @RequestBody long lectureId) {
        Long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        registrationServiceImpl.createRegistration(userId, lectureId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{registrationId}")
    public ResponseEntity<?> acceptRigistration(@PathVariable long registrationId) {
        registrationServiceImpl.acceptRegistration(registrationId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{registrationId}")
    public ResponseEntity<?> deleteRigistration(@PathVariable long registrationId) {
        registrationServiceImpl.deleteRegistration(registrationId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
