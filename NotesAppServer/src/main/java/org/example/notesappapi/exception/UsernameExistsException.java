package org.example.notesappapi.exception;

public class UsernameExistsException extends RuntimeException {
    public UsernameExistsException() {
        super("username already exists");
    }
}
