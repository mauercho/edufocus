package com.edufocus.edufocus.quiz.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "quizset_id")
    @JsonBackReference
    private QuizSet quizSet;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String answer;

    @Column (name = "is_single")
    private boolean isSingle;

    @Column
    private String image;

    @Column
    private String choice1;

    @Column
    private String choice2;

    @Column
    private String choice3;

    @Column
    private String choice4;

    public void setQuizSet(QuizSet quizSet) {
        this.quizSet = quizSet;

        if (!quizSet.getQuizzes().contains(this)) {
            quizSet.getQuizzes().remove(this);
        }
    }
}
