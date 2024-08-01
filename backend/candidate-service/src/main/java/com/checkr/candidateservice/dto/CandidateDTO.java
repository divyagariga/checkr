package com.checkr.candidateservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateDTO {
    private int id;
    private String name;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String zipCode;
    private String socialSecurityNumber;
    private String driverLicense;
    private String location;
    private ReportDTO report;
    private List<CourtSearchDTO> courtSearches;
    private int userId;
    private String createdAt;
}