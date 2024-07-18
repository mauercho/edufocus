package com.edufocus.edufocus.user.controller;

import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.service.UserService;
import com.edufocus.edufocus.user.util.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.HttpServletRequest;
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
public class UserController {

    private final UserService userService;
    private final JWTUtil jwtUtil;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody User user) throws Exception {


        userService.join(user);
        return ResponseEntity.ok("User registered successfully");
    }

//
//    @PostMapping("/login")
//    public ResponseEntity<User> login(@RequestBody User user) {
//        try {
//            User loggedInUser = userService.login(user);
//            return ResponseEntity.ok(loggedInUser);
//
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
 //   }

    @Operation(summary = "로그인", description = "아이디와 비밀번호를 이용하여 로그인 처리.")
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody @Parameter(description = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) User user) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            User loginUser = userService.login(user);
            if (loginUser != null) {
                String accessToken = jwtUtil.createAccessToken(String.valueOf(loginUser.getId()));
                String refreshToken = jwtUtil.createRefreshToken(String.valueOf(loginUser.getId()));

                // 발급받은 refresh token 을 DB에 저장.
                userService.saveRefreshToken(loginUser.getId(), refreshToken);

                // JSON 으로 token 전달.
                System.out.println(accessToken);
                resultMap.put("access-token", accessToken);
                resultMap.put("refresh-token", refreshToken);

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

    @Operation(summary = "회원인증", description = "회원 정보를 담은 Token 을 반환한다.")
    @GetMapping("/info/{userId}")
    public ResponseEntity<Map<String, Object>> getInfo(
            @PathVariable("userId") @Parameter(description = "인증할 회원의 아이디.", required = true) Long userId,
            HttpServletRequest request) {
		//logger.debug("userId : {} ", userId);
        String id = String.valueOf(userId);

        System.out.println("!>>>>>>>>>>>>>>>>>>>>>>>>");
        System.out.println(id);
        System.out.println(id.getClass().getName());
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        if (jwtUtil.checkToken(request.getHeader("Authorization"))) {
            log.info("사용 가능한 토큰!!!");
            try {
//				로그인 사용자 정보.
                User member = userService.userInfo(userId);
                resultMap.put("userInfo", member);
                status = HttpStatus.OK;
            } catch (Exception e) {
                log.error("정보조회 실패 : {}", e);
                resultMap.put("message", e.getMessage());
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        } else {
            System.out.println(jwtUtil.checkToken(request.getHeader("Authorization")));
            log.error("사용 불가능 토큰!!!");
            resultMap.put("message", "Unauthorized token");
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @GetMapping("/logout/{userId}")

    public ResponseEntity<?> removeToken(@PathVariable ("userId") @Parameter(description = "로그아웃 할 회원의 아이디.", required = true) Long userId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            userService.deleteRefreshToken(userId);
            status = HttpStatus.OK;
        } catch (Exception e) {
            log.error("로그아웃 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "Access Token 재발급", description = "만료된 access token 을 재발급 받는다.")
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody User user, HttpServletRequest request)
            throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        String token = request.getHeader("refreshToken");
        log.debug("token : {}, memberDto : {}", token, user);
        if (jwtUtil.checkToken(token)) {
            if (token.equals(userService.getRefreshToken(user.getId()))) {
                String accessToken = jwtUtil.createAccessToken(String.valueOf(user.getId()));
                log.debug("token : {}", accessToken);
                log.debug("정상적으로 access token 재발급!!!");
                resultMap.put("access-token", accessToken);
                status = HttpStatus.CREATED;
            }
        } else {
            log.debug("refresh token 도 사용 불가!!!!!!!");
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "회원 정보 조회", description = "토큰을 이용하여 회원 정보를 조회한다.")
    @GetMapping("/member")
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
