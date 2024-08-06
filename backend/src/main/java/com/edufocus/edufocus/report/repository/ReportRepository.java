package com.edufocus.edufocus.report.repository;

import com.edufocus.edufocus.report.entity.vo.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUser_Id(Long userId);

}
