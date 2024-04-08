import {Injectable, inject} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";


const URL = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN: string = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);
  constructor() { }

  login(username: string, password: string) {
    let user = {username, password};
    return this.http
      .post(URL + 'sign-in', JSON.stringify(user), httpOptions)
      .pipe(
        tap((data: any) => {
        this.doLoginUser(username, data.token);
      }),
        catchError((error: HttpErrorResponse) => {
          if(error.status === 403) {
            return throwError( () => new Error('Invalid credentials'));
          } else {
            return throwError( () => new Error('Unknown error'));
          }
        }));
  }

  register(username: string, email: string, password: string) {
    let user = {username, email, password};
    return this.http
      .post(URL + 'sign-up', JSON.stringify(user), httpOptions);
  }

  private doLoginUser(username: string, token: any) {
    this.loggedUser = username;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem(this.JWT_TOKEN);
      if (token) {
        this.isAuthenticatedSubject.next(true);
        resolve(true);
      } else {
        this.isAuthenticatedSubject.next(false);
        resolve(false);
      }
    });
  }
  getCurrentAuthUser() {
      return this.http.get(URL + 'auth/me', {
      });
  }
}
