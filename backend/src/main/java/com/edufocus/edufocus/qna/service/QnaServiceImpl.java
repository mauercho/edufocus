package com.edufocus.edufocus.qna.service;

import com.edufocus.edufocus.qna.entity.Qna;
import com.edufocus.edufocus.qna.repository.QnaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService{

    private final QnaRepository qnaRepository;


    @Override
    public void createQna(Long id,Qna qna) {


        qna.setId(id);
        qnaRepository.save(qna);

    }

    @Override
    public void updateQna(Long id,Qna qna) {


        Optional<Qna> findQna = qnaRepository.findById(id);

            qna.setModifiedAt(new Date());
            qnaRepository.save(qna);


    }

    @Override
    public void deleteQna(Long id) {
qnaRepository.deleteById(id);
    }

    @Override
    public Qna getQna(Long id) {
        return null;
    }

    @Override
    public List<Qna> getAllQnasByLecture(Long lectureId) {


        System.out.printf(lectureId+"!!!!!!!!!!!!!!!!!!!!!!");
        return qnaRepository.findLecture(lectureId);

    }
}
