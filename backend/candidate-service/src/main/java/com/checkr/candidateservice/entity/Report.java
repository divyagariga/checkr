package com.checkr.candidateservice.entity;

import javax.persistence.*;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "report")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Size(max = 7)
    @Column(name = "status")
    private String status;

    @Size(max = 7)
    @Column(name = "adjudication")
    private String adjudication;

    @Column(name = "package_type")
    private String packageType;

    @Column(name = "turn_around_time")
    private String turnAroundTime;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "candidate_id", unique = true)
    @JsonIgnore
    private Candidate candidate;

    public Report(String adjudication, String packageType,
//                  LocalDateTime completedAt,
                  String turnAroundTime) {
        this.adjudication = adjudication;
        this.packageType = packageType;
//        this.completedAt = completedAt;
        this.turnAroundTime = turnAroundTime;
    }
}
