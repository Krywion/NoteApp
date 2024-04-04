import {Component, inject} from '@angular/core';
import {NoteCardComponent} from "../../components/note-card/note-card.component";
import {RouterLink} from "@angular/router";
import {Note} from "../../model/note";
import {NoteService} from "../../services/note.service";
import {EditFormComponent} from "../../components/edit-form/edit-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NoteCardComponent,
    RouterLink,
    EditFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  noteService: NoteService = inject(NoteService);
  noteList: Note[] = [];

  constructor() {
    this.noteService.getNotes().then((noteList: Note[]) => {
      this.noteList = noteList;
    })
    console.log(this.noteList);
  }
}
