import {Component, inject, TemplateRef} from '@angular/core';
import {NoteCardComponent} from "../../components/note-card/note-card.component";
import {RouterLink} from "@angular/router";
import {Note} from "../../model/note";
import {NoteService} from "../../services/note.service";
import {ModalService} from "../../services/modal.service";
import {NewNoteModalComponent} from "../../components/new-note-modal/new-note-modal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NoteCardComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  noteService: NoteService = inject(NoteService);
  modalService: any = inject(ModalService);
  noteList: Note[] = [];

  constructor() {
    console.log('Home component created');
    this.noteService.getNotes().subscribe((notes) => {
      this.noteList = notes;
    });
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(NewNoteModalComponent, modalTemplate, {size: 'lg', title: 'Create a new note'})
      .subscribe((action: any) => {
      console.log('modalAction', action);
    });
  }
}
