package com.edufocus.edufocus.board.service;


import com.edufocus.edufocus.board.entity.dto.RequestBoardDto;
import com.edufocus.edufocus.board.entity.dto.RequestBoardUpdateDto;
import com.edufocus.edufocus.board.entity.dto.RequestCommentDto;
import com.edufocus.edufocus.board.entity.vo.Board;
import com.edufocus.edufocus.board.entity.vo.Comment;
import com.edufocus.edufocus.board.repository.BoardRepository;
import com.edufocus.edufocus.board.repository.CommentRepository;
import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    private static final int PAGE_SIZE = 10;

    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;

    public BoardServiceImpl(BoardRepository boardRepository, CommentRepository commentRepository, UserRepository userRepository, LectureRepository lectureRepository){
        this.boardRepository = boardRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.lectureRepository = lectureRepository;
    }


    @Override
    public List<Board> findBoards(int pageNo, String category, long lectureId) {
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE);
        Page<Board> boards = boardRepository.findByLectureIdAndCategory(lectureId, category, pageable);
        return boards.getContent();
    }

    @Override
    public Board findBoardDetail(long boardId) {
        Board board = boardRepository.findById(boardId).get();
        return board;
    }

    @Override
    public void createBoard(long userId, RequestBoardDto requestBoardDto) {
        User user = userRepository.findById(userId).get();
        Lecture lecture = lectureRepository.findById(requestBoardDto.getLectureId()).get();

        Board board = Board.builder()
                .title(requestBoardDto.getTitle())
                .category(requestBoardDto.getCategory())
                .content(requestBoardDto.getCategory())
                .user(user)
                .lecture(lecture)
                .build();

        boardRepository.save(board);
    }

    @Override
    public void updateBoard(long boardId, RequestBoardUpdateDto requestBoardUpdateDto) {
        Board board = boardRepository.findById(boardId).get();

        board.setTitle(requestBoardUpdateDto.getTitle());
        board.setContent(requestBoardUpdateDto.getContent());

        boardRepository.save(board);
    }


    @Override
    public void deleteBoard(long boardId) {
        Board board = boardRepository.findById(boardId).get();

        boardRepository.delete(board);
    }

    @Override
    public List<Comment> findComments(long userId, long boardId) {
        return  commentRepository.findByBoardId(boardId);
    }

    @Override
    public void createComment(long userId, long boardId, String content) {
       User user = userRepository.findById(userId).get();
       Board board = boardRepository.findById(boardId).get();

       Comment comment = Comment.builder()
               .content(content)
               .board(board)
               .user(user)
               .build();

       commentRepository.save(comment);
    }



    @Override
    public void updateComment(long commentId, String content) {
        Comment comment = commentRepository.findById(commentId).get();
        comment.setContent(content);
        commentRepository.save(comment);
    }

    @Override
    public void deleteComment(long commentId) {
        Comment comment = commentRepository.findById(commentId).get();
        commentRepository.delete(comment);
    }


}
