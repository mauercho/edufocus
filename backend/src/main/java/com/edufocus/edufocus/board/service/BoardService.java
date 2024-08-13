package com.edufocus.edufocus.board.service;

import com.edufocus.edufocus.board.entity.dto.*;

import java.util.List;

public interface BoardService {

    public void createBoard(long userId, RequestBoardDto requestBoardDto);

    public List<ResponseBoardSummaryDto> findBoards(int pageNo, String category, long lectureId);

    public ResponseBoardDetailDto findBoardDetail(long userId, long boardId);

    public void updateBoard(long boardId, RequestBoardUpdateDto requestBoardUpdateDto);

    public void deleteBoard(long boardId);

    public void createComment(long userId, long boardId, RequestCommentDto requestCommentDto);

    public List<ResponseCommentDto> findComments(long userId, long boardId);

    public void updateComment(long commentId, RequestCommentDto requestCommentDto);

    public void deleteComment(long commentId);

}
