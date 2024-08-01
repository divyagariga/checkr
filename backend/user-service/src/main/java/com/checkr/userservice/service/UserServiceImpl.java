package com.checkr.userservice.service;

import com.checkr.userservice.repository.ForgotPasswordOtpRepository;
import com.checkr.userservice.repository.UserRepository;
import com.checkr.userservice.dto.*;
import com.checkr.userservice.entity.ForgotPasswordOtp;
import com.checkr.userservice.entity.User;
import com.checkr.userservice.exception.*;
import com.checkr.userservice.mappers.UserMapper;
import com.checkr.userservice.security.AuthenticationService;
import com.checkr.userservice.security.JsonWebTokenService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static com.checkr.userservice.constants.UserServiceConstants.*;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final SecureRandom secureRandom;
    private UserRepository userRepository;
    private UserMapper userMapper;
    private AuthenticationService authenticationService;
    private JsonWebTokenService jsonWebTokenService;
    private ForgotPasswordOtpRepository forgotPasswordOtpRepository;
    private EmailService emailService;
    private RestTemplate restTemplate;

//    @Value("${candidates.url}")
    private String candidateEndpointUrl="http://localhost:9191/api/v1/candidates/save-candidates";

    @Value("${token.expiry.time}")
    private long tokenExpiry;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, AuthenticationService authenticationService, JsonWebTokenService jsonWebTokenService,
                           ForgotPasswordOtpRepository forgotPasswordOtpRepository, EmailService emailService, RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.authenticationService = authenticationService;
        this.jsonWebTokenService = jsonWebTokenService;
        this.forgotPasswordOtpRepository = forgotPasswordOtpRepository;
        this.emailService = emailService;
        this.restTemplate = restTemplate;
        this.secureRandom = new SecureRandom();
    }

    @Override
    public UserResponse addUser(UserRegistrationRequestDTO userRegistrationRequestDTO) throws UserWithEmailAlreadyExistsException {
        Optional<User> userByEmail = userRepository.findByEmail(userRegistrationRequestDTO.getEmail());

        if (!userByEmail.isPresent()) {
            System.out.println("reached");
            User user = userMapper.convertUserDtoToUser(userRegistrationRequestDTO);
            saveUserWithPassword(user, userRegistrationRequestDTO.getPassword());
//            saveCandidatesForUser(user.getId());
            return userMapper.createUserLoginResponse(user, jsonWebTokenService.generateToken(user));
        } else {
            throw new UserWithEmailAlreadyExistsException(String.format(USER_WITH_EMAIL_ALREADY_EXISTS, userRegistrationRequestDTO.getEmail()));
        }
    }

    private void saveCandidatesForUser(int userId) {
        List<CandidateDTO> candidateDTOs = getCandidateDTOs();
        candidateDTOs = candidateDTOs.stream()
                .map(candidateDTO -> {
                    candidateDTO.setUserId(userId);
                    return candidateDTO;
                })
                .toList();

        String jsonRequestBody = getJsonRequestBody(candidateDTOs);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        System.out.println();
        try {
            restTemplate.exchange(candidateEndpointUrl, HttpMethod.POST, new HttpEntity<>(jsonRequestBody, headers), String.class);
        } catch (Exception exception) {
            throw new CandidatesCreationException(exception.getMessage());
        }
    }

    private static String getJsonRequestBody(List<CandidateDTO> candidateDTOs) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        String jsonRequestBody = "";
        try {
            jsonRequestBody = objectMapper.writeValueAsString(candidateDTOs);
        } catch (JsonProcessingException jsonRequestProcessingException) {
            logger.error(EXCEPTION_MESSAGE+JSON_EXCEPTION);
            throw new InappropriateCandidatesException(jsonRequestProcessingException.getMessage());
        }
        return jsonRequestBody;
    }

    @Override
    public UserResponse loginUser(UserLoginRequest userLoginRequest) throws InvalidCredentialsException, UserNotFoundException {
        User user = authenticationService.authenticateUser(userLoginRequest.getEmail(), userLoginRequest.getPassword());
        return userMapper.createUserLoginResponse(user, jsonWebTokenService.generateToken(user));
    }

    @Override
    public UserResponse loginUserWithAuth(UserLoginRequest userLoginRequest) throws UserNotFoundException, InvalidCredentialsException {
        UserRegistrationRequestDTO dto=new UserRegistrationRequestDTO("",userLoginRequest.getEmail(),"");
        return userRepository.findByEmail(userLoginRequest.getEmail())
                .map(user -> userMapper.createUserLoginResponse(user, jsonWebTokenService.generateToken(user)))
                .orElseGet(() -> addUser(dto));
    }

    @Override
    public UserResponse findUserByEmail(String email) throws UserNotFoundException {
        Optional<User> userByEmail = userRepository.findByEmail(email);

        if (!userByEmail.isPresent()) {
            throw new UserNotFoundException(String.format(USER_WITH_EMAIL_NOT_FOUND, email));
        }
        return userMapper.createUserLoginResponse(userByEmail.get(), null);
    }

    @Override
    public void sendOtpToUserEmail(HttpServletRequest request, String email) throws UserNotFoundException {
        if (isValidEmail(email)) {
            Optional<User> userByEmail = userRepository.findByEmail(email);

            if (!userByEmail.isPresent()) {
                throw new UserNotFoundException(String.format(USER_WITH_EMAIL_NOT_FOUND, email));
            }
            User user = userByEmail.get();
            String otp = generateOTP();
            createForgotPasswordOtpForUser(user, otp);
            emailService.sendEmail(otp, user, request);
        } else {
            throw new InvalidEmailFormatException(String.format(INVALID_EMAIL_EXCEPTION, email));
        }
    }

    private String generateOTP() {
        return secureRandom.ints(OTP_LENGTH, 0, OTP_NUMBERS.length())
                .mapToObj(OTP_NUMBERS::charAt)
                .map(Object::toString)
                .collect(Collectors.joining());
    }
    public Boolean validatetoken(String token) {
       return jsonWebTokenService.validateAccessToken(token);
    }

    private void createForgotPasswordOtpForUser(User user, String otp) {
        Optional<ForgotPasswordOtp> forgotPasswordOtpByEmail = forgotPasswordOtpRepository.findByUserEmail((user.getEmail()));

        ForgotPasswordOtp forgotPasswordOtp = null;

        if (forgotPasswordOtpByEmail.isPresent()) {
            forgotPasswordOtp = forgotPasswordOtpByEmail.get();
        } else {
            forgotPasswordOtp = new ForgotPasswordOtp();
            forgotPasswordOtp.setUser(user);
        }

        forgotPasswordOtp.setOtp(otp);
        forgotPasswordOtp.setExpiryDate(LocalDateTime.now().plusSeconds(tokenExpiry));
        forgotPasswordOtpRepository.save(forgotPasswordOtp);
    }

    private void saveUserWithPassword(User user, String password) {
        user.setPassword(authenticationService.encodePassword(password));
        userRepository.save(user);
    }

    private boolean isValidEmail(String email) {
        String emailPattern = EMAIL_PATTERN;
        return Pattern.matches(emailPattern, email);
    }

    public List<CandidateDTO> getCandidateDTOs() {
        String[] names = {"John Smith", "Serene", "Walsh", "Maurizia", "Kendre", "Erastus", "Jereme", "John Smith", "Cari", "Kimble", "Steffe", "Mike", "Charles"};
        String[] emails = {"john@gmail.com", "serene@gmail.com", "walsh@gmail.com", "maurizia@gmail.com", "kendre@gmail.com", "erastus@gmail.com", "jereme@gmail.com",
                "john.smith@gmail.com", "cari@gmail.com", "kimble@gmail.com", "steffe@gmail.com", "mike@gmail.com", "charles@gmail.com"};
        String[] locations = {"Barrouallie", "Vänersborg", "Sukamanah", "Sukamanah", "Beutong Ateuh", "Höviyn Am", "Sharïngol", "Lianyun", "Taboão da Serra", "Veselí nad Moravou", "Barrouallie", "Vänersborg", "Sharïngol"};
        String[] statuses = {CLEAR, CLEAR, CONSIDER, CLEAR, CLEAR, CLEAR, CONSIDER, CONSIDER, CONSIDER, CONSIDER, CLEAR, CLEAR, CLEAR};

        return createCandidateDtoList(names, emails, locations, statuses);
    }

    private static List<CandidateDTO> createCandidateDtoList(String[] names, String[] emails, String[] locations, String[] statuses) {
        List<CandidateDTO> candidateDTOList = new ArrayList<>();
        for (int i = 0; i < 13; i++) {
            candidateDTOList.add(getCandidateDTO(names[i], emails[i], locations[i], statuses[i]));
        }

        return candidateDTOList;
    }

    private static CandidateDTO getCandidateDTO(String name, String email, String location, String status) {
        CandidateDTO candidateDTO = new CandidateDTO();
        candidateDTO.setName(name);
        candidateDTO.setEmail(email);
        candidateDTO.setLocation(location);
        candidateDTO.setDateOfBirth(getDOB());
        candidateDTO.setZipCode(ZIP_CODE);
        candidateDTO.setPhone(PHONE_NUMBER);
        candidateDTO.setSocialSecurityNumber(SSN);
        candidateDTO.setDriverLicense(DRIVER_LICENSE);

        ReportDTO reportDTO = new ReportDTO();
        reportDTO.setStatus(status);
        reportDTO.setAdjudication(ADJUDICATION);

        candidateDTO.setReport(reportDTO);

        return candidateDTO;
    }

    private static LocalDate getDOB() {
        return LocalDate.parse(SAMPLE_DATE, DATE_FORMATTER);
    }
}
