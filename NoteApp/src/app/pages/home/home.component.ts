import {ChangeDetectorRef, Component, inject, OnInit, TemplateRef} from '@angular/core';
import {NoteCardComponent} from "../../components/note-card/note-card.component";
import {RouterLink} from "@angular/router";
import {Note} from "../../model/note";
import {NoteService} from "../../services/note.service";
import {ModalService} from "../../services/modal.service";
import {NewNoteModalComponent} from "../../components/new-note-modal/new-note-modal.component";
import {AuthService} from "../../services/auth.service";


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
export class HomeComponent implements OnInit{
  private noteService: NoteService = inject(NoteService);
  private modalService: any = inject(ModalService);
  private authService: any = inject(AuthService);
  noteList!: Note[];
  isAuth: boolean = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    console.log('Home component created');
  }

  ngOnInit() {
    this.loadNotes();
    this.changeDetectorRef.markForCheck();
    this.authService.isAuthenticated().then(
      (auth: boolean) => {
        this.isAuth = auth;
      }
    );
    console.log('isAuth', this.isAuth);
  }

  loadNotes() {
    this.noteService.getNotes().subscribe(notes => {
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

  handleNoteDeleted(deletedNote: any) {
    this.noteService.deleteNote(deletedNote.id).then(() => {
      window.location.reload();
    });
    console.log("Reloading component");
  }

}
