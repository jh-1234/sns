package com.example.study.dto.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

    private Long seq;

    private String userId;

    private String name;

    private String tel;

    private String email;

    private LocalDate birthday;

    private String gender;

    private String profileUrl;

    private UUID uuid;
}
