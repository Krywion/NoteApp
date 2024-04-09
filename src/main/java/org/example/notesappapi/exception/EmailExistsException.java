package org.example.notesappapi.exception;

public class EmailExistsException extends RuntimeException {
    public EmailExistsException() {
        super("email already exists");
    }
}
