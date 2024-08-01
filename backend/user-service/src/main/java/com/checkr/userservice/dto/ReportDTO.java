package com.checkr.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportDTO {
    private int id;
    @NotNull
    private String status;
    @NotNull
    private String adjudication;
    @NotNull
    private String candidatePackage;
    @NotNull
    private String turnAroundTime;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
}
