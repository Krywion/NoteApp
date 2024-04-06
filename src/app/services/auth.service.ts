import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';

  url:string = 'http://localhost:8080/';
  constructor() { }

  async login(username: string, password: string) {
    console.log('Logging in');
    const response = await fetch(this.url + 'sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    console.log(response);
    this.token = (await response.json()).token;
    localStorage.setItem('token', this.token);
    return response;
  }

  async register(username: string, email: string, password: string) {
    console.log('Registering');
    const response = await fetch(this.url + 'sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    });
    console.log(response);
    return response;
  }
}
