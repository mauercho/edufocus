package com.edufocus.edufocus.board.controller;

import com.edufocus.edufocus.board.entity.dto.RequestBoardDto;
import com.edufocus.edufocus.board.entity.dto.RequestBoardUpdateDto;
import com.edufocus.edufocus.board.entity.dto.RequestCommentDto;
import com.edufocus.edufocus.board.entity.vo.Board;
import com.edufocus.edufocus.board.entity.vo.Comment;
import com.edufocus.edufocus.board.service.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * @author Haneol Kim
 */
@RestController("/board")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService){
        this.boardService = boardService;
    }

    @GetMapping()
    public ResponseEntity<?> searchBoards(
            @RequestParam(value = "category", required = false, defaultValue = "announcement") String category,
            @RequestParam(value = "lectureId", required = true) long lectureId,
            @RequestParam(value = "pageNo", required = false, defaultValue = "0") int pageNo
    ){
        List<Board> boards = boardService.findBoards(pageNo, category, lectureId);

        if(boards.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(boards);
    }

    @GetMapping(value = "/{boardId}")
    public ResponseEntity<?> getBoardDetail(
            @PathVariable @Positive int boardId
    ){
        Board responseBoardDetail = boardService.findBoardDetail(boardId);

        return ResponseEntity.ok(responseBoardDetail);
    }

    @PostMapping
    public ResponseEntity<?> addBoard(
            @RequestBody RequestBoardDto requestBoardDto,
            HttpServletRequest request
    ){

        long userId = Long.parseLong(request.getHeader("Authentication"));

        boardService.createBoard(userId, requestBoardDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/{boardId}")
    public ResponseEntity<?> updateBoard(
            @PathVariable @Positive long boardId,
            @RequestBody RequestBoardUpdateDto requestBoardUpdateDto,
            HttpServletRequest request
    ){
        long userId = Long.parseLong(request.getHeader("Authentication"));

        boardService.updateBoard(boardId, requestBoardUpdateDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/{boardId}")
    public ResponseEntity<?> deleteBoard(
            @PathVariable int boardId,
            HttpServletRequest request
    ){
        boardService.deleteBoard(boardId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/comment/{boardId}")
    public ResponseEntity<?> getComments(
            @PathVariable @Positive int boardId,
            HttpServletRequest request
    ){
        long userId = Long.parseLong(request.getHeader("Authentication"));

        List<Comment> comments = boardService.findComments(userId, boardId);

        return ResponseEntity.ok(comments);
    }

    @PostMapping(value = "/comment/{boardId}")
    public ResponseEntity<?> addComment(
            @PathVariable @Positive int boardId,
            @RequestParam String content,
            HttpServletRequest request
    ){
        long userId = Long.parseLong(request.getHeader("Authentication"));

        boardService.createComment(userId, boardId, content);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/comment/{commentId}")
    public ResponseEntity<?> updateComment(
            @PathVariable @Positive int commentId,
            @RequestParam String content,
            HttpServletRequest request
    ){
        long userId = Long.parseLong(request.getHeader("Authentication"));

        boardService.updateComment(commentId, content);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/comment/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable @Positive int commentId,
            HttpServletRequest request
    ){
        long userId = Long.parseLong(request.getHeader("Authentication"));

        boardService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
