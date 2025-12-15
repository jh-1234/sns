package com.example.study.dto;

import com.example.study.common.CommonUtils;
import com.example.study.enums.ValidationType;
import com.example.study.valid.CustomValidation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class JoinDTO {

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "이름", min = 1, max = 15, nullable = false)
    private String name;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "아이디", min = 6, max = 20, nullable = false, checkType = ValidationType.ALPHA_NUMERIC)
    private String userId;

    @CustomValidation(name = "비밀번호", min = 8, max = 100, nullable = false, checkType = ValidationType.PASSWORD)
    private String password;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "연락처", min = 1, max = 15, nullable = false, checkType = ValidationType.TEL)
    private String tel;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "E-Mail", max = 50, checkType = ValidationType.EMAIL)
    private String email;

    @NotNull(message = "생년월일을 선택해주세요.")
    private LocalDate birthday;

    @NotBlank
    private String gender;

    public void setName(String name) {
        this.name = CommonUtils.strip(name);
    }

    public void setUserId(String userId) {
        this.userId = CommonUtils.strip(userId);
    }

    public void setTel(String tel) {
        this.tel = CommonUtils.strip(tel);
    }

    public void setEmail(String email) {
        this.email = CommonUtils.strip(email);
    }
}
