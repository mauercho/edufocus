package com.edufocus.edufocus.board.repository;

import com.edufocus.edufocus.board.entity.vo.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findByLectureIdAndCategory(Long lectureId, String category, Pageable pageable);

}
