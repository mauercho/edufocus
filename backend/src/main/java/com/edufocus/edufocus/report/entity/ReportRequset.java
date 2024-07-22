package com.edufocus.edufocus.report.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReportRequset {


    private Long userId;
    private Long quizsetId;
    List<AnswerInput> answerInputList;


//    List<answerDto> a
//    userID :
//    quizSetId :
//    answerList : [
//    { ans1 : 1},
//    {ans2 : 2}
//            ]
}
