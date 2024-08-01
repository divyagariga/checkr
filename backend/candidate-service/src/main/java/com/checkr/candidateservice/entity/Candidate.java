package com.checkr.candidateservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "candidate")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotBlank
    @Size(min = 4,max = 20)
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank
    @Size(min = 4,max = 30)
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    @NotBlank
    @Size(max = 10)
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "zipcode")
    private String zipCode;

    @Column(name = "social_security_number")
    private String socialSecurityNumber;

    @Column(name = "driver_license")
    private String driverLicense;

    @Column(name = "location")
    private String location;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // The following field represents the user ID associated with this candidate.
    // It indicates the user to whom this candidate belongs.
    @Column(name = "user_id")
    private int userId;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "candidate", cascade = CascadeType.ALL)
//    @JsonIgnore
    private Report report;

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CourtSearch> courtSearches = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Candidate candidate = (Candidate) o;
        return Objects.equals(courtSearches, candidate.courtSearches);
    }

    @Override
    public int hashCode() {
        return Objects.hash(courtSearches);
    }
}
