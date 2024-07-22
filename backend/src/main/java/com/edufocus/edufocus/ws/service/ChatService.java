package com.edufocus.edufocus.ws.service;

import com.edufocus.edufocus.ws.entity.dto.ResponseChatUserDto;

public interface ChatService {
    public void saveChatUserInfo(long userId, long channelId, String sessionId);
    public ResponseChatUserDto getChatUserInfo(long userId);


}
