package com.example.study.service;

import com.example.study.dto.JoinDTO;
import com.example.study.dto.UserDTO;
import com.example.study.entity.User;
import com.example.study.repository.UserRepository;
import com.example.study.util.CustomException;
import com.example.study.util.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public void join(JoinDTO dto) {
        if (existsByUserId(dto.getUserId())) {
            throw new CustomException("아이디가 중복되었습니다.");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setUserId(dto.getUserId());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setTel(dto.getTel());
        user.setEmail(dto.getEmail());
        user.setBirthday(dto.getBirthday());
        user.setGender(dto.getGender());

        userRepository.save(user);
    }

    public UserDTO getSession() {
        User user = Session.getSession();

        UserDTO dto = new UserDTO();
        dto.setSeq(user.getSeq());
        dto.setUserId(user.getUserId());
        dto.setName(user.getName());
        dto.setTel(user.getTel());
        dto.setEmail(user.getEmail());
        dto.setBirthday(user.getBirthday());
        dto.setGender(user.getGender());

        return dto;
    }

    private Boolean existsByUserId(String userId) {
        return userRepository.existsByUserId(userId);
    }
}
