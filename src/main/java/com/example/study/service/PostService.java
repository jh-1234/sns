package com.example.study.service;

import com.example.study.aop.NoAop;
import com.example.study.dto.FileDTO;
import com.example.study.dto.PostDTO;
import com.example.study.entity.Post;
import com.example.study.enums.FileModuleType;
import com.example.study.repository.PostRepository;
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
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private final FileService fileService;

    @NoAop
    public void save(PostDTO dto, List<MultipartFile> images) {
        Post post = new Post();
        post.setUser(Session.getSession());
        post.setContent(dto.getContent());

        postRepository.save(post);
        fileService.save(images, FileModuleType.POST, post.getPostId());
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
}
