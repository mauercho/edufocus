package com.edufocus.edufocus.report.controller;

import com.edufocus.edufocus.report.entity.dto.ReportDetailResponseDto;
import com.edufocus.edufocus.report.entity.dto.ReportListResponseDto;
import com.edufocus.edufocus.report.entity.dto.ReportResponse;
import com.edufocus.edufocus.report.entity.vo.Report;
import com.edufocus.edufocus.report.entity.dto.ReportRequset;
import com.edufocus.edufocus.report.service.ReportService;
import com.edufocus.edufocus.user.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/report")
@Slf4j
@RequiredArgsConstructor
public class ReportController {


    private final ReportService reportService;
    private final JWTUtil jwtUtil;

    @PostMapping("/submit/{quizsetId}")
    public ResponseEntity<ReportResponse> submit(@PathVariable("quizsetId") Long quizestId, @RequestBody ReportRequset reportRequset, HttpServletRequest request) throws SQLException {

        String token = request.getHeader("Authorization");
        Long userId = Long.parseLong(jwtUtil.getUserId(token));

        ReportResponse report = reportService.grading(userId, quizestId, reportRequset);
        return new ResponseEntity<>(report, HttpStatus.CREATED);

    }

    @GetMapping("/myreport/{id}")
    public ResponseEntity<List<ReportListResponseDto>> reportList(@PathVariable Long id, HttpServletRequest request) throws SQLException {
        String token = request.getHeader("Authorization");
        Long userId = Long.parseLong(jwtUtil.getUserId(token));
        List<ReportListResponseDto> reportList = reportService.resultList(userId);

        return new ResponseEntity<>(reportList, HttpStatus.CREATED);

    }

    @GetMapping("/detailreport/{id}")
    public ResponseEntity<ReportDetailResponseDto> myReport(@PathVariable("id") Long reportId) throws SQLException {

        ReportDetailResponseDto detailReport = reportService.reportDetail(reportId);
        return new ResponseEntity<>(detailReport, HttpStatus.CREATED);

    }


}
