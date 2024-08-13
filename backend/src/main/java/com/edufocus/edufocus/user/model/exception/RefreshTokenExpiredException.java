package com.edufocus.edufocus.user.model.exception;

public class RefreshTokenExpiredException  extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public RefreshTokenExpiredException() {
        super("REFRESH TOKEN 만료\n다시 로그인을 하세요.");
    }
}
