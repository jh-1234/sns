package com.example.study.service;

import com.example.study.dto.auth.UserDTO;
import com.example.study.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDTO> getUsers() {
        return userRepository.getUsers();
    }
}
