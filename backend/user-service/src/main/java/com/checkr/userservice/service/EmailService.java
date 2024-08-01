package com.checkr.userservice.service;

import com.checkr.userservice.entity.User;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

import static com.checkr.userservice.constants.UserServiceConstants.*;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public String sendEmail(String token, User user, HttpServletRequest request) {
        javaMailSender.send(constructResetTokenEmail(request.getContextPath(), token, user));
        return SENT_MAIL;
    }

    private SimpleMailMessage constructResetTokenEmail(
            String contextPath, String otp, User user) {
        String url = contextPath + MESSAGE_CONTENT_URL + otp;
        return constructEmail(FORGOT_PASSWORD_SUBJECT, RESET_EMAIL_BODY + " \r\n" + url, user);
    }

    private SimpleMailMessage constructEmail(String subject, String body,
                                             User user) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(body);

        return simpleMailMessage;
    }
}
