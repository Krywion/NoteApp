import {Injectable, inject} from '@angular/core';
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.API_BASE_URL;
  private readonly JWT_TOKEN: string = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);
  constructor() { }

  login(username: string, password: string) {
    let user = {username, password};
    localStorage.removeItem(this.JWT_TOKEN);
    return this.http
      .post(this.URL + 'sign-in', JSON.stringify(user), httpOptions)
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
    localStorage.removeItem(this.JWT_TOKEN);
    let user = {username, email, password};
    return this.http
      .post(this.URL + 'sign-up', JSON.stringify(user), httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let message = error.error;
          if(error.status === 201) {
            return throwError( () => new Error('User created successfully'));
          }
          else if(error.status === 409) {
            return throwError( () => new Error(message));
          } else {
            return throwError( () => new Error('Unknown error'));
          }
        }));

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
      return this.http.get(this.URL + 'auth/me', {
      });
  }
}
