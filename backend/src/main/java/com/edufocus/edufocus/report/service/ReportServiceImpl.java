package com.edufocus.edufocus.report.service;

import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.quiz.entity.Choice;
import com.edufocus.edufocus.quiz.entity.Quiz;
import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.quiz.repository.QuizRepository;
import com.edufocus.edufocus.quiz.repository.QuizSetRepository;
import com.edufocus.edufocus.registration.entity.Registration;
import com.edufocus.edufocus.registration.entity.RegistrationStatus;
import com.edufocus.edufocus.registration.repository.RegistrationRepository;
import com.edufocus.edufocus.report.entity.dto.*;
import com.edufocus.edufocus.report.entity.vo.Answer;
import com.edufocus.edufocus.report.entity.vo.Report;
import com.edufocus.edufocus.report.entity.vo.ReportSet;
import com.edufocus.edufocus.report.repository.AnswerRepository;
import com.edufocus.edufocus.report.repository.ReportRepository;
import com.edufocus.edufocus.report.repository.ReportSetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final QuizRepository quizRepository;
    private final RegistrationRepository registrationRepository;
    private final AnswerRepository answerRepository;
    private final ReportSetRepository reportSetRepository;
    private final LectureRepository lectureRepository;
    private final QuizSetRepository quizSetRepository;


    @Override
    public void grade(long userId, UUID reportSetId, ReportRequest reportRequest){

        ReportSet reportSet = reportSetRepository.findById(reportSetId).orElseThrow(NoSuchElementException::new);

        Report report = reportRepository.findByReportSetIdAndUserId(reportSetId, userId);

        List<Quiz> quizList = report.getQuizSet().getQuizzes();

        List<String> answerInputList = reportRequest.getAnswer();

        List<Answer> answerList = new ArrayList<>();

        int correctCount = 0;

        for (int idx = 0; idx < answerInputList.size(); idx++) {
            Quiz quiz = quizList.get(idx);
            String inputAnswer = answerInputList.get(idx);
            boolean isCorrect;
            Answer answer;
            if (quiz.getAnswer().equals(inputAnswer)) {
                correctCount++;
                isCorrect = true;
            } else {
                isCorrect = false;
            }
            answer = Answer.builder()
                    .userAnswer(inputAnswer)
                    .isCorrect(isCorrect)
                    .report(report)
                    .quiz(quiz)
                    .build();
            answerList.add(answer);
        }


        report.setAllCount(quizList.size());
        report.setCorrectCount(correctCount);

        reportRepository.save(report);

        answerRepository.saveAll(answerList);
    }

    @Override
    public ReportDetailResponseDto reportDetail(long reportId) {

        Report report = reportRepository.findById(reportId).orElseThrow(NoSuchElementException::new);

        QuizSet quizSet = quizSetRepository.findById(report.getQuizSet().getId()).orElseThrow(NoSuchElementException::new);

        List<QuizDto> quizDtos = new ArrayList<>();

        List<Answer> myAnswer = answerRepository.findByReportId(report.getId());

        for (Answer answer : myAnswer) {
            Quiz quiz = quizRepository.findById(answer.getQuiz().getId()).orElse(null);

            List<ChoiceDto> choiceDtos = quiz.getChoices()
                    .stream()
                    .map(Choice::makeChoiceDto)
                    .toList();

            QuizDto quizDto = QuizDto.builder()
                        .id(quiz.getId())
                        .question(quiz.getQuestion())
                        .image(quiz.getImage())
                        .question(quiz.getQuestion())
                        .answer(quiz.getAnswer())
                        .userAnswer(answer.getUserAnswer())
                        .isCorrect(answer.isCorrect())
                        .choices(choiceDtos)
                        .build();

            quizDtos.add(quizDto);
        }


        return ReportDetailResponseDto.builder()
                .title(quizSet.getTitle())
                .testAt(report.getTestAt())
                .allCount(report.getAllCount())
                .correctCount(report.getCorrectCount())
                .quizzes(quizDtos)
                .build();
    }

    @Override
    public List<ReportSetResponse> findReportSets(long lectureId) {
        List<ReportSet> reportSets = reportSetRepository.findByLectureIdDesc(lectureId);

        return reportSets.stream()
                .map(ReportSet::makeReportSetResponse)
                .toList();
    }

    @Override
    public List<ReportResponse> findReports(UUID reportSetId) {
        List<Report> reports = reportRepository.findByReportSetIdDesc(reportSetId);

        return reports.stream()
                .map(Report::makeReportResponse)
                .toList();
    }

    @Override
    public List<ReportResponse> findReports(long lectureId, long userId) {
        List<Report> reports = reportRepository.findByLectureIdAndUserIdDesc(lectureId, userId);

        return reports.stream()
                .map(Report::makeReportResponse)
                .toList();
    }

    @Override
    public UUID initReportSet(long lectureId, long quizSetId) {
        ReportSet reportSet = ReportSet.builder()
                .lecture(lectureRepository.getReferenceById(lectureId))
                .quizSet(quizSetRepository.getReferenceById(quizSetId))
                .build();

        reportSetRepository.save(reportSet);

        QuizSet quizSet = quizSetRepository.getReferenceById(quizSetId);

        List<Registration> registrations = registrationRepository.findByLectureIdAndStatus(lectureId, RegistrationStatus.ACCEPTED);

        List<Report> reports = registrations.stream()
                .map((Registration registration)-> registration.makeReport(reportSet, quizSet, lectureId))
                .toList();

        reportRepository.saveAll(reports);

        return reportSet.getId();

    }

    @Override
    public void deleteReportSet(UUID reportSetId, long userId) {
        ReportSet reportSet = reportSetRepository.findById(reportSetId).orElseThrow(NoSuchElementException::new);
        if(reportSet.findUserId() == userId)
            reportSetRepository.delete(reportSet);
    }
}
