import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NoteFormComponent} from "./pages/note-form/note-form.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";

export const routes: Routes = [
  { path: 'home', component:HomeComponent},
  { path: 'note-form', component:NoteFormComponent},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }

];
