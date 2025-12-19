package com.example.study.service;

import com.example.study.dto.FileDTO;
import com.example.study.dto.PostDTO;
import com.example.study.entity.File;
import com.example.study.entity.Post;
import com.example.study.enums.FileModuleType;
import com.example.study.repository.PostRepository;
import com.example.study.util.CustomException;
import com.example.study.util.PageObj;
import com.example.study.util.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private final FileService fileService;

    public void save(PostDTO dto, List<MultipartFile> images) {
        Post post = new Post();
        post.setUser(Session.getSession());
        post.setContent(dto.getContent());

        postRepository.save(post);
        fileService.save(images, FileModuleType.POST, post.getPostId());
    }

    public PostDTO getPost(Long postId) {
        return postRepository.findByPostIdAndIsDeletedIsFalse(postId).map(post -> {
            PostDTO dto = new PostDTO();
            dto.setPostId(post.getPostId());
            dto.setAuthorId(post.getUser().getSeq());
            dto.setAuthorName(post.getUser().getName());
            dto.setContent(post.getContent());
            dto.setLikeCount(post.getLikeCount());
            dto.setIsUpdated(post.getIsUpdated());
            dto.setFiles(fileService.getFiles(FileModuleType.POST, post.getPostId()));
            dto.setCreatedDate(post.getCreatedDate());

            return dto;
        }).orElseThrow();
    }

    public PageObj<PostDTO> getPosts(Pageable pageable) {
        // post list 조회
        Page<PostDTO> posts = postRepository.getPosts(pageable);

        // post 마다 업로드 된 이미지 파일을 조회하기 위해 pk를 Set에 추출
        Set<Long> postIds = posts.stream().map(PostDTO::getPostId).collect(Collectors.toSet());

        // id가 담긴 Set으로 파일 데이터를 Map 형태로 조회
        Map<Long, List<FileDTO>> files = fileService.getAllFiles(FileModuleType.POST, postIds);

        // post 순회하며 파일 데이터 담기
        posts.stream().forEach(post -> post.setFiles(files.get(post.getPostId())));

        return new PageObj<>(posts);
    }

    public void update(PostDTO dto, List<MultipartFile> images) {
        Post post = postRepository.findByPostIdAndIsDeletedIsFalse(dto.getPostId()).orElseThrow();

        if (!Objects.equals(Session.getSession().getSeq(), post.getUser().getSeq())) {
            throw new CustomException("Post 작성자 본인이 아닙니다.");
        }

        post.setContent(dto.getContent());

        fileService.remove(dto.getDeleteFileIds());
        fileService.save(images, FileModuleType.POST, post.getPostId());
    }

    public void delete(Long postId) {
        Post post = postRepository.findByPostIdAndIsDeletedIsFalse(postId).orElseThrow();

        if (!Objects.equals(Session.getSession().getSeq(), post.getUser().getSeq())) {
            throw new CustomException("Post 작성자 본인이 아닙니다.");
        }

        post.setIsDeleted(true);

        fileService.remove(post.getFiles().stream().map(File::getFileId).collect(Collectors.toSet()));
    }
}
