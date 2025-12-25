package com.example.study.dto.post;

import com.example.study.util.CommonUtils;
import com.example.study.valid.CustomValidation;
import com.example.study.valid.groups.common.Save;
import com.example.study.valid.groups.common.Update;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommentDTO {

    @NotNull(groups = Update.class)
    private Long commentId;

    @NotNull(groups = Save.class)
    private Long postId;

    private Long userSeq;

    private String username;

    private UUID uuid;

    private String userProfileUrl;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "내용", max = 600, nullable = false, groups = {Save.class, Update.class})
    private String content;

    public void setContent(String content) {
        this.content = CommonUtils.strip(content);
    }
}
