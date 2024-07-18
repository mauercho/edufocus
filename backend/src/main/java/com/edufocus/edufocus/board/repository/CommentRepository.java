package com.edufocus.edufocus.board.repository;

import com.edufocus.edufocus.board.entity.vo.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoardId(long boardId);

}
