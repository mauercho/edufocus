package com.edufocus.edufocus.report.repository;

import com.edufocus.edufocus.report.entity.vo.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByReportId(Long reportId);

}
