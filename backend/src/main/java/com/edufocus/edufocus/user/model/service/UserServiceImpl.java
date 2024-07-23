package com.edufocus.edufocus.user.model.service;


import com.edufocus.edufocus.user.model.entity.MailDto;
import com.edufocus.edufocus.user.model.entity.MemberChangeDto;
import com.edufocus.edufocus.user.model.entity.User;
import com.edufocus.edufocus.user.model.exception.UserException;
import com.edufocus.edufocus.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{


    private final UserRepository userRepository;
    private final JavaMailSender mailSender;



    public void join(User user)
    {
        userRepository.save(user);
    }


    public User login(User user) throws SQLException
    {
        Optional<User> findUser = userRepository.findByUserId(user.getUserId());


        if(findUser.isEmpty())
        {
            throw new UserException("없는 유저");

        }


        if(findUser.isPresent())
        {

            User find = findUser.get();
            if(find.getPassword().equals(user.getPassword()))
            {
                return find;
            }
            else{
                throw new UserException("비밀번호 틀림");

            }
        }
        else{
            throw new UserException("없는 유저");


        }

    }

    @Override
    public User userInfo(Long id)
    {
        try{
            return userRepository.findById(id).get();
        }
        catch (Exception e)
        {
            throw new UserException(e.getMessage());
        }

    }

    @Override
    public void sendEamail(User user) throws Exception {
        MailDto mailDto = createMailAndChargePassword(user);

        System.out.println("이메일 전송 완료");
        SimpleMailMessage message = new SimpleMailMessage();



        message.setTo(mailDto.getAddress());
        message.setFrom("passfinder111@gmail.com");
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getMessage());
        System.out.println("!!!!!!!!!!!!!!!!!!"+ message);

        mailSender.send(message);


    }

    public MailDto createMailAndChargePassword(User user) throws SQLException {
        String str = getTempPassword();
        MailDto dto = new MailDto();
        dto.setAddress(user.getEmail());
        dto.setTitle(user.getUserId()+"님의 임시비밀번호 안내 이메일 입니다.");
        dto.setMessage("안녕하세요. EduFoucs 입니다.  "+ "\n"+ "임시비밀번호 안내 관련 메일 입니다." + "\n[" + user.getName() + "]" + "님의 임시 비밀번호는 "
                + str + " 입니다.");

        System.out.println(dto);

        MemberChangeDto memberChangeDto = new MemberChangeDto(user.getId(),str);
        System.out.println(memberChangeDto);
        userRepository.updatePassword(memberChangeDto.getId(),memberChangeDto.getPassword());
        System.out.println();

        return dto;
    }

    @Override
    public void userCheck(Long id) throws Exception {

        User user = userRepository.findById(id).orElse(null);


        if(user == null)
        {
            System.out.println("불가");
            throw new RuntimeException("유효하지 않은 아이디입니다. 다시 입력하세요");

        }
        else {

            sendEamail(user);
        }
    }
    public String getTempPassword() {
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
        String str = "";

        int idx = 0;
        for (int i=0; i<10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }
    @Override
    public void saveRefreshToken(Long id, String refreshToken) throws Exception {
        userRepository.saveRefreshToken(id, refreshToken);
    }

    @Override
    public String getRefreshToken(Long id) throws Exception {
        return userRepository.getRefreshToken(id);
    }

    @Override
    public void deleteRefreshToken(Long id) throws Exception {
        userRepository.deleteRefreshToken(id);
    }

}
