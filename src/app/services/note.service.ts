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

  getNotes(): Observable<Note[]>{
    console.log('Getting notes');
    return this.http.get<Note[]>(this.URL + 'api/get-notes');
  }

  addNote(title: string, content: string):Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.URL + 'api/add-note', {
        title: title,
        content: content,
      }, {responseType: 'text'}).toPromise().then(() => {
        console.log('Note added');
        resolve();
      }).catch((error) => {
        console.log(error);
        console.log('Error adding note');
        reject();
      });
    });
  }

  updateNote(id: string, title: string, content: string) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.put(this.URL + 'api/update-note/' + id, {
        title: title,
        content: content,
      }, {responseType: 'text'}).toPromise().then(() => {
        console.log('Note updated');
        resolve();
      }).catch((error) => {
        console.log(error);
        console.log('Error updating note');
        reject();
      });
    });
  }


  deleteNote(id: string) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.URL + 'api/delete-note/' + id, {responseType: 'text'}).toPromise().then(() => {
        console.log('Note deleted');
        resolve();
      }).catch((error) => {
        console.log(error);
        console.log('Error deleting note');
        reject();
      });
    });
  }
}
