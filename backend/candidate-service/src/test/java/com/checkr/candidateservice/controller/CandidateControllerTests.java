package com.checkr.candidateservice.controller;

//import com.checkr.candidateservice.dto.CandidateDTO;
//import com.checkr.candidateservice.dto.CourtSearchDTO;
//import com.checkr.candidateservice.dto.PageResponse;
//import com.checkr.candidateservice.dto.ReportDTO;
//import com.checkr.candidateservice.entity.Candidate;
//import com.checkr.candidateservice.entity.CourtSearch;
//import com.checkr.candidateservice.entity.Report;
//import com.checkr.candidateservice.exception.InvalidPaginationParam;
//import com.checkr.candidateservice.mapper.CandidateMapper;
//import com.checkr.candidateservice.mapper.CourtSearchMapper;
//import com.checkr.candidateservice.mapper.ReportMapper;
//import com.checkr.candidateservice.service.CandidateService;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.data.domain.Page;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;

//import java.util.ArrayList;
//import java.util.List;
//import static com.checkr.candidateservice.constants.CandidateServiceConstants.INVALID_PAGINATION_PAGE_NUMBER_EXCEPTION;
//import static com.checkr.candidateservice.constants.CandidateServiceConstants.INVALID_PAGINATION_PAGE_SIZE_EXCEPTION;
//import static org.junit.Assert.assertThrows;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.mockito.Mockito.*;

//@ExtendWith(MockitoExtension.class)
class CandidateControllerTests {
//    @Mock
//    private CandidateMapper candidateMapper;
//
//    @Mock
//    private CourtSearchMapper courtSearchMapper;
//
//    @Mock
//    private ReportMapper reportMapper;
//
//    @Mock
//    private CandidateService candidateService;
//
//    @InjectMocks
//    private CandidateController candidateController;
//
//    @Test
//    void testFindCandidateById() {
//        int candidateId = 1;
//        Candidate candidate = new Candidate();
//
//        when(candidateService.getCandidateById(candidateId)).thenReturn(candidate);
//        when(candidateMapper.convertCandidateEntityToDTO(candidate)).thenReturn(new CandidateDTO());
//
//        ResponseEntity<CandidateDTO> response = candidateController.getCandidateById(candidateId);
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        verify(candidateService, times(1)).getCandidateById(candidateId);
//        verify(candidateMapper, times(1)).convertCandidateEntityToDTO(candidate);
//    }
//
//    @Test
//    void testSaveCandidatesList() {
//        List<CandidateDTO> candidateDtoList = new ArrayList<>();
//        candidateDtoList.add(new CandidateDTO());
//        when(candidateMapper.convertCandidateDTOtoEntity(any())).thenReturn(new Candidate());
//        when(candidateService.save(any())).thenReturn(new Candidate());
//
//        ResponseEntity<List<Candidate>> response = candidateController.saveCandidatesList(candidateDtoList);
//
//        assertEquals(HttpStatus.CREATED, response.getStatusCode());
//        assertNotNull(response.getBody());
//        assertEquals(candidateDtoList.size(), response.getBody().size());
//        verify(candidateMapper, times(candidateDtoList.size())).convertCandidateDTOtoEntity(any());
//        verify(candidateService, times(candidateDtoList.size())).save(any());
//    }
//
//    @Test
//    void testGetCandidateReport() {
//        int candidateId = 1;
//        Report report = new Report();
//        when(candidateService.getReportByCandidateId(candidateId)).thenReturn(report);
//        when(reportMapper.convertReportEntityToDTO(report)).thenReturn(new ReportDTO());
//
//        ResponseEntity<ReportDTO> response = candidateController.getCandidateReport(candidateId);
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertNotNull(response.getBody());
//        verify(candidateService, times(1)).getReportByCandidateId(candidateId);
//        verify(reportMapper, times(1)).convertReportEntityToDTO(report);
//    }
//
//    @Test
//    void testGetCandidateCourtSearches() {
//        int candidateId = 1;
//        List<CourtSearch> courtSearches = new ArrayList<>();
//
//        when(candidateService.getSearchesForCandidateId(candidateId)).thenReturn(courtSearches);
//        when(courtSearchMapper.convertToCourtSearchDTOS(courtSearches)).thenReturn(new ArrayList<>());
//
//        ResponseEntity<List<CourtSearchDTO>> response = candidateController.getCandidateCourtSearches(candidateId);
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertNotNull(response.getBody());
//        verify(candidateService, times(1)).getSearchesForCandidateId(candidateId);
//        verify(courtSearchMapper, times(1)).convertToCourtSearchDTOS(courtSearches);
//    }
//
//    @Test
//    void testGetAllCandidatesForUser() {
//        int userId = 1;
//        int pageNumber = 0;
//        int pageSize = 10;
//
//        Page<Candidate> candidatePage = mock(Page.class);
//        List<Candidate> candidateList = candidatePage.getContent();
//        when(candidatePage.getTotalPages()).thenReturn(2); // Set the expected total pages
//        when(candidatePage.getTotalElements()).thenReturn(20L); // Set the expected total elements
//
//        when(candidateService.fetchAllCandidatesWithReportsAndCourtSearches(userId, pageNumber, pageSize))
//                .thenReturn(candidatePage);
//        when(candidateMapper.convertCandidateEntitiesToDTOs(candidateList)).thenReturn(new ArrayList<>());
//
//        ResponseEntity<PageResponse<CandidateDTO>> response = candidateController.getAllCandidatesForUser(userId, pageNumber, pageSize);
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertNotNull(response.getBody());
//        verify(candidateService, times(1)).fetchAllCandidatesWithReportsAndCourtSearches(userId, pageNumber, pageSize);
//        verify(candidateMapper, times(1)).convertCandidateEntitiesToDTOs(candidateList);
//    }
//
//    @Test
//    void testUpdateCandidateReport() {
//        int candidateId = 1;
//        ReportDTO reportDTO = new ReportDTO();
//        Report report = new Report();
//
//        when(candidateService.updateReportByCandidateId(candidateId, reportDTO)).thenReturn(report);
//        when(reportMapper.convertReportEntityToDTO(report)).thenReturn(new ReportDTO());
//
//        ResponseEntity<ReportDTO> response = candidateController.updateCandidateReport(candidateId, reportDTO);
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertNotNull(response.getBody());
//        verify(candidateService, times(1)).updateReportByCandidateId(candidateId, reportDTO);
//        verify(reportMapper, times(1)).convertReportEntityToDTO(report);
//    }
//
//    @Test
//    void testGetAllCandidatesForUserWithInvalidPageNumber() {
//        int userId = 1;
//        int invalidPageNumber = -1;
//        int validPageSize = 10;
//
//        InvalidPaginationParam response = assertThrows(InvalidPaginationParam.class, () ->
//                candidateController.getAllCandidatesForUser(userId, invalidPageNumber, validPageSize)
//        );
//
//        assertEquals(INVALID_PAGINATION_PAGE_NUMBER_EXCEPTION, response.getMessage());
//    }
//
//    @Test
//    void testGetAllCandidatesForUserWithInvalidPageSize() {
//        int userId = 1;
//        int validPageNumber = 1;
//        int inValidPageSize = -1;
//
//        InvalidPaginationParam response = assertThrows(InvalidPaginationParam.class, () ->
//                candidateController.getAllCandidatesForUser(userId, validPageNumber, inValidPageSize)
//        );
//
//        assertEquals(INVALID_PAGINATION_PAGE_SIZE_EXCEPTION, response.getMessage());
//    }
//
//    @Test
//    void getCandidatesByUserIdCount() {
//        int userId = 1;
//        long expectedCount = 5L;
//
//        when(candidateService.getCandidateCountByUserId(userId)).thenReturn(expectedCount);
//        ResponseEntity<Long> responseEntity = candidateController.getCandidatesByUserIdCount(userId);
//        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//        assertEquals(expectedCount, responseEntity.getBody());
//        verify(candidateService, times(1)).getCandidateCountByUserId(userId);
//    }
}
