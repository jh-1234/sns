package com.example.study.entity.auditing;

import com.example.study.custom.CustomAuditingEntityListener;
import com.example.study.custom.auditing.CreatedByName;
import com.example.study.custom.auditing.CreatedBySeq;
import com.example.study.custom.auditing.UpdatedByName;
import com.example.study.custom.auditing.UpdatedBySeq;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@MappedSuperclass
@EntityListeners(CustomAuditingEntityListener.class)
@Getter
public abstract class BaseEntity extends TimeEntity {

    @Column(updatable = false, nullable = false)
    @CreatedBySeq
    private Long createdSeq;

    @Column(updatable = false, nullable = false)
    @CreatedByName
    private String createdName;

//    @Column(nullable = false)
//    @UpdatedBySeq
//    private Long updatedSeq;

//    @Column(nullable = false)
//    @UpdatedByName
//    private String updatedName;
}
