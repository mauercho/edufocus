package com.edufocus.edufocus.video.service;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.entity.LectureDetailResponse;
import com.edufocus.edufocus.lecture.service.LectureService;
import com.edufocus.edufocus.registration.entity.RegistrationStatus;
import com.edufocus.edufocus.registration.service.RegistrationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
@Service
@Transactional
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoSertvice{

   private final LectureService lectureService;
   private final RegistrationService registrationService;
    @Override
    public void startOnline(Long userId,Long lectureId) throws SQLException {

        lectureService.changeState(lectureId);
    }

    @Override
    public boolean isRoomAccessible(Long lectureId, Long userId) {



		LectureDetailResponse lecture= lectureService.findLectureById(userId,userId);


		RegistrationStatus registrationStatus = registrationService.getStatus(userId,lectureId);


		if(registrationStatus==RegistrationStatus.ACCEPTED && lecture.isOnline())
		{
            return true;
        }
        else
        {
            return false;
        }
    }
}
