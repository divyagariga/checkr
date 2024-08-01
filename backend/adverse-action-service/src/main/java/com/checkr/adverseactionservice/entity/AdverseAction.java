package com.checkr.adverseactionservice.entity;

import com.checkr.adverseactionservice.constants.AdverseActionConstants;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "adverse_action")
public class AdverseAction {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    @Enumerated(EnumType.STRING)
    private AdverseActionConstants.AdverseActionStatus status;
    @Column(name = "created_date")
    @CreationTimestamp
    private LocalDateTime preNoticeDate;
    @Column(name = "notice_date")
    private LocalDateTime postNoticeDate;
    @Column(name = "candidate_id")
    private int candidateId;
    @Column(name = "updated_date")
    @UpdateTimestamp
    private LocalDateTime updatedDate;
}