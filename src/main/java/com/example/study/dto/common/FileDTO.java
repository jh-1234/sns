package com.example.study.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FileDTO {

    public FileDTO(Long fileId, String filename, String fileLoadPath) {
        this.fileId = fileId;
        this.filename = filename;
        this.fileLoadPath = fileLoadPath;
    }

    private Long fileId;

    private String filename;

    private String fileLoadPath;
}
