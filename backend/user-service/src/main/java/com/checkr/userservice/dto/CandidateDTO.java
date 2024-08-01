package com.checkr.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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
    private int userId;
}
