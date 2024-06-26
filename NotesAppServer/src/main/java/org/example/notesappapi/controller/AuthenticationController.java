package org.example.notesappapi.controller;

import org.example.notesappapi.exception.EmailExistsException;
import org.example.notesappapi.exception.UsernameExistsException;
import org.example.notesappapi.model.AppUser;
import org.example.notesappapi.model.AuthenticationResponse;
import org.example.notesappapi.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.security.Principal;

@RestController
public class AuthenticationController {

    @Value("${redirect.url}")
    private String redirectUrl;
    private final AuthenticationService authService;

    AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> addUser(@RequestBody AppUser request) {
        try {
            return new ResponseEntity<>(authService.register(request), HttpStatus.OK);
        } catch (UsernameExistsException e) {
            return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
        } catch (EmailExistsException e) {
            return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("Error registering user", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/sign-in")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AppUser user) {
        return new ResponseEntity<>(authService.authenticate(user), HttpStatus.OK);
    }

    @GetMapping("/auth/me")
    public ResponseEntity<String> getAuthenticatedUser(Principal principal) {
        return new ResponseEntity<>(authService.getAuthenticatedUser(principal), HttpStatus.OK);
    }


    // http://localhost:8080/verify?code=b5e9ed38-3316-4f84-a9f4-5eb9bea24e2a
    @GetMapping("/verify")
    public RedirectView verifyUser(@RequestParam("code") String code) {
        authService.verifyUser(code);
        String url = redirectUrl + "/verify";
        return new RedirectView(url);
    }

}
