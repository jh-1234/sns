package com.example.study.service;

import com.example.study.common.Session;
import com.example.study.dto.JoinDTO;
import com.example.study.dto.UserDTO;
import com.example.study.entity.User;
import com.example.study.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public void join(JoinDTO dto) {
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
        dto.setUserId(user.getUserId());
        dto.setName(user.getName());
        dto.setTel(user.getTel());
        dto.setEmail(user.getEmail());
        dto.setBirthday(user.getBirthday());
        dto.setGender(user.getGender());

        return dto;
    }
}
