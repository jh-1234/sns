package com.example.study.repository;

import com.example.study.entity.PostLikeUserMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostLikeUserMappingRepository extends JpaRepository<PostLikeUserMapping, Long> {

    @Modifying
    @Query("update PostLikeUserMapping m set m.isDeleted = true where m.post = :#{#mapping.post} and m.user = :#{#mapping.user} and m.isDeleted = false")
    void likeCancel(@Param("mapping") PostLikeUserMapping mapping);
}
