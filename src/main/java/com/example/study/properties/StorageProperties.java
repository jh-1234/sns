package com.example.study.properties;

import com.example.study.enums.FileType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.Map;

@Validated
@ConfigurationProperties(prefix = "storage")
public record StorageProperties(@NotEmpty Map<FileType, @Valid PathInfo> paths) {
    public record PathInfo(@NotBlank String uploadPath, @NotBlank String loadPath) {
    }
}
