package com.edufocus.edufocus.video.service;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.entity.LectureDetailResponse;
import com.edufocus.edufocus.lecture.entity.LectureSearchResponse;
import com.edufocus.edufocus.lecture.service.LectureService;
import com.edufocus.edufocus.registration.entity.RegistrationStatus;
import com.edufocus.edufocus.registration.service.RegistrationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoSertvice {

    private final LectureService lectureService;
    private final RegistrationService registrationService;

    @Override
    public void startOnline(Long userId, Long lectureId) throws SQLException {

        lectureService.startClass(lectureId);
    }

    @Override
    public void stopOnline(Long userId, Long lectureId) throws SQLException {
        lectureService.startClass(lectureId);
    }

    @Override
    public boolean isRoomAccessible(Long lectureId, Long userId) {


        LectureDetailResponse lecture = lectureService.findLectureById(userId, lectureId);


        RegistrationStatus registrationStatus = registrationService.getStatus(userId, lectureId);


        if (registrationStatus == RegistrationStatus.ACCEPTED && lecture.isOnline()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean checkAdmin(Long userId, Long lectureId) {
        // 강의가 내 강의인지 확인
        List<LectureSearchResponse> lecture = lectureService.findMyLecture(userId);

        for (LectureSearchResponse l : lecture) {
            if (l.getId() == lectureId) {
                return true;
            }
        }
        return false;
    }
}
