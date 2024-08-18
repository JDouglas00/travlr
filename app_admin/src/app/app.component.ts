import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component'; // Import the NavbarComponent
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, NavbarComponent, RouterModule], // Import NavbarComponent here
  standalone: true,
})
export class AppComponent {
  title = 'travlr';
}


