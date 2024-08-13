package com.edufocus.edufocus.ws.controller;


import com.edufocus.edufocus.global.constant.RabbitMQConstant;
import com.edufocus.edufocus.quiz.service.QuizSetService;
import com.edufocus.edufocus.report.service.ReportService;
import com.edufocus.edufocus.ws.entity.dto.MessageDto;
import com.edufocus.edufocus.ws.entity.dto.QuizDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class ChatController {

    RabbitTemplate rabbitTemplate;
    ReportService reportService;
    QuizSetService quizSetService;

    public ChatController(RabbitTemplate rabbitTemplate, ReportService reportService, QuizSetService quizSetService) {
        this.rabbitTemplate = rabbitTemplate;
        this.reportService = reportService;
        this.quizSetService = quizSetService;
    }

    @MessageMapping("chat.message.{lectureId}")
    public void sendMessage(@DestinationVariable long lectureId, MessageDto messageDto) {
        rabbitTemplate.convertAndSend(RabbitMQConstant.CHAT_EXCHANGE.getConstant(),
                RabbitMQConstant.ROUTING_KEY_PREFIX.getConstant() + lectureId,
                messageDto);
    }

    @MessageMapping("chat.quiz.{lectureId}")
    public void quizStart(@DestinationVariable long lectureId, QuizDto quizDto) {
        UUID reportSetId = reportService.initReportSet(lectureId, quizDto.getQuizSetId());
        quizSetService.updateQuizSetTested(quizDto.getQuizSetId());

        quizDto.setReportSetId(reportSetId);

        rabbitTemplate.convertAndSend(RabbitMQConstant.CHAT_EXCHANGE.getConstant(),
                RabbitMQConstant.ROUTING_KEY_PREFIX.getConstant() + lectureId,
                quizDto);
    }


}

