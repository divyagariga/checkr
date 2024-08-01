package com.checkr.candidateservice.service;

import com.checkr.candidateservice.dto.ReportDTO;
import com.checkr.candidateservice.entity.Candidate;
import com.checkr.candidateservice.entity.CourtSearch;
import com.checkr.candidateservice.entity.Report;
import org.springframework.data.domain.Page;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface CandidateService {
    Candidate getCandidateById(int candidateId);

    Report getReportByCandidateId(int candidateId);

    Report updateReportByCandidateId(HttpServletRequest request,int candidateId, ReportDTO reportDTO,String violation);

    List<CourtSearch> getSearchesForCandidateId(int candidateId);

    Page<Candidate> fetchAllCandidatesWithReportsAndCourtSearches(int userId, int page, int size);
    List<Candidate> fetchAllCandidatesWithReportsAndCourtSearches(int userId, LocalDateTime reportFromDate, LocalDateTime reportToDate);

    Candidate save(Candidate candidate);
    
    long getCandidateCountByUserId(int userId);
}
