package com.edufocus.edufocus.report.service;

import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.quiz.entity.Choice;
import com.edufocus.edufocus.quiz.entity.Quiz;
import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.quiz.repository.QuizRepository;
import com.edufocus.edufocus.quiz.repository.QuizSetRepository;
import com.edufocus.edufocus.quiz.service.QuizSetService;
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
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
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
            boolean isCollect;
            Answer answer;
            if (quiz.getAnswer().equals(inputAnswer)) {
                correctCount++;
                isCollect = true;
            } else {
                isCollect = false;
            }
            answer = Answer.builder()
                    .userAnswer(inputAnswer)
                    .isCorrect(isCollect)
                    .report(report)
                    .quiz(quiz)
                    .build();
            answerList.add(answer);
        }


        report.setAllCount(quizList.size());
        report.setCorrectCount(correctCount);
        report.setReportSet(reportSet);

        reportRepository.save(report);

        answerRepository.saveAll(answerList);
    }

    @Override
    public ReportDetailResponseDto reportDetail(long reportId) {

        Report report = reportRepository.findById(reportId).orElseThrow(NoSuchElementException::new);

        QuizSet quizSet = quizSetRepository.findById(report.getQuizSet().getId()).orElseThrow(NoSuchElementException::new);

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
    public List<ReportSetResponse> findReportSets(long lectureId) {
        List<ReportSet> reportSets = reportSetRepository.findByLectureId(lectureId);

        return reportSets.stream()
                .map(ReportSet::makeReportSetResponse)
                .toList();
    }

    @Override
    public List<ReportResponse> findReports(UUID reportSetId) {
        List<Report> reports = reportRepository.findByReportSetId(reportSetId);

        return reports.stream()
                .map(Report::makeReportResponse)
                .toList();
    }

    @Override
    public List<ReportResponse> findReports(long lectureId, long userId) {
        List<Report> reports = reportRepository.findByLectureIdAndUserId(lectureId, userId);

        return reports.stream()
                .map(Report::makeReportResponse)
                .toList();
    }

    @Override
    public UUID initReportSet(long lectureId, long quizSetId) {
        List<Registration> registrations = registrationRepository.findByLectureIdAndStatus(lectureId, RegistrationStatus.ACCEPTED);

        ReportSet reportSet = ReportSet.builder()
                .lecture(lectureRepository.getReferenceById(lectureId))
                .quizSet(quizSetRepository.getReferenceById(quizSetId))
                .build();

        reportSetRepository.save(reportSet);

        QuizSet quizSet = quizSetRepository.getReferenceById(quizSetId);

        List<Report> reports = registrations.stream()
                .filter(Registration::isAccepted)
                .map((Registration registration)-> registration.makeReport(reportSet, quizSet, lectureId))
                .toList();

        reportRepository.saveAll(reports);

        return reportSet.getId();

    }
}
