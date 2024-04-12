package org.example.notesappapi.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMail(String to, String subject, String text) {
        // implementation
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(to));
            message.setSubject(subject);
            message.setText(text, "utf-8", "html");
        } catch (AddressException e) {
            System.out.println("Invalid email address");
        } catch (MessagingException e) {
            System.out.println("Error sending email");
        }


        javaMailSender.send(message);
    }
}
