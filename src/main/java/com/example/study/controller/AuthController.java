package com.example.study.controller;

import com.example.study.dto.auth.JoinDTO;
import com.example.study.dto.auth.UserDTO;
import com.example.study.dto.auth.UserInfoDTO;
import com.example.study.security.CustomUserDetails;
import com.example.study.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/api/csrf-token")
    public ResponseEntity<String> getCsrfToken(CsrfToken csrfToken) {
        return ResponseEntity.ok(csrfToken.getToken());
    }

    @PostMapping("/api/join")
    public ResponseEntity<HttpStatus> join(@RequestBody @Valid JoinDTO dto) {
        authService.join(dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/session")
    public ResponseEntity<UserDTO> session() {
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

    @GetMapping("/api/user-info/{uuid}")
    public ResponseEntity<UserDTO> userInfo(@PathVariable("uuid") UUID uuid) {
        UserDTO user = authService.getUserInfo(uuid);

        return ResponseEntity.ok(user);
    }

    @PatchMapping("/api/user-info")
    public ResponseEntity<UserDTO> userInfoUpdate(@RequestPart("data") @Valid UserInfoDTO dto, @RequestPart(name = "image", required = false) MultipartFile image) {
        authService.userInfoUpdate(dto, image);
        UserDTO user = authService.getNewSession();

        return ResponseEntity.ok(user);
    }
}
