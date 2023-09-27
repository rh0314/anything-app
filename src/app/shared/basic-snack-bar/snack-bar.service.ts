import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SafeHtml } from '@angular/platform-browser';
import { BasicSnackBarComponent } from './basic-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    public snackbar: MatSnackBar,
  ) { }



  displaySnackbar(message: string | SafeHtml, config: MatSnackBarConfig) {
    if (config) {
      if (!config.data) {
        config.data = {};
      }
      config.data.message = message;
      const sb = this.snackbar.openFromComponent(BasicSnackBarComponent, config);
      return sb;
    }
    return null;
  }
}
