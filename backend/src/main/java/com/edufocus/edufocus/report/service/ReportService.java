package com.edufocus.edufocus.report.service;

import com.edufocus.edufocus.report.entity.dto.*;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Service
public interface ReportService {
    void grade(long userId, UUID reportSetId, ReportRequest reportRequest);

    ReportDetailResponseDto reportDetail(long userId);

    List<ReportSetResponse> findReportSets(long lectureId);

    List<ReportResponse> findReports(UUID reportSetId);

    List<ReportResponse> findReports(long lectureId, long userid);

    UUID initReportSet(long lectureId, long quizSetId);
}
