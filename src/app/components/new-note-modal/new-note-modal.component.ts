import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import {NoteService} from "../../services/note.service";

@Component({
  selector: 'app-edit-note-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-note-modal.component.html',
  styleUrl: './new-note-modal.component.css'
})
export class NewNoteModalComponent {
  @Input() size? = 'md';
  @Input() title? = 'New Note';

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  applyForm: FormGroup;

  constructor(private elementRef: ElementRef,
              private noteService: NoteService) {
    this.applyForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
        content: new FormControl('', [Validators.required]),
      }
    );
  }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.noteService.addNote(
      this.applyForm.value.title ?? '',
      this.applyForm.value.content ?? ''
    );

    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();

    window.location.reload();
  }
}
