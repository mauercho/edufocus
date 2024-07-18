package com.edufocus.edufocus.registration.controller;

import com.edufocus.edufocus.registration.entity.Registration;
import com.edufocus.edufocus.registration.service.RegistrationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration")
@Slf4j
public class RegistrationController {

    private final RegistrationService registrationServiceImpl;

    public RegistrationController(RegistrationService registrationServiceImpl) {
        this.registrationServiceImpl = registrationServiceImpl;
    }

    @PostMapping
    public ResponseEntity<?> register(@RequestBody Registration registration) {
        registrationServiceImpl.createRegistration(registration);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/registrationId/{registrationId}")
    public ResponseEntity<?> acceptRigistration(@PathVariable long registrationId) {
        registrationServiceImpl.acceptRegistration(registrationId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/registrationId/{registrationId}")
    public ResponseEntity<?> deleteRigistration(@PathVariable long registrationId) {
        registrationServiceImpl.deleteRegistration(registrationId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
