package com.checkr.candidateservice.service;

import com.checkr.candidateservice.dto.ReportDTO;
import com.checkr.candidateservice.entity.Candidate;
import com.checkr.candidateservice.entity.CourtSearch;
import com.checkr.candidateservice.entity.Report;
import com.checkr.candidateservice.exception.CandidateNotFound;
import com.checkr.candidateservice.exception.CourtSearchesNotFound;
import com.checkr.candidateservice.exception.InvalidEmailFormatException;
import com.checkr.candidateservice.exception.ReportNotFound;
import com.checkr.candidateservice.repository.CandidateRepository;
import com.checkr.candidateservice.repository.ReportRepository;
import com.checkr.candidateservice.utility.CandidateUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.regex.Pattern;

import static com.checkr.candidateservice.constants.CandidateServiceConstants.EMAIL_PATTERN;

@Service
public class CandidateServiceImpl implements CandidateService {
    private static final Logger logger = LoggerFactory.getLogger(CandidateServiceImpl.class);
    private final CandidateRepository candidateRepository;
    private final ReportRepository reportRepository;
    private final CandidateUtility candidateUtility;
    private EmailService emailService;

    @Autowired
    public CandidateServiceImpl(CandidateRepository candidateRepository, ReportRepository reportRepository, CandidateUtility candidateUtility,EmailService emailService) {
        this.candidateRepository = candidateRepository;
        this.reportRepository = reportRepository;
        this.candidateUtility = candidateUtility;
        this.emailService = emailService;

    }

    @Override
    public Candidate getCandidateById(int candidateId) {
        logger.debug("Fetching candidate by ID: {}", candidateId);
        Optional<Candidate> candidate = candidateRepository.findById(candidateId);
        if (!candidate.isPresent()) {
            logger.error("Candidate not found with ID: {}", candidateId);
            throw new CandidateNotFound("candidate not found with id: " + candidateId);
        }
        return candidate.get();
    }
    private boolean isValidEmail(String email) {
        String emailPattern = EMAIL_PATTERN;
        return Pattern.matches(emailPattern, email);
    }
    @Override
    public Report getReportByCandidateId(int candidateId) {
        logger.info("Fetching report by candidate ID: {}", candidateId);
        Candidate candidateData = getCandidateById(candidateId);
        Report reportData = candidateData.getReport();
        if (reportData == null) {
            logger.error("Report not found with candidate ID: {}", candidateId);
            throw new ReportNotFound("report not found with candidateId: " + candidateId);
        }
        return reportData;
    }
    public static String calculateDifference(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        Duration duration = Duration.between(startDateTime, endDateTime);

        // Extract the duration in days, hours, and minutes
        long days = duration.toDays();
        long hours = duration.toHours() % 24;
        long minutes = duration.toMinutes() % 60;

        // Create a formatted string
        return String.format("%d days, %d hours, %d minutes", days, hours, minutes);
    }

    @Override
    public Report updateReportByCandidateId(HttpServletRequest request
    ,int candidateId, ReportDTO reportDTO,String violation) {
        logger.info("Updating report for candidate ID: {}", candidateId);
        Report fetchedReport = reportRepository.findByCandidateId(candidateId);
        fetchedReport.setStatus(reportDTO.getStatus());
        fetchedReport.setAdjudication(reportDTO.getAdjudication());
        fetchedReport.setCompletedAt(LocalDateTime.now());
        fetchedReport.setTurnAroundTime(calculateDifference(fetchedReport.getCreatedAt(),fetchedReport.getCompletedAt()));
        if(fetchedReport.getAdjudication().equals("ADVERSE ACTION")) {
            System.out.println("senddddd notice");
            sendNotice(candidateId, request,violation);
        }
        return reportRepository.save(fetchedReport);
    }

    public void sendNotice(int candidateId,HttpServletRequest request,String violation
) throws CandidateNotFound {
        Optional<Candidate> candidate=candidateRepository.findById(candidateId);
        if (isValidEmail(candidate.get().getEmail())) {
//            Optional<Candidate> candidateByEmail = candidateRepository.findByEmail(candidate.get().getEmail());
//            if (!candidateByEmail.isPresent()) {
//                throw new CandidateNotFound(String.format(CANDIDATE_WITH_EMAIL_NOT_FOUND, email));
//            }
            Candidate candidate1 = candidate.get();
//            createForgotPasswordOtpForUser(user, otp);
            emailService.sendEmail(candidate1,request,violation);
        } else {
            throw new InvalidEmailFormatException("email format exception");
        }
    }

    @Override
    public List<CourtSearch> getSearchesForCandidateId(int candidateId) {
        logger.info("Fetching court searches for candidate ID: {}", candidateId);
        Candidate candidateData = getCandidateById(candidateId);
        List<CourtSearch> courtSearchList = candidateData.getCourtSearches();
        if (courtSearchList.isEmpty()) {
            logger.error("No court searches found for candidate ID: {}", candidateId);
            throw new CourtSearchesNotFound("no court search found for the candidate: " + candidateId);
        }
        return courtSearchList;
    }

    public Page<Candidate> fetchAllCandidatesWithReportsAndCourtSearches(int userId, int page, int size) {
        logger.info("Fetching all candidates with reports and court searches for user ID: {}", userId);
        Pageable pageable = PageRequest.of(page, size);
        return candidateRepository.findAllByUserId(userId, pageable);
    }
    public List<Candidate> fetchAllCandidatesWithReportsAndCourtSearches(int userId, LocalDateTime reportFromDate, LocalDateTime reportToDate) {
        System.out.println("Original Time in BE: " + reportFromDate + " " + reportToDate);

        if (reportFromDate != null && reportToDate != null) {
            // Subtract one day from both dates
            LocalDateTime adjustedReportFromDate = reportFromDate.minusDays(1);
            LocalDateTime adjustedReportToDate = reportToDate.minusDays(1);

            System.out.println("Adjusted Time in BE: " + adjustedReportFromDate + " " + adjustedReportToDate);

            return candidateRepository.findAllByUserIdAndReportDateRange(userId, adjustedReportFromDate, adjustedReportToDate);
        } else {
            return candidateRepository.findAllByUserId(userId);
        }
    }

    @Override
    public Candidate save(Candidate candidate) {
        logger.info("Saving candidate with ID: {}", candidate.getId());
        LocalDateTime now = LocalDateTime.now();
        candidate.setCreatedAt(now);
        candidate.setUpdatedAt(now);
        candidateUtility.saveCourtSearch(candidate);
        candidateUtility.setReportForCandidate(candidate);
        return candidateRepository.save(candidate);
    }

    @Override
    public long getCandidateCountByUserId(int userId) {
        return candidateRepository.countByUserId(userId);
    }
}
