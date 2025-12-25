package com.example.study.entity;

import com.example.study.converter.BooleanConverter;
import com.example.study.entity.auditing.TimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TBL_POST_COMMENT")
@Getter
@Setter
public class PostComment extends TimeEntity {

    @PrePersist
    private void init() {
        this.isDeleted = false;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @JoinColumn(name = "POST_ID", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    @JoinColumn(name = "USER_SEQ", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @NotBlank
    private String content;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name = "DEL_YN")
    private Boolean isDeleted;
}
