import {Injectable} from '@angular/core';
import {Note} from "../model/note";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  url = 'http://localhost:8080/api/';

  constructor() { }

  submitNote(title: string, content: string) {
    console.log(`Title: ${title}, Content: ${content}`);
    this.addNote(title, content);
  }

  async getNotes() : Promise<Note[]>{
    console.log('Getting notes');
    const response = await fetch(this.url + 'notes');
    console.log(response);
    const noteList = await response.json();
    console.log(noteList);
    return noteList;
  }

  async addNote(title: string, content: string) {
    console.log('Adding note');
    const response = await fetch(this.url + 'add-note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        content: content
      })
    });
    console.log(response);
  }

  async updateNote(id: string, title: string, content: string) {
    console.log('Updating note');
    const response = await fetch(this.url + 'update-note/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        content: content
      })
    });
  }
}
