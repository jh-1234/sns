package com.example.study.controller;

import com.example.study.dto.PostDTO;
import com.example.study.service.PostService;
import com.example.study.util.PageObj;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/api/post")
    public ResponseEntity<Map<String, String>> save(@Valid @RequestPart("data") PostDTO dto, @RequestPart(name = "images", required = false) List<MultipartFile> images) {
        postService.save(dto, images);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/post")
    public ResponseEntity<PageObj<PostDTO>> getPosts(@PageableDefault Pageable pageable) {
        PageObj<PostDTO> posts = postService.getPosts(pageable);

        return ResponseEntity.ok(posts);
    }
}
