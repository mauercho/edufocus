package com.edufocus.edufocus.lecture.service;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.entity.LectureCreateRequest;
import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LectureServiceImpl implements LectureService {

    private final LectureRepository lectureRepository;

    private final UserRepository userRepository;

    @Override
    public void createLecture(long userId, LectureCreateRequest lectureCreateRequest) {

        User user = userRepository.findById(userId).get();

        Lecture lecture = new Lecture();
        lecture.setUser(user);

        lecture.setTitle(lectureCreateRequest.getTitle());
        lecture.setDescription(lectureCreateRequest.getDescription());
        lecture.setStartDate(lectureCreateRequest.getStartDate());
        lecture.setEndDate(lectureCreateRequest.getEndDate());
        lecture.setPlan(lectureCreateRequest.getPlan());

        lectureRepository.save(lecture);
    }

    @Override
    public boolean deleteLecture(long userId, long lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).get();

        if (lecture.getUser().getId() != userId) {
            return false;
        }

        lectureRepository.deleteById(lectureId);
        return true;
    }

    @Override
    public List<Lecture> findAllLecture() {
        return lectureRepository.findAll();
    }

    @Override
    public Lecture findLectureByTitle(String title) {
        return lectureRepository.findByTitle(title);
    }


}
