package com.edufocus.edufocus.ws.service;

import com.edufocus.edufocus.ws.entity.dto.ChatUserDto;

import java.util.List;

public interface ChatService {
    public void saveChatUserInfo(long userId, long channelId, String sessionId);
    public ChatUserDto getChatUserInfo(long userId);
    public ChatUserDto getChatUserInfo(String sessionId);
    public List<ChatUserDto> findChatUsers(long lectureId);
    public boolean checkTeacher(ChatUserDto chatUser);
    public void closeChatRoom(long chatRoomId);
    public void deleteChatUserInfo(long userId);
}
