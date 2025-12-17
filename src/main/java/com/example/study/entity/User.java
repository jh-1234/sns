package com.example.study.entity;

import com.example.study.converter.BooleanConverter;
import com.example.study.entity.auditing.TimeEntity;
import com.example.study.util.CommonUtils;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "TBL_USER")
@Getter
@Setter
public class User extends TimeEntity {

    @PrePersist
    public void init() {
        telClean = CommonUtils.telClean(tel);
        isDeleted = false;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long seq;

    @NotBlank
    private String userId;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    @NotBlank
    private String tel;

    @NotBlank
    @Setter(AccessLevel.NONE)
    private String telClean;

    private String email;

    @NotNull
    private LocalDate birthday;

    @NotBlank
    private String gender;

    @NotBlank
    @Convert(converter = BooleanConverter.class)
    @Column(name = "DEL_YN")
    private Boolean isDeleted;
}
