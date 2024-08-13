package com.edufocus.edufocus.board.repository;

import com.edufocus.edufocus.board.entity.vo.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c join fetch c.user where c.board.id =:boardId")
    List<Comment> findByBoardId(long boardId);

}
