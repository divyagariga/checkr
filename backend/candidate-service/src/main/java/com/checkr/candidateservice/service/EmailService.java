package com.checkr.candidateservice.service;


import com.checkr.candidateservice.constants.CandidateServiceConstants;
import com.checkr.candidateservice.entity.Candidate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import static com.checkr.candidateservice.constants.CandidateServiceConstants.*;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public String sendEmail(Candidate candidate, HttpServletRequest request,String violation) {
        javaMailSender.send(constructNoticeEmail(request.getContextPath(),candidate ,violation));
        return SENT_MAIL;
    }

    private SimpleMailMessage constructNoticeEmail(
            String contextPath, Candidate candidate,String violation) {
        String name="";
        if(candidate.getName().isEmpty())
             name=candidate.getEmail();
        else
            name= candidate.getName();

        String body= String.format(BODY,name,"Checkr-BPO",violation,"Checkr-BPO");
        return constructEmail(SUBJECT, body , candidate);
    }

    private SimpleMailMessage constructEmail(String subject, String body,
                                             Candidate candidate) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(candidate.getEmail());
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(body);

        return simpleMailMessage;
    }
}
