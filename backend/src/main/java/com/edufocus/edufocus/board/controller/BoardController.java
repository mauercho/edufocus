package com.edufocus.edufocus.board.controller;

import com.edufocus.edufocus.board.entity.dto.RequestBoardDetailDto;
import com.edufocus.edufocus.board.entity.dto.RequestCommentDto;
import com.edufocus.edufocus.board.entity.dto.ResponseBoardDetailDto;
import com.edufocus.edufocus.board.entity.dto.ResponseBoardDto;
import com.edufocus.edufocus.board.entity.vo.Comment;
import com.edufocus.edufocus.board.service.BoardService;
import jakarta.validation.constraints.Positive;
import org.springframework.data.domain.Pageable;
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
            Pageable pageable,
            @RequestParam(value = "userId", required = true) int userId
    ){

        if(boardService.checkRegistration(userId, lectureId)){
            throw new RuntimeException();
        }

        List<ResponseBoardDto> boards = boardService.findBoards(userId, category, lectureId);

        if(boards.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(boards);
    }

    @GetMapping(value = "/{boardId}")
    public ResponseEntity<?> getBoardDetail(
            @PathVariable @Positive int boardId,
            @RequestParam(value = "userId", required = true) @Positive int userId
    ){
        ResponseBoardDetailDto responseBoardDetail = boardService.findBoardDetail(userId, boardId);

        return ResponseEntity.ok(responseBoardDetail);
    }

    @PostMapping
    public ResponseEntity<?> addBoard(
            @RequestBody RequestBoardDetailDto requestBoardDetailDto,
            @RequestParam(value = "userId", required = true) @Positive int userId
    ){
        if(boardService.checkRegistration(userId, requestBoardDetailDto.getLectureId())){
            throw new RuntimeException();
        }

        boardService.createBoard(userId, requestBoardDetailDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/{boardId}")
    public ResponseEntity<?> updateBoard(
            @PathVariable @Positive int boardId,
            @RequestBody RequestBoardDetailDto requestBoardDetailDto,
            @RequestParam(value = "userId", required = true) @Positive int userId
    ){
        if(boardService.checkRegistration(userId, requestBoardDetailDto.getLectureId())){
            throw new RuntimeException();
        }

        boardService.createBoard(userId, requestBoardDetailDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/{boardId}")
    public ResponseEntity<?> deleteBoard(
            @PathVariable int boardId,
            @RequestParam @Positive int userId
    ){
        if(boardService.checkBoardOwner(userId, boardId)){
            throw new RuntimeException();
        }

        boardService.deleteBoard(boardId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/comment/{boardId}")
    public ResponseEntity<?> getComments(
            @PathVariable @Positive int boardId,
            @RequestParam @Positive int userId
    ){
        List<Comment> comments = boardService.findComments(userId, boardId);

        return ResponseEntity.ok(comments);
    }

    @PostMapping(value = "/comment/{boardId}")
    public ResponseEntity<?> addComment(
            @PathVariable @Positive int boardId,
            @RequestParam int userId,
            @RequestBody RequestCommentDto requestCommentDto
    ){
        boardService.createComment(userId, boardId, requestCommentDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/comment/{commentId}")
    public ResponseEntity<?> updateComment(
            @RequestParam int userId,
            @PathVariable @Positive int commentId,
            @RequestBody RequestCommentDto requestCommentDto
    ){
        boardService.checkCommentOwner(userId, commentId);

        boardService.updateComment(commentId, requestCommentDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/comment/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable @Positive int commentId,
            @RequestParam int userId
    ){
        boardService.checkCommentOwner(userId, commentId);

        boardService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
