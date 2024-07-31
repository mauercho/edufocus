package com.edufocus.edufocus.ws.controller;


import com.edufocus.edufocus.global.constant.RabbitMQConstant;
import com.edufocus.edufocus.user.util.JWTUtil;
import com.edufocus.edufocus.ws.entity.dto.MessageDto;
import com.edufocus.edufocus.ws.entity.dto.QuizDto;
import com.edufocus.edufocus.ws.entity.dto.ChatUserDto;
import com.edufocus.edufocus.ws.service.ChatService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.util.List;

@RestController
public class ChatController {

    RabbitTemplate rabbitTemplate;

    public ChatController(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate = rabbitTemplate;
    }

    @MessageMapping("chat.message.{lectureId}")
    public void sendMessage(@DestinationVariable long lectureId, MessageDto messageDto){
       rabbitTemplate.convertAndSend(RabbitMQConstant.CHAT_EXCHANGE.getConstant(),
                RabbitMQConstant.ROUTING_KEY_PREFIX.getConstant() + lectureId,
                messageDto);
    }

    @MessageMapping("chat.quiz.{lectureId}")
    public void quizStart(@DestinationVariable long lectureId, QuizDto quizDto){
        rabbitTemplate.convertAndSend(RabbitMQConstant.CHAT_EXCHANGE.getConstant(),
                RabbitMQConstant.ROUTING_KEY_PREFIX.getConstant() + lectureId,
                quizDto);
    }


}

