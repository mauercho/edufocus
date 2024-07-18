package com.edufocus.edufocus.quiz.entity;

import com.edufocus.edufocus.user.model.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class QuizSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String title;

    @Column
    private String image;

    @OneToMany(mappedBy = "quizSet")
    private List<Quiz> quizzes =  new ArrayList<Quiz>();

    public void addQuiz(Quiz quiz) {
        this.quizzes.add(quiz);

        if (quiz.getQuizSet() != this) {
            quiz.setQuizSet(this);
        }
    }
}
