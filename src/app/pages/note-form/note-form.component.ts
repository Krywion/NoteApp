import {Component, inject} from '@angular/core';

import {Router, RouterLink} from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NoteService} from "../../services/note.service";

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent {

  router: Router = inject(Router);

  applyForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });

  private noteService = inject(NoteService);

  constructor() {
  }

  submitForm() {
    console.log(this.applyForm.value);
    this.noteService.submitNote(
      this.applyForm.value.title ?? '',
      this.applyForm.value.content ?? ''
    );

    this.router.navigate(['/home']);
  }

}
