package org.example.notesappapi.controller;

import org.example.notesappapi.model.AppUser;
import org.example.notesappapi.model.AuthenticationResponse;
import org.example.notesappapi.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    private final AuthenticationService authService;

    AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> addUser(@RequestBody AppUser request) {
        return new ResponseEntity<>(authService.register(request), HttpStatus.OK);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AppUser user) {
        return new ResponseEntity<>(authService.authenticate(user), HttpStatus.OK);
    }
}
