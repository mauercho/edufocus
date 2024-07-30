//package com.edufocus.edufocus.user;
//
//import com.edufocus.edufocus.user.controller.UserController;
//import com.edufocus.edufocus.user.model.entity.InfoDto;
//import com.edufocus.edufocus.user.model.entity.PasswordDto;
//import com.edufocus.edufocus.user.model.entity.User;
//import com.edufocus.edufocus.user.model.entity.UserRole;
//import com.edufocus.edufocus.user.model.service.UserService;
//import com.edufocus.edufocus.user.util.JWTUtil;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//
//@WebMvcTest(UserController.class)
//public class UserControllerTest {
//
//    @Mock
//    private MockMvc mockMvc;
//
//    @Autowired
//    ObjectMapper mapper;
//    @Mock
//    private UserService userService;
//
//    @Mock
//    private JWTUtil jwtUtil;
//
//    @InjectMocks
//    private UserController userController;
//
//    private User testUser;
//    private InfoDto testInfo;
//    private PasswordDto passwordDto;
//    private UserRole userRole;
//    @BeforeEach
//    void setUp()
//    {
//        MockitoAnnotations.openMocks(this);
//
//    }
////    @Test
////    void testjoin() throws Exception
////    {
////
////        User user = new User();
////        user.setId(1L);
////        user.setName("jungmin");
////        user.setUserId("v_v");
////        user.setRole(userRole.STUDENT);
////        user.setPassword("pwd");
////        user.setEmail("wjdals231@naver.com");
////
////        String body= mapper.writeValueAsString(
////                UserRe
////        )
////
////        mockMvc.perform(post("/api/user/join")
////                .contentType(MediaType.APPLICATION_JSON)
////                .
////
////                //
////
////    }
//}
