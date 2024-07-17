package com.edufocus.edufocus.lecture.controller;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.entity.LectureRegist;
import com.edufocus.edufocus.lecture.service.LectureService;
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

    @PostMapping
    public ResponseEntity<?> createLecture (@RequestBody long userId, @RequestBody LectureRegist lectureRegist) {
        lectureService.createLecture(userId, lectureRegist);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{lectureId}")
    public ResponseEntity<?> deleteLecture (@RequestBody long userId, @PathVariable long lectureId) {
        if (!lectureService.deleteLecture(userId, lectureId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<?> findAllLecture () {
        List<Lecture> lectures = lectureService.findAllLecture();

        if (lectures.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lectures, HttpStatus.OK);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<?> findByTitle (@PathVariable String title) {
        Lecture lecture = lectureService.findLectureByTitle(title);

        if (lecture == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lecture, HttpStatus.OK);
    }



}
