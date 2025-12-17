package com.example.study.custom;

import com.example.study.custom.auditing.CreatedByName;
import com.example.study.custom.auditing.CreatedBySeq;
import com.example.study.custom.auditing.UpdatedByName;
import com.example.study.custom.auditing.UpdatedBySeq;
import com.example.study.entity.User;
import com.example.study.util.Session;
import jakarta.persistence.PrePersist;

import java.lang.reflect.Field;
import java.util.Objects;

public class CustomAuditingEntityListener {

    @PrePersist
    public void prePersist(Object entity) throws IllegalAccessException {
        Class<?> clazz = entity.getClass();
        User session = Session.getSession();

        while (Objects.nonNull(clazz)) {
            for (Field field : clazz.getDeclaredFields()) {
                if (field.isAnnotationPresent(CreatedBySeq.class)) {
                    field.setAccessible(true);
                    field.set(entity, session.getSeq());
                }

                if (field.isAnnotationPresent(CreatedByName.class)) {
                    field.setAccessible(true);
                    field.set(entity, session.getName());
                }
            }

            clazz = clazz.getSuperclass();
        }
    }

//    @PreUpdate
    public void preUpdate(Object entity) throws IllegalAccessException {
        Class<?> clazz = entity.getClass();
        User session = Session.getSession();

        while (Objects.nonNull(clazz)) {
            for (Field field : clazz.getDeclaredFields()) {
                if (field.isAnnotationPresent(UpdatedBySeq.class)) {
                    field.setAccessible(true);
                    field.set(entity, session.getSeq());
                }

                if (field.isAnnotationPresent(UpdatedByName.class)) {
                    field.setAccessible(true);
                    field.set(entity, session.getName());
                }
            }

            clazz = clazz.getSuperclass();
        }
    }
}
