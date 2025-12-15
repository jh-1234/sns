package com.example.study.common;

import com.example.study.entity.User;
import com.example.study.security.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Objects;

public final class Session {

    private Session() {
    }

    public static User getSession() {
        CustomUserDetails principal = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return Objects.requireNonNull(principal).getUser();
    }
}
