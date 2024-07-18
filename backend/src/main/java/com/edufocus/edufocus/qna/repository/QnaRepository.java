package com.edufocus.edufocus.qna.repository;

import com.edufocus.edufocus.qna.entity.Qna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnaRepository extends JpaRepository<Qna, Long> {

    @Query(value = "SELECT * FROM qna WHERE lecture_id = :lectureId", nativeQuery = true)
    List<Qna> findLecture(@Param("lectureId") Long lectureId);


}
