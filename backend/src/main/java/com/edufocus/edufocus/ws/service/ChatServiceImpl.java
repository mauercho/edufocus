package com.edufocus.edufocus.ws.service;


import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import com.edufocus.edufocus.ws.entity.dto.ChatUserDto;
import com.edufocus.edufocus.ws.entity.vo.ChatUser;
import com.edufocus.edufocus.ws.repository.ChatUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatServiceImpl implements ChatService{

    private final ChatUserRepository chatUserRepository;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;

    public ChatServiceImpl(ChatUserRepository chatUserRepository, UserRepository userRepository, LectureRepository lectureRepository) {
        this.chatUserRepository = chatUserRepository;
        this.userRepository = userRepository;
        this.lectureRepository = lectureRepository;
    }


    @Override
    public void saveChatUserInfo(long userId, long lectureId, String sessionId) {
        User user = userRepository.getReferenceById(userId);
        Lecture lecture = lectureRepository.getReferenceById(lectureId);

        ChatUser chatUser = ChatUser.builder()
                .user(user)
                .lecture(lecture)
                .sessionId(sessionId)
                .build();

        chatUserRepository.save(chatUser);
    }

    @Override
    public ChatUserDto getChatUserInfo(long userId) {
        ChatUser chatUser = chatUserRepository.findById(userId).orElseThrow(IllegalArgumentException::new);

        return chatUser.makeChatUserDto();
    }

    @Override
    public ChatUserDto getChatUserInfo(String sessionId) {
        ChatUser chatUser = chatUserRepository.findBySessionId(sessionId);

        return chatUser.makeChatUserDto();
    }

    @Override
    public List<ChatUserDto> findChatUsers(long lectureId) {
        return chatUserRepository.findByLectureId(lectureId)
                .stream()
                .map(ChatUser::makeChatUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public boolean checkTeacher(ChatUserDto chatUser) {
        Lecture lecture = lectureRepository.findByIdAndUserId(chatUser.getLectureId(), chatUser.getUserId());
        return lecture != null;
    }

    @Override
    public void closeChatRoom(long lectureId) {
        chatUserRepository.deleteByLectureId(lectureId);
    }

    @Override
    public void deleteChatUserInfo(long userId) {
        ChatUser chatUser = chatUserRepository.getReferenceById(userId);

        chatUserRepository.delete(chatUser);
    }
}
