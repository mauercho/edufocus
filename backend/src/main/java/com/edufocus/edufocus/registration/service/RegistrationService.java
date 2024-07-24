package com.edufocus.edufocus.registration.service;

import com.edufocus.edufocus.registration.entity.Registration;
import org.springframework.stereotype.Service;

@Service
public interface RegistrationService {

    boolean createRegistration(long userId, long registrationId);

    boolean acceptRegistration(long userId, long RegistrationId);

    boolean deleteRegistration(long userId, long registrationId);

}
