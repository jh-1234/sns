package com.example.study.dto.post;

import com.example.study.dto.common.FileDTO;
import com.example.study.util.CommonUtils;
import com.example.study.valid.CustomValidation;
import com.example.study.valid.groups.common.Save;
import com.example.study.valid.groups.common.Update;
import com.example.study.valid.groups.post.PostLikeCount;
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

    @NotNull(groups = {Update.class, PostLikeCount.class})
    private Long postId;

    private Long authorId;

    private String authorName;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "내용", max = 3000, nullable = false, groups = {Save.class, Update.class})
    private String content;

    private String profileUrl;

    private Integer likeCount;

    @NotNull(groups = {PostLikeCount.class})
    private Boolean isLiked;

    private Boolean isUpdated;

    private LocalDateTime createdDate;

    private List<FileDTO> files;

    private Set<Long> deleteFileIds;

    private UUID uuid;

    private Integer commentCount;

    public void setContent(String content) {
        this.content = CommonUtils.strip(content);
    }
}
