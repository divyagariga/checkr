package com.checkr.userservice.service;

import com.checkr.userservice.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;

import javax.servlet.http.HttpServletRequest;

import static com.checkr.userservice.constants.UserServiceConstants.SENT_MAIL;
import static org.mockito.MockitoAnnotations.openMocks;

@ExtendWith(MockitoExtension.class)
class EmailServiceTests {
    @Mock
    private JavaMailSender javaMailSender;

    @Mock
    private HttpServletRequest httpRequest;

    @InjectMocks
    private EmailService emailService;

    @BeforeEach
    public void setUp() {
        openMocks(this);
    }

    @Test
    void testSendEmail(){
        User user = new User();
        user.setEmail("test@gmail.com");
        user.setName("User");

        String message = emailService.sendEmail("token", user, httpRequest);
        Assertions.assertEquals(SENT_MAIL, message);
    }
}
