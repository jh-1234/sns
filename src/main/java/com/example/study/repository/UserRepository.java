package com.example.study.repository;

import com.example.study.entity.User;
import com.example.study.repository.custom.UserRepositoryCustom;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    @Query("select u from User u left join fetch u.profile p where u.userId = :userId and u.isDeleted = false")
    Optional<User> loginUser(@Param("userId") String userId);

    Boolean existsByUserId(String userId);

    @EntityGraph(attributePaths = {"profile"})
    Optional<User> findBySeqAndIsDeletedFalse(Long seq);

    @EntityGraph(attributePaths = {"profile"})
    Optional<User> findByUuid(UUID uuid);


}
