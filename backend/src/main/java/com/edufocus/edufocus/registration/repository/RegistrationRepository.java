package com.edufocus.edufocus.registration.repository;

import com.edufocus.edufocus.registration.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {

}
