package com.checkr.candidateservice.utility;

import com.checkr.candidateservice.entity.Candidate;
import com.checkr.candidateservice.entity.CourtSearch;
import com.checkr.candidateservice.entity.Report;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import static com.checkr.candidateservice.constants.CandidateServiceConstants.COURT_SEARCH_STATUS;
import static com.checkr.candidateservice.constants.CandidateServiceConstants.COURT_SEARCH_VIOLATIONS;

@Component
public class CandidateUtility {

    private CandidateUtility() {
    }

   public void setReportForCandidate(Candidate candidate) {
//        Report candidateReport = candidate.getReport();
        Report report = getReport();
        report.setCandidate(candidate);
//        report.setStatus("CLEAR");
//        report.setAdjudication(candidateReport.getAdjudication());

       // Generate court searches and determine report status
       List<CourtSearch> courtSearches = getCourtSearches();
       String reportStatus = determineReportStatus(courtSearches);

       // Set the determined status to the report
       report.setStatus(reportStatus);

        candidate.setReport(report);
    }

    public void saveCourtSearch(Candidate savedCandidate) {
        List<CourtSearch> courtSearchList = getCourtSearches();
        for (CourtSearch courtSearch : courtSearchList) {
            courtSearch.setCandidate(savedCandidate);
        }
        savedCandidate.setCourtSearches(courtSearchList);
    }

    public List<CourtSearch> getCourtSearches() {
        return IntStream.range(0, COURT_SEARCH_VIOLATIONS.length)
                .mapToObj(i -> {
                    CourtSearch courtSearch = new CourtSearch();
                    courtSearch.setViolation(COURT_SEARCH_VIOLATIONS[i]);
                    courtSearch.setStatus(COURT_SEARCH_STATUS[i]);
                    courtSearch.setCompletedAt(LocalDateTime.now());
                    return courtSearch;
                })
                .collect(Collectors.toList());
    }
    private String determineReportStatus(List<CourtSearch> courtSearches) {
        boolean allClear = courtSearches.stream()
                .allMatch(courtSearch-> "CLEAR".equals(courtSearch.getStatus()));
        // Set status to "clear" if all are clear, otherwise "consider"
        return allClear ? "CLEAR" : "CONSIDER";
    }

    public Report getReport() {
        return new Report("", "Employee Pro",  "");
    }
}
