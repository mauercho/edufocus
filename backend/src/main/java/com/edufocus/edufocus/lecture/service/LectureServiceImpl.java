package com.edufocus.edufocus.lecture.service;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.entity.LectureRegist;
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
    public void createLecture(long userId, LectureRegist lectureRegist) {

        User user = userRepository.findById(userId).get();

        Lecture lecture = new Lecture();
        lecture.setUser(user);

        lecture.setTitle(lectureRegist.getTitle());
        lecture.setDescription(lectureRegist.getDescription());
        lecture.setStartDate(lectureRegist.getStartDate());
        lecture.setEndDate(lectureRegist.getEndDate());
        lecture.setPlan(lectureRegist.getPlan());

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
