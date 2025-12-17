package com.example.study.repository;

import com.example.study.entity.File;
import com.example.study.enums.FileModuleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface FileRepository extends JpaRepository<File, Long> {

    List<File> findAllByModuleTypeAndModuleIdAndIsDeleted(FileModuleType moduleType, Long moduleId, Boolean isDeleted);

    List<File> findByModuleTypeAndModuleIdInAndIsDeleted(FileModuleType moduleType, Set<Long> moduleIds, Boolean isDeleted);

    List<File> findAllByIsDeleted(Boolean isDeleted);

    @Modifying
    @Query("update File f set f.isDeleted = true where f.fileId = :fileId")
    void remove(Long fileId);

    @Modifying
    @Query("update File f set f.isFileDeleted = true where f.fileId = :fileId")
    void fileRemove(Long fileId);
}
