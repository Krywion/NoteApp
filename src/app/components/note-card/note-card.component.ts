import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import {Note} from "../../model/note";
import {MatButton} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {EditNoteModalComponent} from "../edit-note-modal/edit-note-modal.component";
@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent implements OnInit{
  @Input() note: Note | undefined;
  @Output() noteDeleted: EventEmitter<any> = new EventEmitter();

  private modalService: any = inject(ModalService);

  constructor() {
  }

  ngOnInit(): void {
  }


  deleteNote() {
    this.noteDeleted.emit(this.note)
  }


  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(EditNoteModalComponent, modalTemplate, {size: 'lg', title: 'Edit Note', data: this.note})
      .subscribe((action: any) => {
        console.log('modalAction', action);
      });
  }
}
