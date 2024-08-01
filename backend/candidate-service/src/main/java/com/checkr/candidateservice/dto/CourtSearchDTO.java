package com.checkr.candidateservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourtSearchDTO {
    private int id;
    private String violation;
    private String status;
    private LocalDateTime completedAt;
}
