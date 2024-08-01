//package com.checkr.candidateservice.service;
//
//import com.checkr.candidateservice.dto.ReportDTO;
//import com.checkr.candidateservice.entity.Candidate;
//import com.checkr.candidateservice.entity.CourtSearch;
//import com.checkr.candidateservice.entity.Report;
//import com.checkr.candidateservice.exception.CandidateNotFound;
//import com.checkr.candidateservice.exception.CourtSearchesNotFound;
//import com.checkr.candidateservice.exception.ReportNotFound;
//import com.checkr.candidateservice.repository.CandidateRepository;
//import com.checkr.candidateservice.repository.ReportRepository;
//import com.checkr.candidateservice.utility.CandidateUtility;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.*;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import static org.mockito.Mockito.*;
//import java.util.*;
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.mock;
//import static org.mockito.Mockito.when;
//
//class CandidateServiceTests {
//    @Mock
//    private CandidateRepository candidateRepository;
//
//    @Mock
//    private ReportRepository reportRepository;
//
//    @Mock
//    private Report report;
//
//    @Mock
//    private CandidateUtility candidateUtility;
//
//    @InjectMocks
//    private CandidateServiceImpl candidateService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void getCandidateByIdExistingCandidateIdReturnsCandidate() {
//        int candidateId = 1;
//        Candidate expectedCandidate = new Candidate();
//        when(candidateRepository.findById(candidateId)).thenReturn(Optional.of(expectedCandidate));
//
//        Candidate result = candidateService.getCandidateById(candidateId);
//
//        assertEquals(expectedCandidate, result);
//    }
//
//    @Test
//    void getCandidateByIdNonExistingCandidateIdThrowsCandidateNotFound() {
//        int candidateId = 1;
//        when(candidateRepository.findById(candidateId)).thenReturn(Optional.empty());
//
//        assertThrows(CandidateNotFound.class, () -> candidateService.getCandidateById(candidateId));
//    }
//
//    @Test
//    void getReportByCandidateIdExistingCandidateIdReturnsReport() {
//        int candidateId = 1;
//        Candidate candidate = new Candidate();
//        Report expectedReport = new Report();
//        candidate.setReport(expectedReport);
//        when(candidateRepository.findById(candidateId)).thenReturn(Optional.of(candidate));
//
//        Report result = candidateService.getReportByCandidateId(candidateId);
//
//        assertEquals(expectedReport, result);
//    }
//
//    @Test
//    void getReportByCandidateIdNonExistingCandidateIdThrowsReportNotFound() {
//        int candidateId = 1;
//        when(candidateRepository.findById(candidateId)).thenReturn(Optional.empty());
//
//        assertThrows(CandidateNotFound.class, () -> candidateService.getReportByCandidateId(candidateId));
//    }
//
//    @Test
//    void testGetReportByCandidateIdReportNotFound() {
//
//        int candidateId = 1;
//
//
//        Candidate testCandidate = new Candidate();
//        testCandidate.setReport(null);
//        when(candidateRepository.findById(candidateId)).thenReturn(Optional.of(testCandidate));
//
//        assertThrows(ReportNotFound.class, () -> candidateService.getReportByCandidateId(candidateId));
//    }
//
//    @Test
//    void updateReportByCandidateIdExistingCandidateIdReturnsUpdatedReport() {
//        int candidateId = 1;
//        ReportDTO reportDTO = new ReportDTO();
//        Report existingReport = new Report();
//        existingReport.setStatus("OldStatus");
//        when(reportRepository.findByCandidateId(candidateId)).thenReturn(existingReport);
//
//        when(reportRepository.save(any(Report.class))).thenReturn(existingReport);
//
//        Report result = candidateService.updateReportByCandidateId(candidateId, reportDTO);
//
//        assertEquals(reportDTO.getStatus(), result.getStatus());
//        assertEquals(reportDTO.getAdjudication(), result.getAdjudication());
//        verify(reportRepository).save(existingReport);
//    }
//    @Test
//    void getSearchesForCandidateIdExistingCandidateIdReturnsCourtSearchList() {
//        int candidateId = 1;
//        Candidate candidate = new Candidate();
//        CourtSearch courtSearch = new CourtSearch();
//        candidate.setCourtSearches(Collections.singletonList(courtSearch));
//        when(candidateRepository.findById(candidateId)).thenReturn(Optional.of(candidate));
//
//        List<CourtSearch> result = candidateService.getSearchesForCandidateId(candidateId);
//
//        assertEquals(Collections.singletonList(courtSearch), result);
//    }
//
//    @Test
//    void getSearchesForCandidateIdNonExistingCandidateIdThrowsCourtSearchesNotFound() {
//        int candidateId = 1;
//        when(candidateRepository.findById(candidateId)).thenReturn(Optional.empty());
//
//        assertThrows(CandidateNotFound.class, () -> candidateService.getSearchesForCandidateId(candidateId));
//    }
//
//    @Test
//    void testGetCourtSearchesByCandidateIdCourtSearchNotFound() {
//        int candidateId = 1;
//        Candidate testCandidate = new Candidate();
//        testCandidate.setCourtSearches(new ArrayList<>());
//        when(candidateRepository.findById(candidateId)).thenReturn(Optional.of(testCandidate));
//
//        assertThrows(CourtSearchesNotFound.class, () -> candidateService.getSearchesForCandidateId(candidateId));
//    }
//
//    @Test
//    void fetchAllCandidatesWithReportsAndCourtSearchesReturnsPageOfCandidates() {
//        int userId = 1;
//        int page = 0;
//        int size = 10;
//        PageRequest pageable = PageRequest.of(page, size);
//        Page<Candidate> expectedPage = mock(Page.class);
//        when(candidateRepository.findAllByUserId(userId, pageable)).thenReturn(expectedPage);
//
//        Page<Candidate> result = candidateService.fetchAllCandidatesWithReportsAndCourtSearches(userId, page, size);
//
//        assertEquals(expectedPage, result);
//    }
//
//    @Test
//    void testSaveCandidate() {
//        Candidate candidateToSave = new Candidate();
//        Report candidateReport = new Report();
//        candidateReport.setStatus("SomeStatus");
//        candidateToSave.setReport(candidateReport);
//
//        List<CourtSearch> courtSearches = new ArrayList<>();
//        CourtSearch courtSearch1 = new CourtSearch();
//        CourtSearch courtSearch2 = new CourtSearch();
//        courtSearches.add(courtSearch1);
//        courtSearches.add(courtSearch2);
//        candidateToSave.setCourtSearches(courtSearches);
//
//        when(candidateRepository.save(any(Candidate.class))).thenReturn(candidateToSave);
//
//        when(report.getStatus()).thenReturn("SomeStatus");
//        Candidate savedCandidate = candidateService.save(candidateToSave);
//
//        assertNotNull(savedCandidate);
//        assertEquals("SomeStatus", savedCandidate.getReport().getStatus());
//        verify(candidateRepository, times(1)).save(any(Candidate.class));
//    }
//
//    @Test
//    void getCandidateCountByUserId() {
//        int userId = 1;
//        long expectedCount = 5L;
//
//        when(candidateRepository.countByUserId(userId)).thenReturn(expectedCount);
//        long actualCount = candidateService.getCandidateCountByUserId(userId);
//        assertEquals(expectedCount, actualCount);
//        verify(candidateRepository, times(1)).countByUserId(userId);
//    }
//}
