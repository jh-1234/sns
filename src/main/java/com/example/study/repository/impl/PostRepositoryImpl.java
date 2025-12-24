package com.example.study.repository.impl;

import com.example.study.dto.PostDTO;
import com.example.study.repository.custom.PostRepositoryCustom;
import com.example.study.util.Session;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import static com.example.study.entity.QPost.post;
import static com.example.study.entity.QPostLikeUserMapping.postLikeUserMapping;
import static com.example.study.entity.QUser.user;

@Component
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<PostDTO> getPosts(UUID uuid, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(post.isDeleted.eq(false));

        if (Objects.nonNull(uuid)) {
            builder.and(post.user.uuid.eq(uuid));
        }

        List<PostDTO> posts = queryFactory
                .select(Projections.bean(PostDTO.class,
                        post.postId,
                        user.seq.as("authorId"),
                        user.name.as("authorName"),
                        user.profile.fileLoadPath.as("profileUrl"),
                        user.uuid,
                        post.content,
                        post.likeCount,
                        postLikeUserMapping.likeId.isNotNull().as("isLiked"),
                        post.isUpdated,
                        post.createdDate
                ))
                .from(post)
                .join(post.user, user)
                .leftJoin(postLikeUserMapping)
                .on(
                        postLikeUserMapping.post.eq(post),
                        postLikeUserMapping.user.eq(Session.getSession()),
                        postLikeUserMapping.isDeleted.eq(false)
                )
                .where(builder)
                .orderBy(post.createdDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(post.count())
                .from(post)
                .where(builder);

        return PageableExecutionUtils.getPage(posts, pageable, countQuery::fetchOne);
    }
}
