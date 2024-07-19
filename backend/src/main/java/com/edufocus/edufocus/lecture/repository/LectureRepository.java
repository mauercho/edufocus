package com.edufocus.edufocus.lecture.repository;

import com.edufocus.edufocus.lecture.entity.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, Long> {
    Lecture findByTitle(String title);

    List<Lecture> findAllByUserId(Long userId);

    List<Lecture> findLecturesByUserId(Long userId);

}
