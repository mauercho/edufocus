package com.edufocus.edufocus.report.service;

import com.edufocus.edufocus.quiz.entity.Quiz;
import com.edufocus.edufocus.quiz.entity.QuizSet;
import com.edufocus.edufocus.quiz.repository.QuizRepository;
import com.edufocus.edufocus.quiz.service.QuizService;
import com.edufocus.edufocus.quiz.service.QuizSetService;
import com.edufocus.edufocus.report.entity.dto.ReportResponse;
import com.edufocus.edufocus.report.entity.vo.Answer;
import com.edufocus.edufocus.report.entity.dto.AnswerInput;
import com.edufocus.edufocus.report.entity.vo.Report;
import com.edufocus.edufocus.report.entity.dto.ReportRequset;
import com.edufocus.edufocus.report.repository.ReportRepository;
import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
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

    private final AnswerService answerService;
    private final UserRepository userRepository;


    @Override
    public ReportResponse grading(ReportRequset reportRequset) throws SQLException {


        QuizSet quizSet = quizSetService.findQuizSet(reportRequset.getQuizsetId());

        List<Quiz> quizList = quizSet.getQuizzes();
        List<AnswerInput> answerInputList = reportRequset.getAnswerInputList();

        Report report = new Report();

        Long reportNum = report.getId();
        int allCount= quizList.size();
        int correctCount =0 ;

        User testuser= userRepository.findById(reportRequset.getUserId()).orElse(null);

        for (Quiz quiz : quizList) {
            for (AnswerInput answerInput : answerInputList) {
                if (quiz.getId() == answerInput.getAnswerinputID()) {

                    if(quiz.getAnswer().equals(answerInput.getAnswer())) {
                        correctCount++;

                        Answer answer = Answer.builder()
                                        .userAnswer(answerInput.getAnswer())
                                .isCorrect(true)
                                .report(report)
                                .quiz(quiz)
                                .build();

                    }
                    else{
                        Answer answer = Answer.builder()
                                .userAnswer(answerInput.getAnswer())
                                .isCorrect(false)
                                .report(report)
                                .quiz(quiz)
                                .build();



                    }

                }

            }
        }

        report = Report.builder()
                        .user(testuser)
                                .quizSet(quizSet)
                                        .allCount(allCount)
                                                .correctCount(correctCount)
                                                        .testAt(new Date()).build();
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
}
