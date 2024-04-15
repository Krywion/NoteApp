package org.example.notesappapi.service;

import org.example.notesappapi.exception.EmailExistsException;
import org.example.notesappapi.exception.UsernameExistsException;
import org.example.notesappapi.model.AppUser;
import org.example.notesappapi.model.AuthenticationResponse;
import org.example.notesappapi.model.Role;
import org.example.notesappapi.repository.AppUserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final MailService mailService;

    public AuthenticationService(AppUserRepository appUserRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager,
                                 MailService mailService) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.mailService = mailService;
    }

    public AuthenticationResponse register(AppUser request) throws UsernameExistsException, EmailExistsException {

        if(appUserRepository.findUserByUsername(request.getUsername()).isPresent()) {
            throw new UsernameExistsException();
        }

        if(appUserRepository.findUserByEmail(request.getEmail()).isPresent()) {
            throw new EmailExistsException();
        }

        AppUser user = new AppUser();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setVerificationCode(java.util.UUID.randomUUID().toString());

        if(request.getRole() == null) {
            user.setRole(Role.USER);
        } else {
            user.setRole(request.getRole());
        }


        user = appUserRepository.save(user);

        String to = user.getEmail();
        String subject = "Verify your email address";
        String message = "<h1>Notes App</h1><br>" +
                "<p>Click the link below to verify your email address</p><br>" +
                "<a href='http://localhost:8080/verify?code=" + user.getVerificationCode() +
                "'>Verify Email</a>";

        mailService.sendMail(to, subject, message);

        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(AppUser request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        AppUser user = appUserRepository.findUserByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }

    public String getAuthenticatedUser(Principal principal) {
        return principal.getName();
    }

    public String verifyUser(String code) {
        Optional<AppUser> user = appUserRepository.findUserByVerificationCode(code);
        if(user.isEmpty()) {
            return "Invalid verification code";
        }

        AppUser appUser = user.get();
        appUser.setEnabled(true);
        appUser.setVerificationCode(null);
        appUserRepository.save(appUser);
        System.out.println("User verified");

        return "Email verified successfully";
    }
}
