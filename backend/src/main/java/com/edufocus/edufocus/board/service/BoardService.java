package com.edufocus.edufocus.board.service;

import com.edufocus.edufocus.board.entity.dto.RequestBoardDto;
import com.edufocus.edufocus.board.entity.dto.RequestBoardUpdateDto;
import com.edufocus.edufocus.board.entity.dto.RequestCommentDto;
import com.edufocus.edufocus.board.entity.vo.Board;
import com.edufocus.edufocus.board.entity.vo.Comment;

import java.util.List;

public interface BoardService {

    public List<Board> findBoards(int pageNo, String category, long lectureId);
    public Board findBoardDetail(long boardId);
    public void createBoard(long userId, RequestBoardDto requestBoardDto);
    public void updateBoard(long boardId, RequestBoardUpdateDto requestBoardUpdateDto);
    public void deleteBoard(long boardId);
    public List<Comment> findComments(long userId, long boardId);
    public void createComment(long userId, long boardId, String content);
    public void updateComment(long commentId, String content);
    public void deleteComment(long commentId);

}
