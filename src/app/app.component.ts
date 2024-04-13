import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {HeaderComponent} from "./components/header/header.component";
import {NoteFormComponent} from "./pages/note-form/note-form.component";
import {FooterComponent} from "./components/footer/footer.component";
import {initFlowbite} from "flowbite";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, NoteFormComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'NoteApp';

  private router: Router = inject(Router);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        initFlowbite();
      }
    });
  }
}
