import {Component, Input} from '@angular/core';
import {Note} from "../../model/note";
import {EditFormComponent} from "../edit-form/edit-form.component";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [
    EditFormComponent,
    MatButton
  ],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {
  @Input() note: Note | undefined;
  protected readonly Note = Note;

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditFormComponent, {
      data: {note: this.note},
      panelClass: 'custom-dialog-container'
    });

    console.log('Dialog opened');
    console.log(this.note);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
