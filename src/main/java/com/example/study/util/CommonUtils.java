package com.example.study.util;

import com.example.study.constants.ImageConstants;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Supplier;
import java.util.stream.IntStream;

public final class CommonUtils {

    private CommonUtils() {
    }

    public static String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");

        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Cluster-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Forwarded");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Forwarded-Host");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Forwarded-Server");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        // X-Forwarded-For 헤더의 경우, IP가 여러 개일 수 있으므로 첫 번째 IP를 가져옴
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }

        return ip;
    }

    public static String telClean(String tel) {
        return Objects.nonNull(tel) ? tel.replaceAll("\\D", "") : null;
    }

    public static String strip(String str) {
        return Objects.nonNull(str) ? str.strip() : null;
    }

    public static boolean imageSizeCheck(List<MultipartFile> images) {
        if (Objects.isNull(images) || images.isEmpty()) {
            throw new IllegalArgumentException("images null or empty");
        }

        if (images.size() > ImageConstants.TOTAL_MAX_COUNT) {
            return false;
        }

        long totalSize = 0;

        for (MultipartFile image : images) {
            if (image.getSize() > ImageConstants.MAX_SIZE) {

                return false;
            }

            totalSize += image.getSize();
        }

        if (totalSize > ImageConstants.TOTAL_MAX_SIZE) {

            return false;
        }

        return true;
    }

    public static <K, V, T extends Map<K, V>> Map<K, V> createMap(K[] keys, V[] values, Supplier<T> supplier) {
        if (keys.length == 0 || keys.length != values.length) {
            throw new IllegalArgumentException();
        }

        T map = supplier.get();
        IntStream.range(0, keys.length).forEach(i -> map.put(keys[i], values[i]));

        return map;
    }
}
