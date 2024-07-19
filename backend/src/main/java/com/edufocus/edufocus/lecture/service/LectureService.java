package com.edufocus.edufocus.lecture.service;

import com.edufocus.edufocus.lecture.entity.LectureCreateRequest;
import com.edufocus.edufocus.lecture.entity.LectureSearchResponse;
import com.edufocus.edufocus.lecture.entity.LectureDetailResponse;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface LectureService {

    void createLecture(long userId, LectureCreateRequest lectureCreateRequest);

    boolean updateLecture(long userId, long lectureId, LectureCreateRequest lectureCreateRequest);

    boolean deleteLecture(long userId, long LectureId);

    List<LectureSearchResponse> findAllLecture();

    LectureDetailResponse findLectureById(long lectureId);

    List<LectureSearchResponse> findMyLecture(long userId);

}
