package com.edufocus.edufocus.lecture.controller;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.entity.LectureCreateRequest;
import com.edufocus.edufocus.lecture.entity.LectureSearchResponse;
import com.edufocus.edufocus.lecture.entity.LectureDetailResponse;
import com.edufocus.edufocus.lecture.service.LectureService;
import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.service.UserService;
import com.edufocus.edufocus.user.model.service.UserServiceImpl;
import com.edufocus.edufocus.user.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lecture")
@Slf4j
@RequiredArgsConstructor
public class LectureController {

    private final LectureService lectureService;
    private final JWTUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createLecture(@RequestHeader("Authorization") String accessToken, @RequestBody LectureCreateRequest lectureCreateRequest) {
        Long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        Lecture lecture = lectureService.findLectureByTitle(lectureCreateRequest.getTitle());
        if (lecture != null) {
            String msg = new String("Duplicated Lecture");
            return new ResponseEntity<>(msg, HttpStatus.CONFLICT);
        }

        lectureService.createLecture(userId, lectureCreateRequest);
        String msg = new String("Lecture registered successfully");
        return new ResponseEntity<>(msg, HttpStatus.CREATED);
    }

    @PutMapping("/{lectureId}")
    public ResponseEntity<?> updateLecture(@RequestHeader("Authorization") String accessToken, @PathVariable Long lectureId, @RequestBody LectureCreateRequest lectureCreateRequest) {
        Long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        if (!lectureService.updateLecture(userId, lectureId, lectureCreateRequest)) {
            String msg = new String("Can't update Lecture");
            return new ResponseEntity<>(msg, HttpStatus.UNAUTHORIZED);
        }
        String msg = new String("Lecture updated successfully");
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }


    @DeleteMapping("/{lectureId}")
    public ResponseEntity<?> deleteLecture(@RequestHeader("Authorization") String accessToken, @PathVariable long lectureId) {
        Long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        if (!lectureService.deleteLecture(userId, lectureId)) {
            String msg = new String("Can't delete Lecture");
            return new ResponseEntity<>(msg, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<?> findAllLecture() {
        List<LectureSearchResponse> lectures = lectureService.findAllLecture();

        if (lectures.isEmpty()) {
            String msg = new String("No lectures found");
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }

        return new ResponseEntity<>(lectures, HttpStatus.OK);
    }

    @GetMapping("/{lectureId}")
    public ResponseEntity<?> findById(@RequestHeader(value = "Authorization", required = false) String accessToken, @PathVariable long lectureId) {
        Long userId = null;

        if (accessToken != null) {
            userId = Long.parseLong(jwtUtil.getUserId(accessToken));
        }

        LectureDetailResponse lectureDetailResponse = lectureService.findLectureById(userId, lectureId);

        if (lectureDetailResponse == null) {
            String msg = new String("Can't find Lecture");
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }


        return new ResponseEntity<>(lectureDetailResponse, HttpStatus.OK);
    }

    @GetMapping("/mylecture")
    public ResponseEntity<?> findMyLecture(@RequestHeader(value = "Authorization", required = false) String accessToken) {
        if (accessToken == null) {
            String msg = new String("Not logged in");
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }

        Long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        List<LectureSearchResponse> myLectures = lectureService.findMyLecture(userId);

        if (myLectures.isEmpty()) {
            String msg = new String("No lectures found");
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }

        return new ResponseEntity<>(myLectures, HttpStatus.OK);
    }
}
