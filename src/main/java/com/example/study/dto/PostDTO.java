package com.example.study.dto;

import com.example.study.util.CommonUtils;
import com.example.study.valid.CustomValidation;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostDTO {

    private Long postId;

    private String authorName;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "내용", max = 3000, nullable = false)
    private String content;

    private String profileUrl;

    private Integer likeCount;

    private Boolean isUpdated;

    private LocalDateTime createDate;

    private List<FileDTO> files;

    public void setContent(String content) {
        this.content = CommonUtils.strip(content);
    }
}
