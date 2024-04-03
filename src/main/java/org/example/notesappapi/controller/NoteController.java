package org.example.notesappapi.controller;

import org.example.notesappapi.model.Note;
import org.example.notesappapi.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<String> addNote(@RequestBody Map<String, String> noteData) {
        if (noteService.add(noteData.get("title"), noteData.get("content"))) {
            return new ResponseEntity<>("Note added successfully", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Error adding note", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete-note/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable Long id) {
        Note note = noteService.findById(id);
        if (note == null) {
            return new ResponseEntity<>("Note not found", HttpStatus.NOT_FOUND);
        }
        if(noteService.deleteById(id)) {
            return new ResponseEntity<>("Note deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error deleting note", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/update-note/{id}")
    public ResponseEntity<String> updateNote(@PathVariable Long id, @RequestBody Map<String, String> noteData) {
        if (noteService.update(id, noteData.get("title"), noteData.get("content"))) {
            System.out.println("Note updated successfully");
            return new ResponseEntity<>("Note updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error updating note", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
