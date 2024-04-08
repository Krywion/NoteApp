import {inject, Injectable} from '@angular/core';
import {Note} from "../model/note";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  http = inject(HttpClient);

  constructor() { }

  submitNote(title: string, content: string) {
    console.log(`Title: ${title}, Content: ${content}`);
    this.addNote(title, content);
  }

  getNotes(): Observable<Note[]>{
    console.log('Getting notes');
    return this.http.get<Note[]>(URL + 'api/get-notes');
  }

  addNote(title: string, content: string) {
    this.http.post(URL + 'api/add-note', {
      title: title,
      content: content
    }).subscribe((response) => {
      console.log('Note added');
    });
  }

  updateNote(id: string, title: string, content: string) {
    this.http.put(URL + 'api/update-note/' + id , {
      title: title,
      content: content
    }).subscribe((response) => {
      console.log('Note updated');
    });
  }
}
