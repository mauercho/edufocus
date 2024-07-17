package com.edufocus.edufocus.qna.controller;

import com.edufocus.edufocus.qna.entity.Qna;
import com.edufocus.edufocus.qna.service.QnaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/qna")
@Slf4j
@RequiredArgsConstructor
public class QnaController {
    private final QnaService qnaService;


    @PostMapping
    public ResponseEntity<Qna> createQna(@RequestBody Qna qna) {
        try{
            qnaService.createQna(qna);
            return new ResponseEntity<>(qna, HttpStatus.CREATED);

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Qna> updateQna(@PathVariable Long id, @RequestBody Qna qna) {

        try{
             qnaService.updateQna(id,qna);
            return new ResponseEntity<>(qna, HttpStatus.ACCEPTED);

        }catch (Exception e)
        {
            throw new RuntimeException(e);        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Qna> deleteQna(@PathVariable Long id) {
        try {
            qnaService.deleteQna(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Qna> getQna(@PathVariable Long id) {
        try{
           Qna findQna= qnaService.getQna(id);
            return new ResponseEntity<>(findQna, HttpStatus.ACCEPTED);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<List<Qna>> getAllQna(@PathVariable Long id) {
        try {

            System.out.print("@@@@@@@@@@@@@@@@@@@@@@@>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            List<Qna> qnaList= qnaService.getAllQnasByLecture(id);
            for(Qna qna:qnaList)
            {
                System.out.print(qna.toString());
            }
            return new ResponseEntity<>(qnaList, HttpStatus.ACCEPTED);
        } catch (SQLException e) {
            throw new RuntimeException(e);

        }
    }
}
