import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';

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
  private themeService = inject(ThemeService);
  
  // Expose the signal directly so the template can call it
  protected darkMode = this.themeService.darkMode;

  protected setDarkMode() {
    this.themeService.toggleTheme();
  }
}
