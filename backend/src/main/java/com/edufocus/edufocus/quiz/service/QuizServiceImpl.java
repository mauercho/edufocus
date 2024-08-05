package com.edufocus.edufocus.quiz.service;

import com.edufocus.edufocus.global.properties.ImagePathProperties;
import com.edufocus.edufocus.quiz.entity.*;
import com.edufocus.edufocus.quiz.repository.ChoiceRepository;
import com.edufocus.edufocus.quiz.repository.QuizRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;


@Service
@Transactional
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final ImagePathProperties imagePathProperties;

    private final QuizRepository quizRepository;

    private final ChoiceRepository choiceRepository;

    @Override
    public void createQuiz(QuizSet quizSet, QuizCreateRequest quizCreateRequest, MultipartFile quizImage) throws IOException {
        Quiz quiz = Quiz.builder()
                .quizSet(quizSet)
                .question(quizCreateRequest.getQuestion())
                .answer(quizCreateRequest.getAnswer())
                .build();

        List<Choice> choices = new ArrayList<>();

        for (ChoiceCreateRequest choiceCreateRequest : quizCreateRequest.getChoices()) {
            Choice choice = Choice.builder()
                    .quiz(quiz)
                    .num(choiceCreateRequest.getNum())
                    .content(choiceCreateRequest.getContent())
                    .build();
            choices.add(choice);
        }

        quiz.setChoices(choices);

        if (quizImage != null && !quizImage.isEmpty()) {
            String uid = UUID.randomUUID().toString();

            String imagePath = imagePathProperties.getPath();

            File checkPathFile = new File(imagePath);
            if (!checkPathFile.exists()) {
                checkPathFile.mkdirs();
            }

            File savingImage = new File(imagePath + "/" + uid + "_" + quizImage.getOriginalFilename());
            quizImage.transferTo(savingImage.toPath());
            String savePath = savingImage.toPath().toString();

            quiz.setImage(savePath);
        }

        quizRepository.save(quiz);
    }


    @Override
    public void updateQuiz(QuizUpdateRequest quizUpdateRequest, MultipartFile quizImage) throws IOException {
        Quiz quiz = quizRepository.findById(quizUpdateRequest.getId()).orElseThrow(NoSuchElementException::new);

        quiz.setQuestion(quizUpdateRequest.getQuestion());
        quiz.setAnswer(quizUpdateRequest.getAnswer());

        quiz.getChoices().clear();
        quizRepository.save(quiz);

        for (ChoiceCreateRequest choiceCreateRequest : quizUpdateRequest.getChoices()) {
            Choice choice = Choice.builder()
                    .quiz(quiz)
                    .num(choiceCreateRequest.getNum())
                    .content(choiceCreateRequest.getContent())
                    .build();

            quiz.addChoice(choice);
        }

        if (quizImage != null && !quizImage.isEmpty()) {
            if (quiz.getImage() != null) {
                File file = new File(quiz.getImage());
                file.delete();
            }

            String uid = UUID.randomUUID().toString();

            String imagePath = imagePathProperties.getPath();

            File checkPathFile = new File(imagePath);
            if (!checkPathFile.exists()) {
                checkPathFile.mkdirs();
            }

            File savingImage = new File(imagePath + "/" + uid + "_" + quizImage.getOriginalFilename());
            quizImage.transferTo(savingImage.toPath());
            String savePath = savingImage.toPath().toString();

            quiz.setImage(savePath);
        }

        quizRepository.save(quiz);
    }

    @Override
    public Quiz findQuiz(long quizId) {
        return quizRepository.findById(quizId).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public void removeQuiz(long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(NoSuchElementException::new);

        String image = quiz.getImage();
        if (image != null) {
            File file = new File(quiz.getImage());
            file.delete();
            quiz.setImage(null);
        }

        quizRepository.delete(quiz);
    }
}
