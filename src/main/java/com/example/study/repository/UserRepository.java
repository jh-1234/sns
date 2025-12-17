package com.example.study.repository;

import com.example.study.entity.User;
import com.example.study.repository.custom.UserRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    @Query("select u from User u where u.userId = :userId and u.isDeleted = false")
    Optional<User> loginUser(String userId);
}
