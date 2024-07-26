package com.edufocus.edufocus.report.repository;

import com.edufocus.edufocus.report.entity.vo.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
}
