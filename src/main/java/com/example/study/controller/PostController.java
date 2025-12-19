package com.example.study.controller;

import com.example.study.dto.PostDTO;
import com.example.study.service.PostService;
import com.example.study.util.PageObj;
import com.example.study.valid.groups.SaveGroup;
import com.example.study.valid.groups.UpdateGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping(value = "/api/post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> save(@Validated(SaveGroup.class) @RequestPart("data") PostDTO dto, @RequestPart(name = "images", required = false) List<MultipartFile> images) {
        postService.save(dto, images);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/post/{postId}")
    public ResponseEntity<PostDTO> getPost(@PathVariable("postId") Long postId) {
        PostDTO post = postService.getPost(postId);

        return ResponseEntity.ok(post);
    }

    @GetMapping("/api/post")
    public ResponseEntity<PageObj<PostDTO>> getPosts(@PageableDefault Pageable pageable) {
        PageObj<PostDTO> posts = postService.getPosts(pageable);

        return ResponseEntity.ok(posts);
    }

    @PatchMapping(value = "/api/post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> update(@Validated(UpdateGroup.class) @RequestPart("data") PostDTO dto, @RequestPart(name = "images", required = false) List<MultipartFile> images) {
        postService.update(dto, images);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/api/post/{postId}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("postId") Long postId) {
        postService.delete(postId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
