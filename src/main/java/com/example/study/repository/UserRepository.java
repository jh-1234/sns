package com.example.study.repository;

import com.example.study.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    @Query("select u from User u where u.userId = :userId and u.delYn = 'N'")
    Optional<User> loginUser(String userId);
}
