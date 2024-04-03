package org.example.notesappapi.service;

import org.example.notesappapi.model.Note;
import org.example.notesappapi.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public boolean add(String title, String content) {
        if (title == null || title.isEmpty() || content == null || content.isEmpty()) {
            return false;
        }
        Note note = new Note();
        note.setTitle(title);
        note.setContent(content);
        noteRepository.save(note);
        return true;
    }


    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    public Note findById(Long id) {
        return noteRepository.findById(id).orElse(null);
    }

    public boolean deleteById(Long id) {
        if(noteRepository.existsById(id)) {
            noteRepository.deleteById(id);
            return true;
        } else {
            return false;
        }

    }


    public boolean update(Long id, String title, String content) {
        Note note = noteRepository.findById(id).orElse(null);
        if (note != null) {
            note.setId(id);
            note.setTitle(title);
            note.setContent(content);
            noteRepository.save(note);
            return true;
        } else {
            return false;
        }
    }
}
