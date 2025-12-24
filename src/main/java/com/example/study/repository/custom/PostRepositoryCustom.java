package com.example.study.repository.custom;

import com.example.study.dto.PostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface PostRepositoryCustom {

    Page<PostDTO> getPosts(UUID uuid, Pageable pageable);
}
