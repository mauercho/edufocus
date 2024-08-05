package com.edufocus.edufocus.user.model.repository;

import com.edufocus.edufocus.user.model.entity.vo.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.refreshToken = :refreshToken WHERE u.id = :id")
    void saveRefreshToken(@Param("id") Long id, @Param("refreshToken") String refreshToken);

    @Query("SELECT u.refreshToken FROM User u WHERE u.id = :id")
    String getRefreshToken(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.refreshToken = NULL WHERE u.id = :id")
    void deleteRefreshToken(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query("UPDATE User u set u.password = :password where u.id= :id")
    void updatePassword(@Param("id") Long id , @Param("password") String password);


    Optional<User> findByUserId(String userId);

}
