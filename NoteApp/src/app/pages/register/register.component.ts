import {Component, inject, OnInit} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
  ValidationErrors,
  ValidatorFn, AbstractControl
} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  authService: AuthService = inject(AuthService);
  errorMessage?: string;
  successMessage?: string;

  router = inject(Router);
  applyForm!: FormGroup;

  constructor() {

  }
  ngOnInit() {
    console.log('RegisterComponent initialized');
    this.applyForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', [Validators.required, this.confirmPasswordValidator]),
      terms: new FormControl(false, Validators.requiredTrue)
    });
  }

  redirectToLogin() {
    console.log('Redirecting to verify');
    this.router.navigate(['/verify']);
  }


  register(username: string, email: string, password: string) {
    this.authService.register(username, email, password).subscribe({
      next: (result) => {
        this.successMessage = "Check your email to verify your account.";
      },
      error: (error: any) => {
        console.log(error.message);
        this.errorMessage = error.message;
      },
      complete: () => {
      }
    });
  }


  submitForm() {
    if(this.applyForm.valid) {
      console.log(this.applyForm.value);
      this.register(
        this.applyForm.value.username ?? '',
        this.applyForm.value.email ?? '',
        this.applyForm.value.password ?? ''
      );
    } else {
      console.log('Invalid form');

    }

  }

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control.parent) {
      const password = control.parent.get('password')?.value;
      const confirmPassword = control.value;
      if (password !== confirmPassword) {
        return {passwordMismatch: true};
      }
    }
    return null;
  }
}
