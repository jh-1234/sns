package com.example.study.entity;

import com.example.study.entity.auditing.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TBL_FILE")
@Getter
@Setter
public class File extends BaseEntity {

    @PrePersist
    private void init() {
        if (this.delYn == null) {
            this.delYn = "N";
        }
        if (this.fileDelYn == null) {
            this.fileDelYn = "N";
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long fileId;

    @NotBlank
    private String originalName;

    @NotBlank
    private String uploadName;

    @NotBlank
    private String basename;

    @NotBlank
    private String fileExt;

    @NotNull
    private Long fileSize;

    @NotBlank
    private String filePath;

    @NotBlank
    private String fileLoadPath;

    @NotBlank
    private String moduleType;

    @NotNull
    private Long moduleId;

    @NotBlank
    private String delYn;

    @NotBlank
    private String fileDelYn;
}
