package com.edufocus.edufocus.quiz.entity;

import com.edufocus.edufocus.user.model.entity.vo.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @Column
    private String title;

    @Column
    private boolean tested;

    @OneToMany(mappedBy = "quizSet", orphanRemoval = true)
    @JsonManagedReference
    private List<Quiz> quizzes;

    public void addQuiz(Quiz quiz) {
        this.quizzes.add(quiz);

        if (quiz.getQuizSet() != this) {
            quiz.setQuizSet(this);
        }
    }
}
