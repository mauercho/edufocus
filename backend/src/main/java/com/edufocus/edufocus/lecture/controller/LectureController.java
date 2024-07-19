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

        lectureService.createLecture(userId, lectureCreateRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{lectureId}")
    public ResponseEntity<?> updateLecture(@RequestHeader("Authorization") String accessToken, @PathVariable Long lectureId, @RequestBody LectureCreateRequest lectureCreateRequest) {
        Long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        if (!lectureService.updateLecture(userId, lectureId, lectureCreateRequest)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/{lectureId}")
    public ResponseEntity<?> deleteLecture(@RequestBody long userId, @PathVariable long lectureId) {
        if (!lectureService.deleteLecture(userId, lectureId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<?> findAllLecture() {
        List<LectureSearchResponse> lectures = lectureService.findAllLecture();

        if (lectures.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lectures, HttpStatus.OK);
    }

    @GetMapping("/{lectureId}")
    public ResponseEntity<?> findById(@PathVariable long lectureId) {
        LectureDetailResponse lectureDetailResponse = lectureService.findLectureById(lectureId);

        if (lectureDetailResponse == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lectureDetailResponse, HttpStatus.OK);
    }

    @GetMapping("/mylecture")
    public ResponseEntity<?> findMyLecture(@RequestHeader("Authorization") String accessToken) {
        Long userId = Long.parseLong(jwtUtil.getUserId(accessToken));

        List<LectureSearchResponse> myLectures = lectureService.findMyLecture(userId);

        if (myLectures.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(myLectures, HttpStatus.OK);
    }
}
