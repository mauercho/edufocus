package com.edufocus.edufocus.registration.service;

import com.edufocus.edufocus.registration.entity.Registration;
import org.springframework.stereotype.Service;

@Service
public interface RegistrationService {

    void createRegistration(Registration registration);

    void acceptRegistration(long RegistrationId);

    void deleteRegistration(long registrationId);

    boolean isAcceptedRegistration(long registrationId);

}
