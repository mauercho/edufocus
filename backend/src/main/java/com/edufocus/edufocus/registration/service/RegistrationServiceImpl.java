package com.edufocus.edufocus.registration.service;

import com.edufocus.edufocus.registration.entity.Registration;
import com.edufocus.edufocus.registration.entity.RegistrationStatus;
import com.edufocus.edufocus.registration.repository.RegistrationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {

    private final RegistrationRepository registrationRepository;

    @Override
    public void createRegistration(Registration registration) {
        registrationRepository.save(registration);
    }

    @Override
    public void acceptRegistration(long registrationId) {
        Optional<Registration> registration = registrationRepository.findById(registrationId);

        if (registration.isPresent()) {
            Registration reg = registration.get();
            reg.setStatus(RegistrationStatus.valueOf("ACCEPTED"));
            registrationRepository.save(reg);
        }
    }

    @Override
    public void deleteRegistration(long registrationId) {
        registrationRepository.deleteById(registrationId);
    }

    @Override
    public boolean isAcceptedRegistration(long registrationId) {
        Optional<Registration> registration = registrationRepository.findById(registrationId);

        return registration.isPresent() && registration.get().getStatus().equals("ACCEPTED");
    }
}
