package com.example.study.repository;

import com.example.study.dto.UserDTO;

import java.util.List;

public interface UserRepositoryCustom {

    List<UserDTO> getUsers();
}
