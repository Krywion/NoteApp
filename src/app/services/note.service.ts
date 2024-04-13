import {inject, Injectable} from '@angular/core';
import {Note} from "../model/note";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private readonly URL = environment.API_BASE_URL;

  http = inject(HttpClient);

  constructor() { }

  submitNote(title: string, content: string) {
    console.log(`Title: ${title}, Content: ${content}`);
    this.addNote(title, content);
  }

  getNotes(): Observable<Note[]>{
    console.log('Getting notes');
    return this.http.get<Note[]>(this.URL + 'api/get-notes');
  }

  addNote(title: string, content: string) {
    this.http.post(this.URL + 'api/add-note', {
      title: title,
      content: content
    }).subscribe((response) => {
      console.log('Note added');
    });
  }

  updateNote(id: string, title: string, content: string) {
    this.http.put(this.URL + 'api/update-note/' + id , {
      title: title,
      content: content
    }).subscribe((response) => {
      console.log('Note updated');
    });
  }

  deleteNote(id: string) {
    console.log('Deleting note' + id);
    this.http.delete(this.URL + 'api/delete-note/' + id).subscribe( {
      next: (result) => {
        console.log('Note deleted');
      },
      error: (error) => {
        console.log('Error deleting note');
      }
    });
  }
}
