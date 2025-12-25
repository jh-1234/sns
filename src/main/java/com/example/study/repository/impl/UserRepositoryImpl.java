package com.example.study.repository.impl;

import com.example.study.dto.auth.UserDTO;
import com.example.study.repository.custom.UserRepositoryCustom;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.example.study.entity.QUser.user;

@Component
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<UserDTO> getUsers() {
        return queryFactory
                .select(Projections.bean(UserDTO.class,
                        user.userId,
                        user.name
                ))
                .from(user)
                .where(user.isDeleted.eq(false))
                .fetch();
    }
}
