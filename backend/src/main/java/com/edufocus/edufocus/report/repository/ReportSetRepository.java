package com.edufocus.edufocus.report.repository;

import com.edufocus.edufocus.report.entity.vo.ReportSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReportSetRepository  extends JpaRepository<ReportSet, UUID> {
    List<ReportSet> findByLectureIdDesc(long userId);
}
