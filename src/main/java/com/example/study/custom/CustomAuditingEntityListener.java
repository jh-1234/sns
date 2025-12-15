package com.example.study.custom;

import com.example.study.common.Session;
import com.example.study.custom.auditing.CreateByName;
import com.example.study.custom.auditing.CreateBySeq;
import com.example.study.custom.auditing.UpdateByName;
import com.example.study.custom.auditing.UpdateBySeq;
import com.example.study.entity.User;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.lang.reflect.Field;
import java.util.Objects;

public class CustomAuditingEntityListener {

    @PrePersist
    public void prePersist(Object entity) throws IllegalAccessException {
        Class<?> clazz = entity.getClass();
        User session = Session.getSession();

        while (Objects.nonNull(clazz)) {
            for (Field field : clazz.getDeclaredFields()) {
                if (field.isAnnotationPresent(CreateBySeq.class)) {
                    field.setAccessible(true);
                    field.set(entity, session.getSeq());
                }

                if (field.isAnnotationPresent(CreateByName.class)) {
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
                if (field.isAnnotationPresent(UpdateBySeq.class)) {
                    field.setAccessible(true);
                    field.set(entity, session.getSeq());
                }

                if (field.isAnnotationPresent(UpdateByName.class)) {
                    field.setAccessible(true);
                    field.set(entity, session.getName());
                }
            }

            clazz = clazz.getSuperclass();
        }
    }
}
