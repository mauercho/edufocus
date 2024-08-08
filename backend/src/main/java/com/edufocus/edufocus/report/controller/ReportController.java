package com.edufocus.edufocus.report.controller;

import com.edufocus.edufocus.report.entity.dto.*;
import com.edufocus.edufocus.report.service.ReportService;
import com.edufocus.edufocus.user.model.service.UserService;
import com.edufocus.edufocus.user.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/report")
@Slf4j
@RequiredArgsConstructor
public class ReportController {


    private final ReportService reportService;
    private final JWTUtil jwtUtil;
    private final UserService userService;

    @PostMapping("/submit/quizSet/{reportSetId}")
    public ResponseEntity<?> submit(@PathVariable("reportSetId") UUID reportSetId, @RequestBody ReportRequest reportRequest, HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        long userId = Long.parseLong(jwtUtil.getUserId(token));

        if (userService.isTeacher(userId))
            return new ResponseEntity<>("강사는 퀴즈제출을 할수 없습니다", HttpStatus.FORBIDDEN);

        reportService.grade(userId, reportSetId, reportRequest);

        return new ResponseEntity<>(HttpStatus.OK);

    }


    @GetMapping("/student/{lectureId}")
    public ResponseEntity<List<ReportResponse>> searchMyReport(@PathVariable long lectureId, HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        long userId = Long.parseLong(jwtUtil.getUserId(token));

        List<ReportResponse> reportResponses = reportService.findReports(lectureId, userId);

        if(reportResponses.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(reportResponses, HttpStatus.OK);
    }

    @GetMapping("/reportDetail/{reportId}")
    public ResponseEntity<ReportDetailResponseDto> searchDetailReport(@PathVariable("reportId") long reportId){
        ReportDetailResponseDto detailReport = reportService.reportDetail(reportId);

        return new ResponseEntity<>(detailReport, HttpStatus.OK);
    }

    @GetMapping("/teacher/reportSet/{lectureId}")
    public ResponseEntity<List<ReportSetResponse>> searchReportSets(@PathVariable("lectureId") long lectureId){
        List<ReportSetResponse> reportSetResponses = reportService.findReportSets(lectureId);
        
        if(reportSetResponses.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        
        return new ResponseEntity<>(reportSetResponses, HttpStatus.OK);
    }
    
    @GetMapping("/teacher/report/{reportSetId}")
    public ResponseEntity<?> searchReports(@PathVariable("reportSetId") UUID reportSetId){
        List<ReportResponse> reportResponses = reportService.findReports(reportSetId);
        
        if(reportResponses.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        
        return new ResponseEntity<>(reportResponses, HttpStatus.OK);
    }

}
