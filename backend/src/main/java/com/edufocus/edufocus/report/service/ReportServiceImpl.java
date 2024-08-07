package com.edufocus.edufocus.report.service;

import com.edufocus.edufocus.quiz.entity.Choice;
import com.edufocus.edufocus.quiz.entity.Quiz;
import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.quiz.repository.QuizRepository;
import com.edufocus.edufocus.quiz.repository.QuizSetRepository;
import com.edufocus.edufocus.quiz.service.QuizService;
import com.edufocus.edufocus.quiz.service.QuizSetService;
import com.edufocus.edufocus.report.entity.dto.*;
import com.edufocus.edufocus.report.entity.vo.Answer;
import com.edufocus.edufocus.report.entity.vo.Report;
import com.edufocus.edufocus.report.repository.AnswerRepository;
import com.edufocus.edufocus.report.repository.ReportRepository;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.C;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final QuizSetService quizSetService;
    private final QuizService quizService;

    private final ReportRepository reportRepository;
    private final QuizRepository quizRepository;


    private final AnswerRepository answerRepository;
    private final AnswerService answerService;
    private final UserRepository userRepository;
    private final QuizSetRepository quizSetRepository;


    @Override
    public ReportResponse grading(Long userId, Long quizsetId, ReportRequset reportRequset, Long lectureId) throws SQLException {

        QuizSet quizSet = quizSetService.findQuizSet(quizsetId);
        List<Quiz> quizList = quizSet.getQuizzes();
        List<String> answerInputList = reportRequset.getAnswer();

        List<Answer> answerList = new ArrayList<>();

        int allCount = quizList.size();
        int correctCount = 0;

        User testuser = userRepository.findById(userId).orElse(null);

        for (int idx = 0; idx < answerInputList.size(); idx++) {
            Quiz quiz = quizList.get(idx);
            String inputAnswer = answerInputList.get(idx);
            Answer answer;
            //
            if (quiz.getAnswer().equals(inputAnswer)) {
                correctCount++;
                answer = Answer.builder()
                        .userAnswer(inputAnswer)
                        .isCorrect(true)
                        .report(null)
                        .quiz(quiz)
                        .build();
            } else {
                answer = Answer.builder()
                        .userAnswer(inputAnswer)
                        .isCorrect(false)
                        .report(null)
                        .quiz(quiz)
                        .build();
            }
            answerList.add(answer);
        }


        Report report = Report.builder()
                .user(testuser)
                .quizSet(quizSet)
                .allCount(allCount)
                .correctCount(correctCount)
                .testAt(new Date())
                .lectureId(lectureId)
                .build();


        reportRepository.save(report);


        for (Answer answer : answerList) {
            answer.setReport(report);
            answerRepository.save(answer);
        }


        ReportResponse reportResponse = ReportResponse.builder()
                .quizesetId(quizSet.getId())
                .userId(testuser.getId())
                .title(quizSet.getTitle())
                .allCount(allCount)
                .correctCount(correctCount)
                .testAt(new Date())
                .build();

        return reportResponse;
    }

    @Override
    public ReportDetailResponseDto reportDetail(Long repordId) {

        Report report = reportRepository.findById(repordId).orElse(null);

        QuizSet quizSet = quizSetService.findQuizSet(report.getQuizSet().getId());

        List<QuizDto> correctQuiz = new ArrayList<>();
        List<QuizDto> incorrectQuiz = new ArrayList<>();

        List<Answer> myAnswer = answerRepository.findByReport_Id(report.getId());

        for (Answer answer : myAnswer) {
            QuizDto quizDto;
            Quiz quiz = quizRepository.findById(answer.getQuiz().getId()).orElse(null);

            ArrayList<ChoiceDto> choiceDtos = new ArrayList<>();

            for (Choice c : quiz.getChoices()) {
                ChoiceDto choiceDto = null;
                choiceDto = choiceDto.builder()
                        .num(c.getNum())
                        .content(c.getContent())
                        .build();
                choiceDtos.add(choiceDto);

            }
            if (answer.isCorrect()) {

                quizDto = QuizDto.builder()
                        .id(quiz.getId())
                        .question(quiz.getQuestion())
                        .image(quiz.getImage())
                        .question(quiz.getQuestion())
                        .answer(quiz.getAnswer())
                        .userAnswer(answer.getUserAnswer())
                        .choices(choiceDtos)
                        .build();
                correctQuiz.add(quizDto);
            } else {
                quizDto = QuizDto.builder()
                        .id(quiz.getId())
                        .question(quiz.getQuestion())
                        .image(quiz.getImage())
                        .question(quiz.getQuestion())
                        .answer(quiz.getAnswer())
                        .userAnswer(answer.getUserAnswer())
                        .choices(choiceDtos)
                        .build();
                incorrectQuiz.add(quizDto);

            }
        }
        ReportDetailResponseDto dto = ReportDetailResponseDto.builder()
                .title(quizSet.getTitle())
                .testAt(report.getTestAt())
                .allCount(report.getAllCount())
                .correctCount(report.getCorrectCount())
                .correctQuizzes(correctQuiz)
                .incorrectQuizzes(incorrectQuiz)
                .build();

        return dto;
    }


    @Override
    public List<ReportListResponseDto> resultList(Long userId) throws SQLException {

        List<Report> reportList = reportRepository.findByUser_Id(userId);

        List<ReportListResponseDto> reportListResponseDtoList = new ArrayList<>();


        for (Report report : reportList) {

            QuizSet quizSet = quizSetService.findQuizSet(report.getQuizSet().getId());
            ReportListResponseDto dto = ReportListResponseDto.builder()
                    .title(quizSet.getTitle())  // Assuming QuizSet has a method getTitle()
                    .date(report.getTestAt())
                    .reportId(report.getId())// Assuming QuizSet has a method getDate()
                    .build();
            reportListResponseDtoList.add(dto);

        }

        return reportListResponseDtoList;

    }

    @Override
    public List<ReportListResponseDto> studentResultList(Long lectureId) throws SQLException {

        List<Report> reportList = reportRepository.findByLectureId(lectureId);

        List<ReportListResponseDto> reportListResponseDtoList = new ArrayList<>();


        for (Report report : reportList) {

            System.out.println(report.toString());
            QuizSet quizSet = quizSetService.findQuizSet(report.getQuizSet().getId());
            ReportListResponseDto dto = ReportListResponseDto.builder()
                    .title(quizSet.getTitle())
                    .date(report.getTestAt())
                    .reportId(report.getId())
                    .allCount(report.getAllCount())
                    .correctCount(report.getCorrectCount())
                    .build();
            reportListResponseDtoList.add(dto);

        }

        return reportListResponseDtoList;

    }
}
