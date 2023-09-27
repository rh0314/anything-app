import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OverviewDialogComponent } from '../overview-dialog/overview-dialog.component';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'any-config-data-dialog',
  templateUrl: './config-data-dialog.component.html',
  styleUrls: ['./config-data-dialog.component.scss']
})
export class ConfigDataDialogComponent implements OnInit {

  configData = [];
  displayedColumns = [ 'key', 'value' ];

  constructor(
      private dialogRef: MatDialogRef<OverviewDialogComponent>, 
      @Inject(MAT_DIALOG_DATA) data, 
      private localStorage: LocalStorageService
    ) {
    

  }

  ngOnInit() {
    this.configData = this.localStorage.getAll()
  }
}
