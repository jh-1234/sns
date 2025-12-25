package com.example.study.controller;

import com.example.study.dto.post.CommentDTO;
import com.example.study.dto.post.PostDTO;
import com.example.study.service.PostService;
import com.example.study.util.PageObj;
import com.example.study.valid.groups.common.Save;
import com.example.study.valid.groups.common.Update;
import com.example.study.valid.groups.post.PostLikeCount;
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
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping(value = "/api/posts", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> postSave(@Validated(Save.class) @RequestPart("data") PostDTO dto, @RequestPart(name = "images", required = false) List<MultipartFile> images) {
        postService.postSave(dto, images);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/posts/{postId}")
    public ResponseEntity<PostDTO> getPost(@PathVariable("postId") Long postId) {
        PostDTO post = postService.getPost(postId);

        return ResponseEntity.ok(post);
    }

    @GetMapping("/api/posts")
    public ResponseEntity<PageObj<PostDTO>> getPosts(@RequestParam(value = "uuid", required = false) UUID uuid, @PageableDefault Pageable pageable) {
        PageObj<PostDTO> posts = postService.getPosts(uuid, pageable);

        return ResponseEntity.ok(posts);
    }

    @PatchMapping(value = "/api/posts", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> postUpdate(@Validated(Update.class) @RequestPart("data") PostDTO dto, @RequestPart(name = "images", required = false) List<MultipartFile> images) {
        postService.postUpdate(dto, images);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/api/posts/{postId}")
    public ResponseEntity<HttpStatus> postDelete(@PathVariable("postId") Long postId) {
        postService.postDelete(postId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/api/post-like-count-update")
    public ResponseEntity<HttpStatus> postLikeCountUpdate(@RequestBody @Validated(PostLikeCount.class) PostDTO dto) {
        postService.postLikeCountUpdate(dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/posts/{postId}/comments")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable("postId") Long postId) {
        List<CommentDTO> comments = postService.getComments(postId);

        return ResponseEntity.ok(comments);
    }

    @PostMapping("/api/posts/comments")
    public ResponseEntity<HttpStatus> commentSave(@RequestBody @Validated(Save.class) CommentDTO dto) {
        postService.commentSave(dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/api/posts/comments")
    public ResponseEntity<HttpStatus> commentUpdate(@RequestBody @Validated(Update.class) CommentDTO dto) {
        postService.commentUpdate(dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/api/posts/comments/{commentId}")
    public ResponseEntity<HttpStatus> commentDelete(@PathVariable("commentId") Long commentId) {
        postService.commentDelete(commentId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
