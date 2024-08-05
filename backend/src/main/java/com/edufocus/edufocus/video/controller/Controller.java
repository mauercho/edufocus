package com.edufocus.edufocus.video.controller;

import java.util.Map;
import java.util.Random;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.lecture.service.LectureService;
import com.edufocus.edufocus.registration.service.RegistrationService;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.user.model.entity.vo.UserRole;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import com.edufocus.edufocus.user.model.service.UserService;
import com.edufocus.edufocus.user.util.JWTUtil;
import com.edufocus.edufocus.video.dto.IdentityData;
import com.edufocus.edufocus.video.service.VideoSertvice;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.livekit.server.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import livekit.LivekitWebhook.WebhookEvent;


@RestController
@RequestMapping("/video")
@Slf4j
@RequiredArgsConstructor

public class Controller {
    private final JWTUtil jwtUtil;
    private final UserService userService;
    private final LectureService lectureService;
    private final VideoSertvice videoSertvice;
    private final RegistrationService registrationService;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;

    @Value("${livekit.api.key}")
    private String LIVEKIT_API_KEY;

    @Value("${livekit.api.secret}")
    private String LIVEKIT_API_SECRET;
    private static final ObjectMapper objectMapper = new ObjectMapper();


    public static String serializeIdentityData(IdentityData identityData) throws JsonProcessingException, JsonProcessingException {
        return objectMapper.writeValueAsString(identityData);
    }

    @PostMapping(value = "/joinroom/{lecture_id}")
    public ResponseEntity<Map<String, String>> joinRoom(@PathVariable("lecture_id") Long id, HttpServletRequest request) throws Exception {


        String userToken = request.getHeader("Authorization");


        Long userId = Long.parseLong(jwtUtil.getUserId(userToken));
        User findUser = userRepository.findById(userId).orElse(null);
        Lecture lecture = lectureRepository.findById(id).orElse(null);


        String roomName = lecture.getTitle();
        String participantName = userService.getUserName(userId);
        System.out.println(participantName);

        AccessToken token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET);


        if (findUser.getRole() == UserRole.STUDENT) {

            if (videoSertvice.isRoomAccessible(id, userId)) {
                IdentityData identityData = new IdentityData(participantName, "학생");
                String jsonIdentity = serializeIdentityData(identityData);


                token.setIdentity(jsonIdentity);
                token.setName(participantName);

                token.addGrants(new RoomJoin(true), new RoomName(roomName));


                return ResponseEntity.ok(Map.of("token", token.toJwt()));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "방에 들어갈 수 없습니다."));
            }


        } else if (findUser.getRole() == UserRole.ADMIN) {//&& lecture.isOnline() ) {

            // 자신의 강의인지 확인하기
            if (videoSertvice.checkAdmin(userId, id)) {
                IdentityData identityData = new IdentityData(participantName, "강사");
                String jsonIdentity = serializeIdentityData(identityData);


                token.setIdentity(jsonIdentity);
                token.setName(participantName);

                token.addGrants(new RoomJoin(true), new RoomName(roomName), new RoomCreate(true));


                return ResponseEntity.ok(Map.of("token", token.toJwt()));
            }


        }

        return ResponseEntity.ok(Map.of("token", null));

    }


    @PostMapping(value = "/makeroom/{lecture_id}")
    public ResponseEntity<Map<String, String>> makeRoom(@PathVariable("lecture_id") Long id, HttpServletRequest request) throws Exception {
        String userToken = request.getHeader("Authorization");
        Long userId = Long.parseLong(jwtUtil.getUserId(userToken));

        User findUser = userRepository.findById(userId).orElse(null);
        if (findUser.getRole() == UserRole.ADMIN) {


            videoSertvice.startOnline(userId, id);


        }

        return ResponseEntity.ok(Map.of("token", " "));

    }

    @PostMapping(value = "/livekit/webhook", consumes = "application/webhook+json")
    public ResponseEntity<String> receiveWebhook(@RequestHeader("Authorization") String authHeader, @RequestBody String body) {
        WebhookReceiver webhookReceiver = new WebhookReceiver(LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
        try {
            WebhookEvent event = webhookReceiver.receive(body, authHeader);
            System.out.println("LiveKit Webhook: " + event.toString());
        } catch (Exception e) {
            System.err.println("Error validating webhook event: " + e.getMessage());
        }


        return ResponseEntity.ok("ok");
    }


}
