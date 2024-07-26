package com.edufocus.edufocus.ws.repository;

import com.edufocus.edufocus.ws.entity.vo.ChatUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatUserRepository extends JpaRepository<ChatUser, Long> {
    public ChatUser findBySessionId(String sessionId);
    public List<ChatUser> findByLectureId(long lectureId);

    @Query("delete from ChatUser c where c.lecture.id=:lectureId")
    public void deleteByLectureId(long lectureId);
}
