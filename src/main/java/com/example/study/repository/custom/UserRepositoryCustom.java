package com.example.study.repository.custom;

import com.example.study.dto.auth.UserDTO;

import java.util.List;

public interface UserRepositoryCustom {

    List<UserDTO> getUsers();
}
