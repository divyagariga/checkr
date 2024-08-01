package com.checkr.candidateservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportDTO {
    private int id;
    private String status;
    private String adjudication;
    private String packageType;
    private String turnAroundTime;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
}
