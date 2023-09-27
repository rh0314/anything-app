import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { config } from '../../../environments/environment';
import { SnackBarAction } from 'src/app/shared/basic-snack-bar/basic-snackbar-options.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'any-basic-snack-bar',
  templateUrl: './basic-snack-bar.component.html',
  styleUrls: ['./basic-snack-bar.component.scss']
})
export class BasicSnackBarComponent implements OnInit {
  trashUrl: string = '';
  message: string;
  actions: SnackBarAction[];

  constructor(
    public sbRef: MatSnackBarRef<BasicSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    console.log('sb data', data);
    this.message = data.message;
    if (data.actions) {
      this.actions = data.actions;
    }
    
  }


  ngOnInit() {
    this.trashUrl = `https://trash.${config.applicationServer}.com`;
    console.log(this.trashUrl);


  }

  doAction(action: SnackBarAction) {
    if (action.functionName && this[action.functionName]) {
      this[action.functionName]();
    }
    else if (action.function) {
      action.function();
    }
    else if (action.customFunction) {
      eval(action.customFunction);
    }
  }

  close() {
    this.sbRef.dismiss();
    this.router.navigate(['/']);
  }

  viewComplaintStatus() {
    this.router.navigateByUrl(this.trashUrl);
    this.sbRef.dismiss();
  }

  customAction(fnString) {

  }

}
