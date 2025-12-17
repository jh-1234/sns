package com.example.study.controller;

import com.example.study.dto.JoinDTO;
import com.example.study.dto.UserDTO;
import com.example.study.security.CustomUserDetails;
import com.example.study.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/api/csrf-token")
    public ResponseEntity<String> getCsrfToken(CsrfToken csrfToken) {
        return ResponseEntity.ok(csrfToken.getToken());
    }

    @PostMapping("/api/join")
    public ResponseEntity<Map<String, String>> join(@RequestBody @Valid JoinDTO dto) {
        authService.join(dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/session-check")
    public ResponseEntity<UserDTO> sessionCheck() {
        try {
            CustomUserDetails principal = (CustomUserDetails) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();

            if (Objects.isNull(Objects.requireNonNull(principal).getUser()) || Objects.isNull(principal.getUser().getSeq())) {
                return null;
            }
        } catch (Exception e) {
            return null;
        }

        UserDTO session = authService.getSession();

        return ResponseEntity.ok(session);
    }
}
