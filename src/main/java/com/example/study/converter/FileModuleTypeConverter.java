package com.example.study.converter;

import com.example.study.enums.FileModuleType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;
import java.util.Objects;

@Converter
public class FileModuleTypeConverter implements AttributeConverter<FileModuleType, String> {

    @Override
    public String convertToDatabaseColumn(FileModuleType type) {
        return Objects.nonNull(type) ? type.getValue() : null;
    }

    @Override
    public FileModuleType convertToEntityAttribute(String string) {
        return Objects.nonNull(string) ? Arrays.stream(FileModuleType.values())
                .filter(v -> v.getValue().equals(string)).findFirst().orElseThrow(IllegalArgumentException::new) : null;
    }
}
