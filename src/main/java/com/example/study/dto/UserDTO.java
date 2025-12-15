package com.example.study.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

    private String userId;

    private String name;

    private String tel;

    private String email;

    private LocalDate birthday;

    private String gender;
}
