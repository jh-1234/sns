package com.example.study.repository;

import com.example.study.entity.Post;
import com.example.study.repository.custom.PostRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom {

    Optional<Post> findByPostIdAndIsDeletedIsFalse(Long postId);
}
