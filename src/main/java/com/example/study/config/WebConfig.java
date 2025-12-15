package com.example.study.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${image.upload.path}")
    private String imageUploadPath;

    @Value("${image.load.path}")
    private String imageLoadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(imageLoadPath + "/**").addResourceLocations("file:" + imageUploadPath + File.separator);
    }
}
