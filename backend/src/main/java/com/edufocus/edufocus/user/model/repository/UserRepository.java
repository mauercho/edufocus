package com.edufocus.edufocus.user.model.repository;

import com.edufocus.edufocus.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

}
