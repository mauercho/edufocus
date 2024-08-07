package com.edufocus.edufocus.report.service;

import com.edufocus.edufocus.report.entity.dto.ReportDetailResponseDto;
import com.edufocus.edufocus.report.entity.dto.ReportListResponseDto;
import com.edufocus.edufocus.report.entity.dto.ReportResponse;
import com.edufocus.edufocus.report.entity.dto.ReportRequset;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public interface ReportService {
    ReportResponse grading(Long userId, Long quizesetId, ReportRequset reportRequset, Long lectureId) throws SQLException;

    ReportDetailResponseDto reportDetail(Long userId) throws SQLException;

    List<ReportListResponseDto> resultList(Long userId) throws SQLException;

    List<ReportListResponseDto> studentResultList(Long lectureId) throws SQLException;
}
