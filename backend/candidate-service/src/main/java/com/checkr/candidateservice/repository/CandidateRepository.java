package com.checkr.candidateservice.repository;

import com.checkr.candidateservice.entity.Candidate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
    Page<Candidate> findAllByUserId(@Param("userId") int userId, Pageable pageable);
    List<Candidate> findAllByUserId(int userId);
    long countByUserId(Integer userId);
    Optional<Candidate> findByEmail(String email);

    @Query("SELECT c FROM Candidate c JOIN c.report r WHERE c.userId = :userId AND r.createdAt BETWEEN :reportFromDate AND :reportToDate")
    List<Candidate> findAllByUserIdAndReportDateRange(@Param("userId") int userId, @Param("reportFromDate") LocalDateTime reportFromDate, @Param("reportToDate") LocalDateTime reportToDate);
}
