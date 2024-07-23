package com.edufocus.edufocus.registration.controller;

import com.edufocus.edufocus.registration.service.RegistrationService;
import com.edufocus.edufocus.user.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/registration")
@Slf4j
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationServiceImpl;

    private final JWTUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> register(@RequestHeader("Authorization") String accessToken, @RequestBody Map<String, Long> map) {
        Long userId = Long.parseLong(jwtUtil.getUserId(accessToken));
        Long lectureId = map.get("lectureId");

        if (!registrationServiceImpl.createRegistration(userId, lectureId)) {
            String msg = new String("Duplicated Registration");
            return new ResponseEntity<>(msg, HttpStatus.CONFLICT);
        }

        String msg = new String("registration successful");
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{registrationId}")
    public ResponseEntity<?> acceptRigistration(@RequestHeader("Authorization") String accessToken, @PathVariable long registrationId) {
        Long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        if (!registrationServiceImpl.acceptRegistration(userId, registrationId)) {
            String msg = new String("Not Acceptable");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String msg = new String("registration accepted");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{registrationId}")
    public ResponseEntity<?> deleteRigistration(@RequestHeader("Authorization") String accessToken, @PathVariable long registrationId) {
        Long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        if (!registrationServiceImpl.deleteRegistration(userId, registrationId)) {
            String msg = new String("Not Acceptable");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
