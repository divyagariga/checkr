package com.checkr.candidateservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {
    private List<T> content;
    private int pageNumber;
    private int pageSize;
    private int totalPages;
    private long totalElements;

//    public PageResponse(List<T> candidateDTOs, int pageNumber, int pageSize, int totalPages, long totalElements) {
//    }

//    public PageResponse(List<T> candidateDTOs, int pageNumber, int pageSize, int totalPages, long totalElements) {
//    }

}
