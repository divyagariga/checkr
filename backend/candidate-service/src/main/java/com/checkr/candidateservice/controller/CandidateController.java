package com.checkr.candidateservice.controller;

import com.checkr.candidateservice.dto.CandidateDTO;
import com.checkr.candidateservice.dto.CourtSearchDTO;
import com.checkr.candidateservice.dto.PageResponse;
import com.checkr.candidateservice.dto.ReportDTO;
import com.checkr.candidateservice.entity.Candidate;
import com.checkr.candidateservice.entity.CourtSearch;
import com.checkr.candidateservice.entity.Report;
import com.checkr.candidateservice.exception.InvalidPaginationParam;
import com.checkr.candidateservice.mapper.CandidateMapper;
import com.checkr.candidateservice.mapper.CourtSearchMapper;
import com.checkr.candidateservice.mapper.ReportMapper;
import com.checkr.candidateservice.service.CandidateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import static com.checkr.candidateservice.constants.CandidateServiceConstants.*;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
@RestController
@RequestMapping("/api/v1/candidates")
@CrossOrigin(origins = "http://localhost:3001")
public class CandidateController {

    private final Logger logger = LoggerFactory.getLogger(CandidateController.class);

    private final CandidateMapper candidateMapper;

    private final CourtSearchMapper courtSearchMapper;

    private final ReportMapper reportMapper;

    private final CandidateService candidateService;

    public CandidateController(CandidateMapper candidateMapper, CourtSearchMapper courtSearchMapper, ReportMapper reportMapper, CandidateService candidateService) {
        this.candidateMapper = candidateMapper;
        this.courtSearchMapper = courtSearchMapper;
        this.candidateService = candidateService;
        this.reportMapper = reportMapper;
    }

    @GetMapping("/{candidateId}")
    public ResponseEntity<CandidateDTO> getCandidateById(@PathVariable int candidateId) {
        logger.info("Fetching candidate by ID: {}", candidateId);
        Candidate candidate = candidateService.getCandidateById(candidateId);
        CandidateDTO candidateDTO = candidateMapper.convertCandidateEntityToDTO(candidate);
        return ResponseEntity.ok(candidateDTO);
    }
    @GetMapping("/{candidateId}/reports")
    public ResponseEntity<ReportDTO> getCandidateReport(@PathVariable int candidateId) {
        logger.info("Fetching report for candidate ID: {}", candidateId);
        Report report = candidateService.getReportByCandidateId(candidateId);
        ReportDTO reportDTO = reportMapper.convertReportEntityToDTO(report);
        return ResponseEntity.ok(reportDTO);
    }

    @GetMapping("/{candidateId}/court-searches")
    public ResponseEntity<List<CourtSearchDTO>> getCandidateCourtSearches(@PathVariable int candidateId) {
        logger.info("Fetching court searches for candidate ID: {}", candidateId);
        List<CourtSearch> courtSearches = candidateService.getSearchesForCandidateId(candidateId);
        List<CourtSearchDTO> courtSearchDTOs = courtSearchMapper.convertToCourtSearchDTOS(courtSearches);
        return ResponseEntity.ok(courtSearchDTOs);
    }

    @PostMapping("/save-candidates")
    public ResponseEntity<List<Candidate>> saveCandidatesList(@RequestBody List<CandidateDTO> candidateDtoList) {
        logger.info("Saving a list of candidates");
        List<Candidate> savedCandidatesList = candidateDtoList.stream()
                .map(candidateMapper::convertCandidateDTOtoEntity)
                .map(candidateService::save)
                .toList();

        return ResponseEntity.status(HttpStatus.CREATED).body(savedCandidatesList);
    }
    @PostMapping
    public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate candidate) {
        Candidate savedCandidate = candidateService.save(candidate);
        return new ResponseEntity<>(savedCandidate, HttpStatus.CREATED);
    }

    @GetMapping("/users/{userId}/candidate-info")
    public ResponseEntity<PageResponse<CandidateDTO>> getAllCandidatesForUser(@PathVariable int userId,
                                                                              @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
                                                                              @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
        validatePaginationParameters(pageNumber, pageSize);
        logger.info("Fetching all candidates for user ID: {} with pageNumber: {} and pageSize: {}", userId, pageNumber, pageSize);

        Page<Candidate> candidatePage = candidateService.fetchAllCandidatesWithReportsAndCourtSearches(userId, pageNumber, pageSize);
        List<Candidate> candidateList = candidatePage.getContent();
        List<CandidateDTO> candidateDTOs = candidateMapper.convertCandidateEntitiesToDTOs(candidateList);
        PageResponse<CandidateDTO> pageResponse = new PageResponse<>(
                candidateDTOs,
                pageNumber,
                pageSize,
                candidatePage.getTotalPages(),
                candidatePage.getTotalElements()
        );

        return ResponseEntity.ok(pageResponse);
    }



    @PatchMapping("/{candidateId}/reports")
    public ResponseEntity<ReportDTO> updateCandidateReport(HttpServletRequest request
    ,@PathVariable int candidateId, @RequestBody ReportDTO reportDTO,@RequestParam String violation ) {
        logger.info("Updating report for candidate ID: {}", candidateId);
        logger.info("violaion",violation);
        System.out.println("vio "+violation);
        Report report = candidateService.updateReportByCandidateId( request,
        candidateId, reportDTO,violation);
        return new ResponseEntity<>(reportMapper.convertReportEntityToDTO(report), HttpStatus.OK);
    }

    @GetMapping("users/{userId}/candidate-count")
    public ResponseEntity<Long> getCandidatesByUserIdCount(@PathVariable int userId) {
        logger.info("getting total candidates count for userId: {}", userId);
        long totalCandidatesCount = candidateService.getCandidateCountByUserId(userId);
        return new ResponseEntity<>(totalCandidatesCount,HttpStatus.OK);
    }

    @GetMapping("/users/{userId}/download-excel")
        public ResponseEntity<byte[]> downloadExcel(
            @PathVariable int userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime reportFromDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime reportToDate) throws IOException {

        List<Candidate> candidates = candidateService.fetchAllCandidatesWithReportsAndCourtSearches(userId,reportFromDate,reportToDate);

            // Create a new Excel workbook and sheet
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Candidates");

            // Create header row
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Name");
            headerRow.createCell(1).setCellValue("Email");
            headerRow.createCell(2).setCellValue("Phone");
            headerRow.createCell(3).setCellValue("Date of Birth");
            headerRow.createCell(4).setCellValue("Zip Code");
            headerRow.createCell(5).setCellValue("Social Security Number");
            headerRow.createCell(6).setCellValue("Driver License");
            headerRow.createCell(7).setCellValue("Location");
            headerRow.createCell(8).setCellValue("Report Status");
            headerRow.createCell(9).setCellValue("Report Adjudication");
            headerRow.createCell(10).setCellValue("Report Package Type");
            headerRow.createCell(11).setCellValue("Report Turn Around Time");
        headerRow.createCell(12).setCellValue("Report Created Date");

            // Populate the data
            int rowIdx = 1;
            for (Candidate candidate : candidates) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(candidate.getName());
                row.createCell(1).setCellValue(candidate.getEmail());
                row.createCell(2).setCellValue(candidate.getPhone());
                row.createCell(3).setCellValue(candidate.getDateOfBirth().toString());
                row.createCell(4).setCellValue(candidate.getZipCode());
                row.createCell(5).setCellValue(candidate.getSocialSecurityNumber());
                row.createCell(6).setCellValue(candidate.getDriverLicense());
                row.createCell(7).setCellValue(candidate.getLocation());

                Report report = candidate.getReport();
                if (report != null) {
                    row.createCell(8).setCellValue(report.getStatus());
                    row.createCell(9).setCellValue(report.getAdjudication());
                    row.createCell(10).setCellValue(report.getPackageType());
                    row.createCell(11).setCellValue(report.getTurnAroundTime());
                    row.createCell(12).setCellValue(report.getCreatedAt().toString());

                } else {
                    row.createCell(8).setCellValue("No Report");
                    row.createCell(9).setCellValue("No Report");
                    row.createCell(10).setCellValue("No Report");
                    row.createCell(11).setCellValue("No Report");
                    row.createCell(12).setCellValue("No Report");

                }
            }

            // Write the workbook to a ByteArrayOutputStream
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            workbook.write(stream);
            workbook.close();

            // Set response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment", "CandidatesReport.xlsx");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(stream.toByteArray());

    }
    private void validatePaginationParameters(int pageNumber, int pageSize) {
        if(pageNumber < 0) {
            logger.error(INVALID_PAGINATION_PAGE_NUMBER_EXCEPTION);
            throw new InvalidPaginationParam(INVALID_PAGINATION_PAGE_NUMBER_EXCEPTION);
        } else if (pageSize <= 0) {
            logger.error(INVALID_PAGINATION_PAGE_SIZE_EXCEPTION);
            throw new InvalidPaginationParam(INVALID_PAGINATION_PAGE_SIZE_EXCEPTION);
        }
    }
}
