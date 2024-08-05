package com.edufocus.edufocus.user.controller;

import com.edufocus.edufocus.user.model.entity.dto.InfoDto;
import com.edufocus.edufocus.user.model.entity.dto.PasswordDto;
import com.edufocus.edufocus.user.model.entity.dto.RequestJoinDto;
import com.edufocus.edufocus.user.model.entity.vo.User;
import com.edufocus.edufocus.user.model.exception.InvalidTokenException;
import com.edufocus.edufocus.user.model.service.UserService;
import com.edufocus.edufocus.user.util.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public ResponseEntity<String> join(@RequestBody RequestJoinDto requestJoinDto){

        if(userService.isUserIdExist(requestJoinDto.getUserId()))
            return new ResponseEntity<>("아이디가 중복 됐습니다.", HttpStatus.CONFLICT);

        userService.join(requestJoinDto);

        return ResponseEntity.ok("User registered successfully");
    }

    @PutMapping("/updateinfo")
    public ResponseEntity<String> updateUserInfo(@RequestBody InfoDto infoDto, HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        Long userId = Long.parseLong(jwtUtil.getUserId(token));

        userService.changeUserInfo(infoDto, userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 비밀번호 변경
    @PutMapping("/updatepassword")
    public ResponseEntity<String> updatePassword(@RequestBody PasswordDto passwordDto, HttpServletRequest request) {
        try {
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

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        User loginUser = userService.login(user);
        if (loginUser == null)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        String accessToken = jwtUtil.createAccessToken(String.valueOf(loginUser.getId()));
        String refreshToken = jwtUtil.createRefreshToken(String.valueOf(loginUser.getId()));

        userService.saveRefreshToken(loginUser.getId(), refreshToken);

        resultMap.put("name",loginUser.getName());
        resultMap.put("role",loginUser.getRole());
        resultMap.put("access-token", accessToken);

        setCookies(response, refreshToken);

        status = HttpStatus.CREATED;


        return new ResponseEntity<>(resultMap, status);
    }


    @PostMapping("/logout")
    public ResponseEntity<?> removeToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        Long userId = Long.parseLong(jwtUtil.getUserId(token));

        userService.deleteRefreshToken(userId);

        return new ResponseEntity<Map<String, Object>>(HttpStatus.ACCEPTED);
    }

    @Operation(summary = "Access Token 재발급", description = "만료된 access token 을 재발급 받는다.")
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request,HttpServletResponse response) {
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

        setCookies(response, refreshToken);

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


    private void setCookies(HttpServletResponse response, String refreshToken){
        Cookie refreshCookie = new Cookie("refresh-token", refreshToken);
        refreshCookie.setPath("/");
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        response.addCookie(refreshCookie);
    }


}