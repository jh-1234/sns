package com.example.study.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FileModuleType {
    POST("P", "post");

    private final String value;

    private final String path;
}
