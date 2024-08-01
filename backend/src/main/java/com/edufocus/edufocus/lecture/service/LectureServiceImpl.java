package com.edufocus.edufocus.lecture.service;

import com.edufocus.edufocus.global.properties.ImagePathProperties;
import com.edufocus.edufocus.lecture.entity.*;
import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.registration.entity.Registration;
import com.edufocus.edufocus.registration.entity.RegistrationStatus;
import com.edufocus.edufocus.registration.repository.RegistrationRepository;
import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.entity.UserRole;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LectureServiceImpl implements LectureService {

    private final ImagePathProperties imagePathProperties;

    private final LectureRepository lectureRepository;

    private final UserRepository userRepository;

    private final RegistrationRepository registrationRepository;

    @Override
    public void createLecture(long userId, LectureCreateRequest lectureCreateRequest, MultipartFile image) throws IOException {
        User user = userRepository.findById(userId).orElse(null);

        Lecture lecture = Lecture.builder()
                .user(user)
                .title(lectureCreateRequest.getTitle())
                .description(lectureCreateRequest.getDescription())
                .plan(lectureCreateRequest.getPlan())
                .startDate(lectureCreateRequest.getStartDate())
                .endDate(lectureCreateRequest.getEndDate())
                .time(lectureCreateRequest.getTime())
                .build();

        if (image != null) {
            String uid = UUID.randomUUID().toString();

            String imagePath = imagePathProperties.getPath();

            File checkPathFile = new File(imagePath);
            if (!checkPathFile.exists()) {
                checkPathFile.mkdirs();
            }

            File savingImage = new File(imagePath + "/" + uid + "_" + image.getOriginalFilename());
            image.transferTo(savingImage.toPath());
            String savePath = savingImage.toPath().toString();

            lecture.setImage(savePath);
        }

        lectureRepository.save(lecture);
    }

    @Override
    public boolean updateLecture(long userId, long lectureId, LectureCreateRequest lectureCreateRequest) {
        Optional<Lecture> findLecture = lectureRepository.findById(lectureId);

        if (findLecture.isEmpty() || findLecture.get().getUser().getId() != userId) {
            return false;
        }

        Lecture lecture = findLecture.get();

        if (lectureCreateRequest.getTitle() != null) {
            lecture.setTitle(lectureCreateRequest.getTitle());
        }
        if (lectureCreateRequest.getDescription() != null) {
            lecture.setDescription(lectureCreateRequest.getDescription());
        }
        if (lectureCreateRequest.getPlan() != null) {
            lecture.setPlan(lectureCreateRequest.getPlan());
        }
        if (lectureCreateRequest.getStartDate() != null) {
            lecture.setStartDate(lectureCreateRequest.getStartDate());
        }
        if (lectureCreateRequest.getEndDate() != null) {
            lecture.setEndDate(lectureCreateRequest.getEndDate());
        }
        if (lectureCreateRequest.getTime() != null) {
            lecture.setTime(lectureCreateRequest.getTime());
        }

        lectureRepository.save(lecture);
        return true;
    }

    @Override
    public boolean deleteLecture(long userId, long lectureId) {
        Optional<Lecture> findLecture = lectureRepository.findById(lectureId);

        if (findLecture.isEmpty()) {
            return false;
        }
        Lecture lecture = findLecture.get();

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
    public String getUserStatus(Long userId, Lecture lecture) {
        if (userId == null) {
            return String.valueOf(UserStatus.NOT_ENROLLED);
        }

        User user = userRepository.findById(userId).orElseThrow(NoSuchElementException::new);
        UserRole userRole = user.getRole();

        if (userRole == UserRole.ADMIN) {
            if (lecture.getUser() == user) {
                return String.valueOf(UserStatus.MANAGED_BY_ME);
            }
            return String.valueOf(UserStatus.MANAGED_BY_OTHERS);
        }

        Registration registration = registrationRepository.findByUserIdAndLectureId(userId, lecture.getId());

        if (registration == null) {
            return String.valueOf(UserStatus.NOT_ENROLLED);
        }

        if (registration.getStatus() == RegistrationStatus.ACCEPTED) {
            return String.valueOf(UserStatus.ENROLLED);
        }

        return String.valueOf(UserStatus.PENDING);
    }

    @Override
    public LectureDetailResponse findLectureById(Long userId, long lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(NoSuchElementException::new);

        String userStatus = getUserStatus(userId, lecture);

        return LectureDetailResponse.builder()
                .id(lecture.getId())
                .title(lecture.getTitle())
                .description(lecture.getDescription())
                .plan(lecture.getPlan())
                .image(lecture.getImage())
                .startDate(lecture.getStartDate())
                .endDate(lecture.getEndDate())
                .time(lecture.getTime())
                .online(lecture.isOnline())
                .teacherName(lecture.getUser().getName())
                .status(userStatus)
                .build();

    }

    public List<LectureSearchResponse> findMyLecture(long userId) {
        User user = userRepository.findById(userId).orElseThrow(NoSuchElementException::new);

        List<LectureSearchResponse> myLectureList = new ArrayList<>();

        if (user.getRole() == UserRole.ADMIN) {
            List<Lecture> lectureList = lectureRepository.findLecturesByUserId(userId);
            for (Lecture lecture : lectureList) {
                LectureSearchResponse lectureSearchResponse = LectureSearchResponse.builder()
                        .id(lecture.getId())
                        .title(lecture.getTitle())
                        .image(lecture.getImage()).build();

                myLectureList.add(lectureSearchResponse);
            }
        } else {
            List<Registration> registrationList = registrationRepository.findAllByUserId(userId);

            for (Registration registration : registrationList) {
                Lecture lecture = registration.getLecture();

                LectureSearchResponse lectureSearchResponse = LectureSearchResponse.builder()
                        .id(lecture.getId())
                        .title(lecture.getTitle())
                        .image(lecture.getImage()).build();

                myLectureList.add(lectureSearchResponse);
            }
        }

        return myLectureList;
    }

    @Override
    public Lecture findLectureByTitle(String title) {
        return lectureRepository.findByTitle(title);
    }

    @Override
    public void changeState(Long id) {

        Optional<Lecture> lecture = lectureRepository.findById(id);

        Lecture l;
        if (lecture.isPresent()) {
            l = lecture.get();

            System.out.println(l.isOnline());
            l.setOnline(true);
            System.out.println(l.isOnline());


        } else {

            throw new RuntimeException("Lecture not found with id: " + id);
        }
        lectureRepository.save(l);
    }

    @Override
    public boolean getState(Long lectureId) {

        Lecture lecture = lectureRepository.findById(lectureId).orElse(null);
        return lecture.isOnline();

    }

    @Override
    public boolean checkTeacher(Long userId, Long lectureId) {
        Optional<Lecture> lecture = lectureRepository.findById(lectureId);

        return lecture.isPresent() && lecture.get().getUser().getId() == userId;
    }

}
