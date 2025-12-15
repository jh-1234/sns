package com.example.study.security;

import com.example.study.dto.UserDTO;
import com.example.study.entity.User;
import com.example.study.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.PrintWriter;

@Component
@Transactional
@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter writer = response.getWriter();

        User user = ((CustomUserDetails) authentication.getPrincipal()).getUser();

        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setName(user.getName());
        dto.setTel(user.getTel());
        dto.setEmail(user.getEmail());
        dto.setBirthday(user.getBirthday());
        dto.setGender(user.getGender());

        writer.write(objectMapper.writeValueAsString(dto));

        response.setStatus(HttpServletResponse.SC_OK);

        writer.flush();
        writer.close();
    }
}