package com.example.study.entity.auditing;

import com.example.study.custom.CustomAuditingEntityListener;
import com.example.study.custom.auditing.CreateByName;
import com.example.study.custom.auditing.CreateBySeq;
import com.example.study.custom.auditing.UpdateByName;
import com.example.study.custom.auditing.UpdateBySeq;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@MappedSuperclass
@EntityListeners(CustomAuditingEntityListener.class)
@Getter
public abstract class BaseEntity extends TimeEntity {

    @Column(updatable = false, nullable = false)
    @CreateBySeq
    private Long createSeq;

    @Column(updatable = false, nullable = false)
    @CreateByName
    private String createName;

//    @Column(nullable = false)
//    @UpdateBySeq
//    private Long updateSeq;

//    @Column(nullable = false)
//    @UpdateByName
//    private String updateName;
}
