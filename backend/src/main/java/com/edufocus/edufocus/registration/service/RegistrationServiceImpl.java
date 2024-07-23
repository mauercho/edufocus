package com.edufocus.edufocus.registration.service;

import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.registration.entity.Registration;
import com.edufocus.edufocus.registration.entity.RegistrationStatus;
import com.edufocus.edufocus.registration.repository.RegistrationRepository;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;

    @Override
    public boolean createRegistration(long userId, long lectureId) {
        if (registrationRepository.findByUserIdAndLectureId(userId, lectureId) != null) {
            return false;
        }

        Registration registration = new Registration().builder()
                .user(userRepository.getReferenceById(userId))
                .lecture(lectureRepository.getReferenceById(lectureId))
                .status(RegistrationStatus.WAITING)
                .build();

        registrationRepository.save(registration);
        return true;
    }

    @Override
    public boolean acceptRegistration(long userId, long registrationId) {
        Registration registration = registrationRepository.findById(registrationId).get();

        if (registration.getLecture().getUser().getId() != userId) {
            return false;
        }

        registration.setStatus(RegistrationStatus.valueOf("ACCEPTED"));
        registrationRepository.save(registration);

        return true;
    }

    @Override
    public boolean deleteRegistration(long userId, long registrationId) {
        Registration registration = registrationRepository.findById(registrationId).get();

        if (registration.getLecture().getUser().getId() != userId) {
            return false;
        }

        registrationRepository.deleteById(registrationId);
        return true;
    }

}
