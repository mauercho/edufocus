package com.edufocus.edufocus.user.controller;

import com.edufocus.edufocus.user.model.entity.InfoDto;
import com.edufocus.edufocus.user.model.entity.PasswordDto;
import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.exception.ExpriedTokenException;
import com.edufocus.edufocus.user.model.exception.InvalidTokenException;
import com.edufocus.edufocus.user.model.exception.RefreshTokenExpiredException;
import com.edufocus.edufocus.user.model.exception.UnAuthorizedException;
import com.edufocus.edufocus.user.model.service.UserService;
import com.edufocus.edufocus.user.util.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class UserController {

    private final UserService userService;
    private final JWTUtil jwtUtil;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody User user) throws Exception {
        userService.join(user);
        return ResponseEntity.ok("User registered successfully");
    }
//    @PostMapping("/findpassword/{user_id}")
//    public ResponseEntity<String> findpassword(@PathVariable("user_id") Long user_id) throws Exception {
//        userService.userCheck(user_id);
//        return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
//    }

    @PutMapping("/updateinfo")
    public ResponseEntity<String> updateUserInfo(
            @RequestBody InfoDto infoDto, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization");
            Long userId = Long.parseLong(jwtUtil.getUserId(token));
            userService.changeUserInfo(infoDto, userId);
            return ResponseEntity.ok("User info updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 비밀번호 변경
    @PutMapping("/updatepassword")
    public ResponseEntity<String> updatePassword(@RequestBody PasswordDto passwordDto, HttpServletRequest request) {
        try
        {
            String token = request.getHeader("Authorization");
            Long userId = Long.parseLong(jwtUtil.getUserId(token));

            userService.changePassword(passwordDto, userId);
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @Operation(summary = "로그인", description = "아이디와 비밀번호를 이용하여 로그인 처리.")
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody @Parameter(description = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) User user, HttpServletRequest request, HttpServletResponse response) {

        String token = request.getHeader("Authorization");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            User loginUser = userService.login(user);
            if (loginUser != null) {


                String accessToken = jwtUtil.createAccessToken(String.valueOf(loginUser.getId()));
                String refreshToken = jwtUtil.createRefreshToken(String.valueOf(loginUser.getId()));

                userService.saveRefreshToken(loginUser.getId(), refreshToken);

                resultMap.put("name",loginUser.getName());
                resultMap.put("role",loginUser.getRole());
                resultMap.put("access-token", accessToken);

                Cookie refreshCookie = new Cookie("refresh-token", refreshToken);
                refreshCookie.setPath("/");
                refreshCookie.setHttpOnly(true);
                refreshCookie.setSecure(true); // HTTPS에서만 전송되도록 설정
                //refreshCookie.setSameSite(Cookie.SameSite.NONE); // Cross-Origin 요청에 대해 모두 전송
                //refreshCookie.setSameSite("None"); // Cross-Origin 요청에 대해 모두 전송

                String cookieHeader = String.format("refresh-token=%s; Path=/; HttpOnly; Secure; SameSite=None", refreshToken);
                response.setHeader("Set-Cookie", cookieHeader);

                //  refreshCookie.setSameSite("None"); // Cross-Origin 요청에 대해 모두 전송
                response.addCookie(refreshCookie);

                status = HttpStatus.CREATED;
            } else {
                resultMap.put("message", "아이디 또는 패스워드를 확인해 주세요.");
                status = HttpStatus.UNAUTHORIZED;
            }
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }


    @PostMapping("/logout")
    public ResponseEntity<?> removeToken(HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {

            String token = request.getHeader("Authorization");
            Long userId = Long.parseLong(jwtUtil.getUserId(token));

            userService.deleteRefreshToken(userId);
            status = HttpStatus.OK;
        } catch (Exception e) {
            log.error("로그아웃 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "Access Token 재발급", description = "만료된 access token 을 재발급 받는다.")
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request,HttpServletResponse response)
            throws Exception {
        Cookie[] cookies = request.getCookies();
        String token = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh-token")) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        try{
            jwtUtil.checkToken(token);
        }catch (Exception e){
            throw new InvalidTokenException();
        }

        Long userId = Long.parseLong(jwtUtil.getUserId(token));

        if (!token.equals(userService.getRefreshToken(userId))) {
            throw new InvalidTokenException();
        }


        String accessToken = jwtUtil.createAccessToken(String.valueOf(userId));
        String refreshToken = jwtUtil.createRefreshToken(String.valueOf(userId));


        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("access-token", accessToken);

        userService.saveRefreshToken(userId,refreshToken);

        Cookie refreshCookie = new Cookie("refresh-token", refreshToken);
        refreshCookie.setPath("/");
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        response.addCookie(refreshCookie);

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.CREATED);
    }

    @Operation(summary = "회원 정보 조회", description = "토큰을 이용하여 회원 정보를 조회한다.")
    @GetMapping("/userinfo")
    public ResponseEntity<Map<String, Object>> getMember(HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        String token = request.getHeader("Authorization");

        if (jwtUtil.checkToken(token)) {
            String userId = jwtUtil.getUserId(token);
            log.info("사용 가능한 토큰!!! userId: {}", userId);
            try {
                User user = userService.userInfo(Long.parseLong(userId));
                resultMap.put("userInfo", user);
                status = HttpStatus.OK;

            } catch (Exception e) {
                log.error("정보조회 실패 : {}", e);
                resultMap.put("message", e.getMessage());
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        } else {
            log.error("사용 불가능 토큰!!!");
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }





}