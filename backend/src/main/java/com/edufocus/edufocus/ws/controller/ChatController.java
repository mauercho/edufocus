package com.edufocus.edufocus.ws.controller;


import com.edufocus.edufocus.user.util.JWTUtil;
import com.edufocus.edufocus.ws.entity.dto.MessageDto;
import com.edufocus.edufocus.ws.entity.dto.QuizDto;
import com.edufocus.edufocus.ws.entity.dto.ChatUserDto;
import com.edufocus.edufocus.ws.service.ChatService;
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

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    private final ChatService chatService;

    private final JWTUtil jwtUtil;

    public ChatController(SimpMessageSendingOperations simpMessageSendingOperations, ChatService chatService, JWTUtil jwtUtil){
        this.simpMessageSendingOperations = simpMessageSendingOperations;
        this.chatService = chatService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/chat/enter/{lectureId}")
    public ResponseEntity<?> enter(@PathVariable long lectureId){
        List<ChatUserDto> chatUsers = chatService.findChatUsers(lectureId);

        return new ResponseEntity<>(chatUsers, HttpStatus.OK);
    }


    @MessageMapping("/hello/{channelId}")
    @SendTo("/topic/{channelId}")
    public ChatUserDto hello(@DestinationVariable long channelId, SimpMessageHeaderAccessor simpMessageHeaderAccessor, @Header("Authorization") String token){
        String sessionId = simpMessageHeaderAccessor.getSessionId();

        System.out.println("session" + sessionId);

        System.out.println("가냐?????"+token);

        long userId = Long.parseLong(jwtUtil.getUserId(token));

        chatService.saveChatUserInfo(userId, channelId, sessionId);

        return chatService.getChatUserInfo(userId);
    }

    @MessageMapping("/message/{lectureId}")
    @SendTo("/topic/{lectureId}")
    public MessageDto sendMessage(@DestinationVariable long lectureId, MessageDto messageDto){return messageDto;}

    @MessageMapping("/quiz/{lectureId}")
    @SendTo("/topic/{lectureId}")
    public QuizDto quizStart(@DestinationVariable long lectureId, QuizDto quizDto){
        return quizDto;
    }

//    @EventListener
//    public void  handleWebSocketDisconnectListener(SessionDisconnectEvent event){
//        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//        String sessionId = headerAccessor.getSessionId();
//
//
//        ChatUserDto chatUserDto = chatService.getChatUserInfo(sessionId);
//
//
//        if(chatService.checkTeacher(chatUserDto)){
//            chatService.closeChatRoom(chatUserDto.getLectureId());
//            simpMessageSendingOperations.convertAndSend("/sub/channel/" + chatUserDto.getLectureId(), "강의가 종료 됐습니다.");
//            return;
//        }
//
//        chatService.deleteChatUserInfo(chatUserDto.getUserId());
//        simpMessageSendingOperations.convertAndSend("/sub/channel/" + chatUserDto.getLectureId(), chatUserDto);
//    }

}

