import {Component, Inject, Input, OnInit} from '@angular/core';
import {Note} from "../../model/note";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NoteService} from "../../services/note.service";

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent implements OnInit{
  @Input() isOpen: boolean = false;
  note: Note | undefined;
  applyForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private noteService: NoteService) {
  }

  ngOnInit() {
    console.log('EditFormComponent initialized');
    this.note = this.data.note;
    console.log(this.note);

    this.applyForm = new FormGroup({
      title: new FormControl(this.note?.title ?? ''),
      content: new FormControl(this.note?.content ?? '')
    });
  }



  submitForm() {
    console.log(this.applyForm.value);
    this.noteService.updateNote(
      this.note?.id ?? '',
      this.applyForm.value.title ?? '',
      this.applyForm.value.content ?? ''
    );
  }

}
