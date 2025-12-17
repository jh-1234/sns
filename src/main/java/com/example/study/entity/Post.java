package com.example.study.entity;

import com.example.study.converter.BooleanConverter;
import com.example.study.entity.auditing.TimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TBL_POST")
@Getter
@Setter
public class Post extends TimeEntity {

    @PrePersist
    private void init() {
        this.likeCount = 0;
        this.isUpdated = false;
        this.isDeleted = false;
    }

    @PreUpdate
    private void update() {
        this.isUpdated = true;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AUTHOR_ID", nullable = false)
    private User user;

    @NotBlank
    private String content;

    @NotNull
    private Integer likeCount;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name = "UPDATE_YN")
    private Boolean isUpdated;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name = "DEL_YN")
    private Boolean isDeleted;

    @OneToMany(mappedBy = "moduleId")
    @SQLRestriction("DEL_YN = 'N' AND FILE_DEL_YN = 'N'")
    private List<File> files = new ArrayList<>();
}
