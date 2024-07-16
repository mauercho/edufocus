package com.edufocus.edufocus.lecture.service;

import com.edufocus.edufocus.lecture.entity.Lecture;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface LectureService {

    void createLecture(Lecture lecture);

    void deleteLecture(long lectureId);

    Lecture findLectureByTitle(String title);

    List<Lecture> findLectureByTeacherId(String teacherId);

    List<Lecture> findAllLecture();
}
