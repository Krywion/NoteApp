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

@Service
public class AuthenticationService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
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

        if(request.getRole() == null) {
            user.setRole(Role.USER);
        } else {
            user.setRole(request.getRole());
        }


        user = appUserRepository.save(user);

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
}
