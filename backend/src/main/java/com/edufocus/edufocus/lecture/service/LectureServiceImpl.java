package com.edufocus.edufocus.lecture.service;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.entity.LectureCreateRequest;
import com.edufocus.edufocus.lecture.entity.LectureSearchResponse;
import com.edufocus.edufocus.lecture.entity.LectureDetailResponse;
import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.registration.entity.Registration;
import com.edufocus.edufocus.registration.repository.RegistrationRepository;
import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.entity.UserRole;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Builder
@Service
@Transactional
@RequiredArgsConstructor
public class LectureServiceImpl implements LectureService {

    private final LectureRepository lectureRepository;

    private final UserRepository userRepository;

    private final RegistrationRepository registrationRepository;

    @Override
    public void createLecture(long userId, LectureCreateRequest lectureCreateRequest) {
        User user = userRepository.findById(userId).get();

        Lecture lecture = new Lecture().builder()
                .user(user)
                .title(lectureCreateRequest.getTitle())
                .description(lectureCreateRequest.getDescription())
                .image(lectureCreateRequest.getImage())
                .startDate(lectureCreateRequest.getStartDate())
                .endDate(lectureCreateRequest.getEndDate())
                .plan(lectureCreateRequest.getPlan())
                .build();

        lectureRepository.save(lecture);
    }

    @Override
    public boolean updateLecture(long userId, long lectureId, LectureCreateRequest lectureCreateRequest) {
        User user = userRepository.findById(userId).get();

        Lecture lecture = lectureRepository.findById(lectureId).get();

        if (lecture.getUser().getId() != user.getId()) {
            return false;
        }

        if (lectureCreateRequest.getTitle() != null) {
            lecture.setTitle(lectureCreateRequest.getTitle());
        }
        if (lectureCreateRequest.getDescription() != null) {
            lecture.setDescription(lectureCreateRequest.getDescription());
        }
        if (lectureCreateRequest.getImage() != null) {
            lecture.setImage(lectureCreateRequest.getImage());
        }
        if (lectureCreateRequest.getStartDate() != null) {
            lecture.setStartDate(lectureCreateRequest.getStartDate());
        }
        if (lectureCreateRequest.getEndDate() != null) {
            lecture.setEndDate(lectureCreateRequest.getEndDate());
        }
        if (lectureCreateRequest.getPlan() != null) {
            lecture.setPlan(lectureCreateRequest.getPlan());
        }

        lectureRepository.save(lecture);
        return true;
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
    public List<LectureSearchResponse> findAllLecture() {
        List<Lecture> lectureList = lectureRepository.findAll();

        List<LectureSearchResponse> lectureSearchResponseList = new ArrayList<>();
        for (Lecture lecture : lectureList) {
            LectureSearchResponse lectureSearchResponse = LectureSearchResponse.builder()
                    .id(lecture.getId())
                    .title(lecture.getTitle())
                    .image(lecture.getImage()).build();

            lectureSearchResponseList.add(lectureSearchResponse);
        }

        return lectureSearchResponseList;
    }

    @Override
    public LectureDetailResponse findLectureById(long lectureId) {

        Lecture lecture = lectureRepository.findById(lectureId).get();

        if (lecture == null) {
            return null;
        }

        LectureDetailResponse lectureDetailResponse = new LectureDetailResponse().builder()
                .id(lecture.getId())
                .title(lecture.getTitle())
                .description(lecture.getDescription())
                .image(lecture.getImage())
                .startDate(lecture.getStartDate())
                .endDate(lecture.getEndDate())
                .plan(lecture.getPlan())
                .online(lecture.isOnline())
                .teacherName(lecture.getUser().getName())
                .build();

        return lectureDetailResponse;
    }

    public List<LectureSearchResponse> findMyLecture(long userId) {
        User user = userRepository.findById(userId).get();

        List<LectureSearchResponse> myLectureList = new ArrayList<>();

        if (user.getRole() == UserRole.ADMIN) {
            List<Lecture> lectureList = lectureRepository.findLecturesByUserId(userId);
            for (Lecture lecture : lectureList) {
                LectureSearchResponse lectureSearchResponse = new LectureSearchResponse().builder()
                        .id(lecture.getId())
                        .title(lecture.getTitle())
                        .image(lecture.getImage()).build();

                myLectureList.add(lectureSearchResponse);
            }
        } else {
            List<Registration> registrationList = registrationRepository.findAllByUserId(userId);

            for (Registration registration : registrationList) {
                Lecture lecture = registration.getLecture();

                LectureSearchResponse lectureSearchResponse = new LectureSearchResponse().builder()
                        .id(lecture.getId())
                        .title(lecture.getTitle())
                        .image(lecture.getImage()).build();

                myLectureList.add(lectureSearchResponse);
            }
        }

        return myLectureList;
    }

}
