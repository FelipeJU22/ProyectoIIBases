import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AppWeb';
}
