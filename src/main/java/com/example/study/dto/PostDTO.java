package com.example.study.dto;

import com.example.study.util.CommonUtils;
import com.example.study.valid.CustomValidation;
import com.example.study.valid.groups.common.SaveGroup;
import com.example.study.valid.groups.common.UpdateGroup;
import com.example.study.valid.groups.post.PostLikeCountGroup;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostDTO {

    @NotNull(groups = {UpdateGroup.class, PostLikeCountGroup.class})
    private Long postId;

    private Long authorId;

    private String authorName;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "내용", max = 3000, nullable = false, groups = {SaveGroup.class, UpdateGroup.class})
    private String content;

    private String profileUrl;

    private Integer likeCount;

    @NotNull(groups = {PostLikeCountGroup.class})
    private Boolean isLiked;

    private Boolean isUpdated;

    private LocalDateTime createdDate;

    private List<FileDTO> files;

    private Set<Long> deleteFileIds;

    private UUID uuid;

    public void setContent(String content) {
        this.content = CommonUtils.strip(content);
    }
}
