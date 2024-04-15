import {Component, inject, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  applyForm!: FormGroup;
  errorMessage?: string;
  router = inject(Router);

  AuthService: AuthService = inject(AuthService);
  constructor() { }

  ngOnInit() {
    console.log('LoginComponent initialized');

    this.applyForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  login(username: string, password: string) {
    this.AuthService.login(username, password).subscribe( {
      next: (result) => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  submitForm() {
    console.log(this.applyForm.value);
    this.login(
      this.applyForm.value.username ?? '',
      this.applyForm.value.password ?? ''
    );
  }
}
