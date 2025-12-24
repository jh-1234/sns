package com.example.study.service;

import com.example.study.dto.JoinDTO;
import com.example.study.dto.UserDTO;
import com.example.study.dto.UserInfoDTO;
import com.example.study.entity.File;
import com.example.study.entity.User;
import com.example.study.enums.FileModuleType;
import com.example.study.repository.UserRepository;
import com.example.study.security.CustomUserDetails;
import com.example.study.util.CustomException;
import com.example.study.util.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final FileService fileService;

    public void join(JoinDTO dto) {
        if (existsByUserId(dto.getUserId())) {
            throw new CustomException("아이디가 중복되었습니다.");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setUserId(dto.getUserId());
        user.setUuid(UUID.randomUUID());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setTel(dto.getTel());
        user.setEmail(dto.getEmail());
        user.setBirthday(dto.getBirthday());
        user.setGender(dto.getGender());

        userRepository.save(user);
    }

    public UserDTO getSession() {
        User user = Session.getSession();

        UserDTO dto = new UserDTO();
        dto.setSeq(user.getSeq());
        dto.setUserId(user.getUserId());
        dto.setName(user.getName());
        dto.setTel(user.getTel());
        dto.setEmail(user.getEmail());
        dto.setBirthday(user.getBirthday());
        dto.setGender(user.getGender());
        dto.setUuid(user.getUuid());

        if (Objects.nonNull(user.getProfile())) {
            dto.setProfileUrl(user.getProfile().getFileLoadPath());
        }

        return dto;
    }

    public UserDTO getNewSession() {
        User user = findBySeq(Session.getSession().getSeq()).orElseThrow();

        UserDTO dto = new UserDTO();
        dto.setSeq(user.getSeq());
        dto.setUserId(user.getUserId());
        dto.setName(user.getName());
        dto.setTel(user.getTel());
        dto.setEmail(user.getEmail());
        dto.setBirthday(user.getBirthday());
        dto.setGender(user.getGender());
        dto.setUuid(user.getUuid());

        if (Objects.nonNull(user.getProfile())) {
            dto.setProfileUrl(user.getProfile().getFileLoadPath());
        }

        return dto;
    }

    private Boolean existsByUserId(String userId) {
        return userRepository.existsByUserId(userId);
    }

    public UserDTO getUserInfo(UUID uuid) {
        return userRepository.findByUuid(uuid).map(user -> {
            UserDTO dto = new UserDTO();
            dto.setSeq(user.getSeq());
            dto.setUserId(user.getUserId());
            dto.setName(user.getName());
            dto.setTel(user.getTel());
            dto.setEmail(user.getEmail());
            dto.setBirthday(user.getBirthday());
            dto.setGender(user.getGender());

            if (Objects.nonNull(user.getProfile())) {
                dto.setProfileUrl(user.getProfile().getFileLoadPath());
            }

            return dto;
        }).orElseThrow();
    }

    public void userInfoUpdate(UserInfoDTO dto, MultipartFile image) {
        User user = findBySeq(Session.getSession().getSeq()).orElseThrow();
        user.setName(dto.getName());
        user.setTel(dto.getTel());
        user.setEmail(dto.getEmail());
        user.setBirthday(dto.getBirthday());
        user.setGender(dto.getGender());

        if (StringUtils.hasText(dto.getPassword())) {
            user.setPassword(dto.getPassword());
        }

        if (Objects.nonNull(image)) {
            if (Objects.nonNull(user.getProfile())) {
                fileService.remove(user.getProfile().getFileId());
            }

            File saveFile = fileService.save(image, FileModuleType.PROFILE, Session.getSession().getSeq());

            user.setProfile(saveFile);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(new CustomUserDetails(user), authentication.getCredentials(), authentication.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(newAuth);
    }

    public Optional<User> findBySeq(Long seq) {
        return userRepository.findBySeqAndIsDeletedFalse(seq);
    }
}
