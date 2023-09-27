import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private static readonly DARK_THEME_CLASS = 'dark-theme';
  private static readonly LIGHT_THEME_CLASS = 'light-theme';
  private static readonly DARK_THEME_LIGHT = 'light';
  private static readonly DARK_THEME_DARK = 'dark';


  private _currentTheme: string = 'dark';
  private _currentThemeWatcher: BehaviorSubject<string> = new BehaviorSubject<string>(this._currentTheme);
  get currentThemeWatcher() {
    return this._currentThemeWatcher.asObservable();
  }
  set currentTheme(val) {
    this._currentTheme = val;
    this.setTheme(val);
    this._currentThemeWatcher.next(this._currentTheme);
    this.localStorageService.saveData('theme', this._currentTheme);
  }
  get currentTheme() {
    return this._currentTheme;
  }


  constructor(@Inject(DOCUMENT) private document: Document, private localStorageService: LocalStorageService) { 
    this.currentTheme = this.localStorageService.getData('theme');
    if (!this.currentTheme) {
      this.currentTheme = 'light';
    }
  }

  setTheme(theme) {
    const addClass = theme === 'light' ? 'light-theme' : 'dark-theme';
    const removeClass = theme === 'light' ? 'dark-theme' : 'light-theme';

    this.document.documentElement.classList.add(addClass);
    this.document.documentElement.classList.remove(removeClass);
  }

}
