package com.edufocus.edufocus.qna.service;

import com.edufocus.edufocus.lecture.entity.Lecture;
import com.edufocus.edufocus.lecture.repository.LectureRepository;
import com.edufocus.edufocus.qna.entity.Qna;
import com.edufocus.edufocus.qna.entity.QnaRequestDto;
import com.edufocus.edufocus.qna.entity.QnaResponseDto;
import com.edufocus.edufocus.qna.repository.QnaRepository;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.user.model.entity.vo.UserRole;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService {

    private final QnaRepository qnaRepository;
    private final LectureRepository lectureRepository;
    private final UserRepository userRepository;


    @Override
    public QnaResponseDto createQna(Long id, QnaRequestDto qnaRequestDto, Long lecture_id) {


        Lecture lecture = lectureRepository.findById(lecture_id).orElse(null);

        User user = userRepository.findById(id).orElse(null);


        Qna qna = QnaRequestDto.toEntity(qnaRequestDto);

        qna.setLecture(lecture);
        qna.setUser(user);

        qna.setCreatedAt(new Date());

        qnaRepository.save(qna);
        return QnaResponseDto.toEntity(qna);
    }

    @Override
    public QnaResponseDto updateQna(Long id, QnaRequestDto qnaRequestDto, Long userId) {

        System.out.println("userId:" + userId);

        Qna findQna = qnaRepository.findById(id).orElse(null);
        System.out.println("quesiton에 있는거: " + findQna.getUser().getId());
        User user = userRepository.findById(userId).orElse(null);

        if (findQna.getUser().getId() != userId || user.getRole() != UserRole.STUDENT) {
            throw new RuntimeException();
        }


        findQna.setModifiedAt(new Date());
        findQna.setTitle(qnaRequestDto.getTitle());
        findQna.setContent(qnaRequestDto.getContent());

        qnaRepository.save(findQna);

        return QnaResponseDto.toEntity(findQna);


    }

    @Override
    public void deleteQna(Long id, Long userId) {

        Qna qna = qnaRepository.findById(id).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        if (qna.getUser().getId() == userId || user.getRole() == UserRole.ADMIN) {
            qnaRepository.delete(qna);
        } else {
            throw new RuntimeException();
        }

    }

    @Override
    public QnaResponseDto getQna(Long id, Long userId) {

        Qna qna;
        try {

            qna = qnaRepository.findById(id).orElse(null);


        } catch (Exception e) {

            throw new RuntimeException("Qna 없음 " + id, e);
        }

        QnaResponseDto dto = QnaResponseDto.builder()
                .id(qna.getId())
                .title(qna.getTitle())
                .username(qna.getUser().getName())
                .content(qna.getContent())
                .createtAt(qna.getCreatedAt())
                .answer(qna.getAnswer())
                .isMine(userId == qna.getUser().getId())
                .build();


        return dto;

    }

    @Override
    public List<QnaResponseDto> getAllQnasByLecture(Long lectureId, int pageSize) {

        Pageable pageable = PageRequest.of(0, pageSize);

        Page<Qna> qnaPage = qnaRepository.findByLectureId(lectureId, pageable);


        return qnaPage.getContent().stream()
                .map(QnaResponseDto::toEntity)
                .collect(Collectors.toList());

    }

    @Override
    public QnaResponseDto createAnswer(Long id, QnaRequestDto qnaRequestDto) throws SQLException {

        Qna findQna = qnaRepository.findById(id).orElse(null);
        if (findQna.getAnswer() != null) {
            throw new RuntimeException();
        }
        findQna.setAnswer(qnaRequestDto.getAnswer());


        qnaRepository.save(findQna);

        return QnaResponseDto.toEntity(findQna);

    }

    @Override
    public QnaResponseDto updateAnswer(Long id, QnaRequestDto qnaRequestDto) throws SQLException {

        Qna findQna = qnaRepository.findById(id).orElse(null);
        findQna.setAnswer(qnaRequestDto.getAnswer());


        qnaRepository.save(findQna);

        return QnaResponseDto.toEntity(findQna);
    }

    @Override
    public void deleteAnswer(Long id) throws SQLException {

        Qna findQna = qnaRepository.findById(id).orElse(null);
        findQna.setAnswer(null);
        qnaRepository.save(findQna);

    }
}
