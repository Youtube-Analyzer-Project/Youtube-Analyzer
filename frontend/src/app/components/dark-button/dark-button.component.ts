import {Component, signal} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-dark-button',
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './dark-button.component.html',
  styleUrl: './dark-button.component.scss'
})
export class DarkButtonComponent {
  protected darkMode = signal<boolean>(false);

  protected setDarkMode() {
    this.darkMode.set(!this.darkMode());
    if (this.darkMode()) {
      document.body.style.setProperty('color-scheme', 'dark');
    } else {
      document.body.style.setProperty('color-scheme', 'light');
    }
  }
}
