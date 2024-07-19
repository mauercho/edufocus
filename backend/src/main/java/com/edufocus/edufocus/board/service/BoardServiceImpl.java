package com.edufocus.edufocus.board.service;


import com.edufocus.edufocus.board.entity.dto.*;
import com.edufocus.edufocus.board.entity.vo.Board;
import com.edufocus.edufocus.board.entity.vo.Comment;
import com.edufocus.edufocus.board.repository.BoardRepository;
import com.edufocus.edufocus.board.repository.CommentRepository;
import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardServiceImpl implements BoardService {

    private static final int PAGE_SIZE = 10;

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;

    public BoardServiceImpl(BoardRepository boardRepository, CommentRepository commentRepository, UserRepository userRepository, LectureRepository lectureRepository){
        this.boardRepository = boardRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.lectureRepository = lectureRepository;
    }


    @Transactional
    public List<ResponseBoardSummaryDto> findBoards(int pageNo, String category, long lectureId) {
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE);

        List<Board> boards = boardRepository.findByLectureIdAndCategory(lectureId, category, pageable).getContent();

        return boards.stream().map(Board::makeSummaryDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ResponseBoardDetailDto findBoardDetail(long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow()
                .makeDetailDto();
    }

    @Transactional
    public void createBoard(long userId, RequestBoardDto requestBoardDto) {
        User user = userRepository.findById(userId).orElseThrow();
        Lecture lecture = lectureRepository.findById(requestBoardDto.getLectureId()).get();

        Board board = Board.builder()
                .title(requestBoardDto.getTitle())
                .category(requestBoardDto.getCategory())
                .content(requestBoardDto.getContent())
                .user(user)
                .lecture(lecture)
                .build();

        boardRepository.save(board);
    }

    @Transactional
    public void updateBoard(long boardId, RequestBoardUpdateDto requestBoardUpdateDto) {
        Board board = boardRepository.findById(boardId).get();

        board.setTitle(requestBoardUpdateDto.getTitle());
        board.setContent(requestBoardUpdateDto.getContent());

        boardRepository.save(board);
    }


    @Transactional
    public void deleteBoard(long boardId) {
        Board board = boardRepository.findById(boardId).get();

        boardRepository.delete(board);
    }

    @Transactional
    public List<ResponseCommentDto> findComments(long boardId) {
        return  commentRepository.findByBoardId(boardId).stream()
                .map(Comment::makeCommentDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void createComment(long userId, long boardId, RequestCommentDto requestCommentDto) {
       User user = userRepository.findById(userId).get();
       Board board = boardRepository.findById(boardId).get();

       Comment comment = Comment.builder()
               .content(requestCommentDto.getContent())
               .board(board)
               .user(user)
               .build();

       commentRepository.save(comment);
    }



    @Transactional
    public void updateComment(long commentId, RequestCommentDto requestCommentDto) {
        Comment comment = commentRepository.findById(commentId).get();

        comment.setContent(requestCommentDto.getContent());

        commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(long commentId) {
        Comment comment = commentRepository.findById(commentId).get();

        commentRepository.delete(comment);
    }


}
