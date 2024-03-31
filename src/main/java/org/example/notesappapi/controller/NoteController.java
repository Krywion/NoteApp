package org.example.notesappapi.controller;

import org.example.notesappapi.model.Note;
import org.example.notesappapi.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/notes")
    public ResponseEntity<List<Note>> getNotes() {
        return new ResponseEntity<>(noteService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/add-note")
    public ResponseEntity<String> addNote(@RequestParam("title") String title, @RequestParam("content") String content) {
        noteService.save(title, content);
        return new ResponseEntity<>("Note added successfully", HttpStatus.CREATED);
    }
}
