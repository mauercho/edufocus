package com.edufocus.edufocus.registration.service;

import com.edufocus.edufocus.registration.entity.Registration;
import org.springframework.stereotype.Service;

@Service
public interface RegistrationService {

    void createRegistration(long userId, long registrationId);

    void acceptRegistration(long RegistrationId);

    void deleteRegistration(long registrationId);

    boolean isAcceptedRegistration(long registrationId);

}
