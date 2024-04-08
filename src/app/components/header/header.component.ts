import {Component, inject, OnChanges} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnChanges{
  loggedIn: boolean = false;
  authService: AuthService = inject(AuthService);

  constructor() {
    this.authService.isAuthenticated().then((result) => {
      this.loggedIn = result;
      console.log('Logged in: ' + this.loggedIn);
    });
  }

  ngOnChanges() {
    this.authService.isAuthenticated().then((result) => {
      this.loggedIn = result;
      console.log('Logged in: ' + this.loggedIn);
    });
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
