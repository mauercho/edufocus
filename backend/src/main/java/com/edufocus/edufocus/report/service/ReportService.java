package com.edufocus.edufocus.report.service;

import com.edufocus.edufocus.report.entity.dto.ReportResponse;
import com.edufocus.edufocus.report.entity.vo.Report;
import com.edufocus.edufocus.report.entity.dto.ReportRequset;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public interface ReportService {
    ReportResponse grading(ReportRequset reportRequset) throws SQLException;

}
