package com.edufocus.edufocus.report.service;

import com.edufocus.edufocus.report.entity.Report;
import com.edufocus.edufocus.report.entity.ReportRequset;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public interface ReportService {
    Report grading(ReportRequset reportRequset) throws SQLException;

}
