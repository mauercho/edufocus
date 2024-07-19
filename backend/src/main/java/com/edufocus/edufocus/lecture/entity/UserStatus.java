package com.edufocus.edufocus.lecture.entity;

public enum UserStatus {
    MANAGED_BY_ME,           // 내가 관리하는 강의 - 강사
    MANAGED_BY_OTHERS,       // 내가 관리하지 않은 강의 - 강사
    ENROLLED,                // 내가 수강 중인 강의 - 학생
    PENDING,                 // 내가 수강신청하고 승인 대기 중인 강의 - 학생
    NOT_ENROLLED             // 내가 수강신청하지 않은 강의 - 학생/비로그인
}
