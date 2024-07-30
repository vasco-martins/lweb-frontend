import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServersListComponent } from './servers-list/servers-list.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ServersListComponent, CommonModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'technical-frontend';
}
