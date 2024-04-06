import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule, Validators, FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  formBuilder: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);

  constructor() {

  }
  ngOnInit() {
    console.log('RegisterComponent initialized');

  }

  applyForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });


  register(username: string, email:string, password: string) {
    console.log('Registering');
    // Implement registration logic here
    this.authService.register(username, email, password).then((response) => {
      console.log(response);
    });
  }

  submitForm() {
    console.log(this.applyForm.value);
    if(this.applyForm.value.password != this.applyForm.value.confirmPassword){
      console.log('Passwords do not match');
      this.applyForm.get('confirm-password')?.setErrors({passwordMismatch: true});
      return;
    }
    this.register(
      this.applyForm.value.username ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.password ?? ''
    );
  }
}
