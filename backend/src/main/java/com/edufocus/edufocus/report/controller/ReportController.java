package com.edufocus.edufocus.report.controller;

import com.edufocus.edufocus.report.entity.dto.ReportDetailResponseDto;
import com.edufocus.edufocus.report.entity.dto.ReportListResponseDto;
import com.edufocus.edufocus.report.entity.dto.ReportResponse;
import com.edufocus.edufocus.report.entity.vo.Report;
import com.edufocus.edufocus.report.entity.dto.ReportRequset;
import com.edufocus.edufocus.report.service.ReportService;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.user.model.entity.vo.UserRole;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import com.edufocus.edufocus.user.model.service.UserService;
import com.edufocus.edufocus.user.model.service.UserServiceImpl;
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
    private final UserService userService;
    private final UserRepository userRepository;
    //SUBMIT 할떄 LECTURE ID 저장해놓기

    @PostMapping("/submit/{lectreId}/quizset/{quizsetId}")
    public ResponseEntity<?> submit(@PathVariable("lectreId") Long lectureId, @PathVariable("quizsetId") Long quizestId, @RequestBody ReportRequset reportRequset, HttpServletRequest request) throws SQLException {

        String token = request.getHeader("Authorization");
        Long userId = Long.parseLong(jwtUtil.getUserId(token));
        User findUser = userRepository.findById(userId).orElse(null);
        if (findUser.getRole() == UserRole.ADMIN) {

            return new ResponseEntity<>("강사는 퀴즈제출을 할수 없습니다", HttpStatus.FORBIDDEN);

        }
        ReportResponse report = reportService.grading(userId, quizestId, reportRequset, lectureId);

        return new ResponseEntity<>(report, HttpStatus.CREATED);

    }


    @GetMapping("/myreport")
    public ResponseEntity<List<ReportListResponseDto>> myreport(HttpServletRequest request) throws SQLException {
        String token = request.getHeader("Authorization");
        Long userId = Long.parseLong(jwtUtil.getUserId(token));


        List<ReportListResponseDto> reportList = reportService.resultList(userId);

        return new ResponseEntity<>(reportList, HttpStatus.CREATED);

    }

    @GetMapping("/myreportdetail/{id}")
    public ResponseEntity<ReportDetailResponseDto> myreportdetail(@PathVariable("id") Long reportId) throws SQLException {

        ReportDetailResponseDto detailReport = reportService.reportDetail(reportId);
        return new ResponseEntity<>(detailReport, HttpStatus.CREATED);

    }

    @GetMapping("/studentreport/{lecturid}")
    public ResponseEntity<List<ReportListResponseDto>> studentreport(@PathVariable("lecturid") Long lectureId) throws SQLException {


        List<ReportListResponseDto> reportList = reportService.studentResultList(lectureId);

        return new ResponseEntity<>(reportList, HttpStatus.CREATED);

    }

    @GetMapping("/studentreportdetail/{id}")
    public ResponseEntity<ReportDetailResponseDto> studentdetailreport(@PathVariable("id") Long reportId) throws SQLException {

        ReportDetailResponseDto detailReport = reportService.reportDetail(reportId);
        return new ResponseEntity<>(detailReport, HttpStatus.CREATED);

    }

    // 강좌에 대한 퀴즈셋
//   lecture id가 똑같은 report들 제목 + 작성자 + 맞틀 개수 미리 보여주기
//    @GetMapping("/detailreport/{id}")
//    public ResponseEntity<ReportDetailResponseDto> (@PathVariable("id") Long reportId) throws SQLException {
//
//        ReportDetailResponseDto detailReport = reportService.reportDetail(reportId);
//        return new ResponseEntity<>(detailReport, HttpStatus.CREATED);
//
//    }  v 9

}
