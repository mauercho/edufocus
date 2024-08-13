package com.edufocus.edufocus.report.repository;

import com.edufocus.edufocus.report.entity.vo.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Report findByReportSetIdAndUserId(UUID reportSetId, long userId);

    List<Report> findByReportSetIdOrderById(UUID reportSetId);

    List<Report> findByLectureIdAndUserIdOrderById(long lectureId, long userId);
}
