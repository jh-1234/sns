package com.example.study.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.util.*;

@Aspect
@Component
public class AopAspect {

    @Around("execution(* com.example.study.service..*(..)) && !@annotation(com.example.study.aop.NoAop)")
    public Object paramEmptyCheck(ProceedingJoinPoint joinPoint) throws Throwable {
        Class<?> returnType = ((MethodSignature) joinPoint.getSignature()).getReturnType();

        for (Object arg : joinPoint.getArgs()) {
            if (arg == null) {
                return call(returnType);
            }

            if (arg instanceof Collection<?> && ((Collection<?>) arg).isEmpty()) {
                return call(returnType);
            }

            if (arg instanceof Map<?, ?> && ((Map<?, ?>) arg).isEmpty()) {
                return call(returnType);
            }
        }

        return joinPoint.proceed();
    }

    private Object call(Class<?> returnType) {
        if (List.class.isAssignableFrom(returnType)) {
            return List.of();
        }

        if (Set.class.isAssignableFrom(returnType)) {
            return Set.of();
        }

        if (Map.class.isAssignableFrom(returnType)) {
            return Map.of();
        }

        if (Optional.class.isAssignableFrom(returnType)) {
            return Optional.empty();
        }

        return null;
    }
}