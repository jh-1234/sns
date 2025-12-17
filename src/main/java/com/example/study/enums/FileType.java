package com.example.study.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.Set;

@Getter
@RequiredArgsConstructor
public enum FileType {

    IMAGE("I", Set.of("image/jpeg", "image/png", "image/gif"), Set.of(".jpg", ".jpeg", ".png", ".gif")),
    VIDEO("V", Set.of("video/mp4"), Set.of(".mp4")),
    GENERAL("G", Set.of("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"), Set.of(".xlsx"));

    private final String type;

    private final Set<String> mimeTypes;

    private final Set<String> extensions;

    public static FileType getFileType(String mimeType, String extension) {
        return Arrays.stream(values())
                .filter(fileType -> fileType.mimeTypes.contains(mimeType) && fileType.extensions.contains(extension))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
