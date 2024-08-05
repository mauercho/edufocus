package com.edufocus.edufocus.quiz.repository;

import com.edufocus.edufocus.quiz.entity.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoiceRepository extends JpaRepository<Choice, Long> {
}
