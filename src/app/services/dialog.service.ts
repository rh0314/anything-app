import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ImageDisplayDialogComponent } from '../image-display-dialog/image-display-dialog.component';
import { OverviewDialogComponent } from '../overview-dialog/overview-dialog.component';
import { Observable } from 'rxjs';
import { Overview } from '../models/overview.model';
import { AVContentItem } from '../models/av-content-item.model';
import { ConfigDataDialogComponent } from '../config-data-dialog/config-data-dialog.component';
import { DeviceInfoDialogComponent } from '../shared/device-info-display/device-info-dialog/device-info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private _dialog: MatDialog = null;
  dialogConfig = new MatDialogConfig();
  get dialog() {
    return this._dialog;
  }

  constructor(private d: MatDialog) {

    this._dialog = d;


    this.dialogConfig.disableClose = false;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.panelClass = 'custom-modal-class';
    this.dialogConfig.enterAnimationDuration = 750;
    this.dialogConfig.exitAnimationDuration = 750;




  }

  registerDialog(drawer: MatDialog) {
    // console.log('registerDrawer');

  }


  openContentItemDialog(image: AVContentItem): Observable<any> {
    if (!this.dialog) { return null; }
    this.dialogConfig.data = {
      image: image
    }
    const dialogRef = this.dialog.open(ImageDisplayDialogComponent, this.dialogConfig);

    return dialogRef.afterClosed();
  }

  openOverviewDialog(key: string): MatDialogRef<OverviewDialogComponent, any> {
    if (!this.dialog) { return null; }
    this.dialogConfig.data = {
      pageId: key
    }
    return this.dialog.open(OverviewDialogComponent, this.dialogConfig);
  }

  openLocalStorageDisplayDialog() {
    if (!this.dialog) { return null; }
    const dialogRef = this.dialog.open(ConfigDataDialogComponent, this.dialogConfig);
    return dialogRef.afterClosed();
  }

  openDeviceInfoDialog() {
    if (!this.dialog) { return null; }
    const dialogRef = this.dialog.open(DeviceInfoDialogComponent, this.dialogConfig);
    return dialogRef.afterClosed();
  }

}
