import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NoteService} from "../../services/note.service";
import {Note} from "../../model/note";

@Component({
  selector: 'app-edit-note-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-note-modal.component.html',
  styleUrl: './edit-note-modal.component.css'
})
export class EditNoteModalComponent implements OnInit{
  @Input() size? = 'md';
  @Input() title? = 'Edit Note';

  @Input() note?: Note;

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  applyForm!: FormGroup;

  constructor(private elementRef: ElementRef,
              private noteService: NoteService) {

  }

  ngOnInit(): void {
    console.log(this.note);
    this.applyForm = new FormGroup(
      {
        title: new FormControl(this.note?.title, [Validators.required]),
        content: new FormControl(this.note?.content, [Validators.required]),
      }
    );
    }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.noteService.updateNote(
      this.note?.id ?? '',
      this.applyForm.value.title ?? '',
      this.applyForm.value.content ?? ''
    )

    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();

    window.location.reload();
  }
}
