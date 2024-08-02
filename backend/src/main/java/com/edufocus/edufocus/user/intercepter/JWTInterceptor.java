package com.edufocus.edufocus.user.intercepter;

import com.edufocus.edufocus.user.model.exception.UnAuthorizedException;
import com.edufocus.edufocus.user.util.JWTUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JWTInterceptor implements HandlerInterceptor {

    private final String HEADER_AUTH = "Authorization";

    private JWTUtil jwtUtil;

    public JWTInterceptor(JWTUtil jwtUtil) {
        super();
        this.jwtUtil = jwtUtil;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
        final String token = request.getHeader(HEADER_AUTH);

        jwtUtil.checkToken(token);

        return true;
    }
}