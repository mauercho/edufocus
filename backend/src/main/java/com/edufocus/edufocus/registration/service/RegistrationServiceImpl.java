package com.edufocus.edufocus.registration.service;

import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.registration.entity.Registration;
import com.edufocus.edufocus.registration.entity.RegistrationSearchResponse;
import com.edufocus.edufocus.registration.entity.RegistrationStatus;
import com.edufocus.edufocus.registration.repository.RegistrationRepository;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.user.model.entity.vo.UserRole;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;

    @Override
    public boolean createRegistration(Long userId, Long lectureId) {
        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty() || user.get().getRole().equals(UserRole.ADMIN)) {
            return false;
        }

        if (registrationRepository.findByUserIdAndLectureId(userId, lectureId) != null) {
            return false;
        }

        Registration registration = Registration.builder()
                .user(userRepository.findById(userId).get())
                .lecture(lectureRepository.findById(lectureId).get())
                .status(RegistrationStatus.WAITING)
                .build();

        registrationRepository.save(registration);
        return true;
    }

    @Override
    public boolean acceptRegistration(Long userId, Long registrationId) {
        Optional<Registration> registration = registrationRepository.findById(registrationId);

        if (registration.isEmpty() || registration.get().getLecture().getUser().getId() != userId) {
            return false;
        }

        registration.get().setStatus(RegistrationStatus.valueOf("ACCEPTED"));
        registrationRepository.save(registration.get());

        return true;
    }

    @Override
    public boolean deleteRegistration(Long userId, Long registrationId) {
        Optional<Registration> registration = registrationRepository.findById(registrationId);

        if (registration.isEmpty() || registration.get().getLecture().getUser().getId() != userId) {
            return false;
        }

        registrationRepository.deleteById(registrationId);
        return true;
    }

    @Override
    public List<RegistrationSearchResponse> searchRegistrations(Long lectureId) {
        List<Registration> registrations = registrationRepository.findAllNotAcceptedByLectureId(lectureId);

        List<RegistrationSearchResponse> responses = new ArrayList<>();
        for (Registration registration : registrations) {
            RegistrationSearchResponse response = RegistrationSearchResponse.builder()
                    .id(registration.getId())
                    .userName(registration.getUser().getName())
                    .build();

            responses.add(response);
        }

        return responses;
    }

    @Override
    public RegistrationStatus getStatus(Long userId, Long lectureId) {

        Registration registration = registrationRepository.findByUserIdAndLectureId(userId, lectureId);
        return registration.getStatus();
    }

}
