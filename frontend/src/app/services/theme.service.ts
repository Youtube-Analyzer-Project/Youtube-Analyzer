import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme-mode';

  // Signal to track dark mode state
  public darkMode = signal<boolean>(this.loadThemePreference());

  constructor() {
    // Effect to update the DOM and localStorage when dark mode changes
    effect(() => {
      const isDark = this.darkMode();
      this.applyTheme(isDark);
      this.saveThemePreference(isDark);
    });
  }

  /**
   * Toggle between dark and light mode
   */
  public toggleTheme(): void {
    this.darkMode.set(!this.darkMode());
  }

  /**
   * Set the theme explicitly
   */
  public setTheme(isDark: boolean): void {
    this.darkMode.set(isDark);
  }

  /**
   * Apply the theme by setting the color-scheme on the body element
   */
  private applyTheme(isDark: boolean): void {
    document.body.style.setProperty('color-scheme', isDark ? 'dark' : 'light');
  }

  /**
   * Load theme preference from localStorage
   */
  private loadThemePreference(): boolean {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored === 'dark';
  }

  /**
   * Save theme preference to localStorage
   */
  private saveThemePreference(isDark: boolean): void {
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
  }
}
