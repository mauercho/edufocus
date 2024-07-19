package com.edufocus.edufocus.board.repository;

import com.edufocus.edufocus.board.entity.vo.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface BoardRepository extends JpaRepository<Board, Long> {

    @Query("select b from Board b join fetch b.user where b.category =:category and b.lecture.id=:lectureId")
    Page<Board> findByLectureIdAndCategory(Long lectureId, String category, Pageable pageable);

}
