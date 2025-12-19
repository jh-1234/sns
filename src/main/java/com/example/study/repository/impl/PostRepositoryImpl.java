package com.example.study.repository.impl;

import com.example.study.dto.PostDTO;
import com.example.study.repository.custom.PostRepositoryCustom;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.example.study.entity.QPost.post;
import static com.example.study.entity.QUser.user;

@Component
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<PostDTO> getPosts(Pageable pageable) {
        List<PostDTO> posts = queryFactory
                .select(Projections.bean(PostDTO.class,
                        post.postId,
                        user.seq.as("authorId"),
                        user.name.as("authorName"),
                        post.content,
                        post.likeCount,
                        post.isUpdated,
                        post.createdDate
                ))
                .from(post)
                .join(post.user, user)
                .where(post.isDeleted.eq(false))
                .orderBy(post.createdDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(post.count())
                .from(post)
                .where(post.isDeleted.eq(false));

        return PageableExecutionUtils.getPage(posts, pageable, countQuery::fetchOne);
    }
}
