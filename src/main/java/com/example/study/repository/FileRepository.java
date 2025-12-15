package com.example.study.repository;

import com.example.study.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {

    List<File> findAllByModuleTypeAndModuleIdAndDelYn(String moduleType, Long moduleId, String delYn);

    List<File> findAllByDelYn(String delYn);

    @Modifying
    @Query("update File f set f.delYn = 'Y' where f.fileId = :fileId")
    void remove(Long fileId);

    @Modifying
    @Query("update File f set f.fileDelYn = 'Y' where f.fileId = :fileId")
    void fileRemove(Long fileId);
}
