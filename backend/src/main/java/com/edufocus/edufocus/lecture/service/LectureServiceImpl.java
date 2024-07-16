package com.edufocus.edufocus.lecture.service;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.repository.LectureRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LectureServiceImpl implements LectureService {

    @Autowired
    private final LectureRepository lectureRepository;

    @Override
    public void createLecture(Lecture lecture) {
        lectureRepository.save(lecture);
    }

    @Override
    public void deleteLecture(long lectureId) {
        lectureRepository.deleteById(lectureId);
    }

    @Override
    public Lecture findLectureByTitle(String title) {
        return lectureRepository.findByTitle(title);
    }

    @Override
    public List<Lecture> findLectureByTeacherId(String teacherId) {
        return lectureRepository.findByTeacherId(teacherId);
    }

    @Override
    public List<Lecture> findAllLecture() {
        return lectureRepository.findAll();
    }
}
