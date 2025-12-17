package com.example.study.repository.custom;

import com.example.study.dto.PostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepositoryCustom {

    Page<PostDTO> getPosts(Pageable pageable);
}
