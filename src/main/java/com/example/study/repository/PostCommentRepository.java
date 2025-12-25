package com.example.study.repository;

import com.example.study.entity.PostComment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {

    Optional<PostComment> findByCommentIdAndIsDeletedFalse(Long commentId);

    @EntityGraph(attributePaths = {"user", "user.profile"})
    List<PostComment> findAllByPost_PostIdAndIsDeletedFalseOrderByCreatedDateDesc(Long postId);
}
