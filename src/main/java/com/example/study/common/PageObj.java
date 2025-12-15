package com.example.study.common;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PageObj<T> {

    public PageObj(Page<T> page) {
        this.data = page.getContent();
        this.total = page.getTotalElements();
        this.offset = page.getPageable().getOffset();
        this.totalPage = page.getTotalPages();
    }

    private final List<T> data;

    private final long total;

    private final long offset;

    private final int totalPage;

}
