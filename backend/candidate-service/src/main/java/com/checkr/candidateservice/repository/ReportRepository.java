package com.checkr.candidateservice.repository;

import com.checkr.candidateservice.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
    Report findByCandidateId(int candidateId);
}
