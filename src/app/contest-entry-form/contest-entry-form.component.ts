import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { SidenavService } from '../services/sidenav.service';
import { WindowRefService } from '../services/window-ref.service';
import { getUsPhoneValidator } from '../validators/custom.validators';

export interface ContestEntry {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  returnCustomer: boolean;
}

@Component({
  selector: 'any-contest-entry-form',
  templateUrl: './contest-entry-form.component.html',
  styleUrls: ['./contest-entry-form.component.scss']
})
export class ContestEntryFormComponent implements OnInit, OnDestroy {
  subs = [];
  sidenavIsOpen: boolean;
  title = "Enter to Win!";
  subtitle = "Supply the details below to enter our contest";
  fg: FormGroup;
  entry: ContestEntry = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    returnCustomer: false
  }
  submitted = false;
  submittedMessage = '';
  smallScreen = false;
  formIsValid: boolean = false;

  @ViewChild('componentWrapper') componentWrapper: ElementRef;

  constructor(
    private fb: FormBuilder,
    private sidenavService: SidenavService,
    private windowRef: WindowRefService,
    private dialogService: DialogService,
  ) {
    sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => {
      this.sidenavIsOpen = !!data;
    });

  }


  ngOnInit(): void {
    const firstNameControl = new FormControl(this.entry.firstName, {
      validators: [Validators.required],
      updateOn: 'change'
    });
    const lastNameControl = new FormControl(this.entry.lastName, {
      validators: [Validators.required],
      updateOn: 'change'
    });
    const phoneNumberControl = new FormControl(this.entry.phoneNumber, {
      validators: [Validators.required, getUsPhoneValidator()],
      updateOn: 'blur'
    });
    const emailControl = new FormControl(this.entry.email, {
      validators: [Validators.required],
      updateOn: 'change'
    });
    const returnCustomerControl = new FormControl(this.entry.returnCustomer, {
      updateOn: 'change'
    });

    this.fg = this.fb.group({
      firstName: firstNameControl,
      lastName: lastNameControl,
      phoneNumber: phoneNumberControl,
      email: emailControl,
      returnCustomer: returnCustomerControl
    }

    );

    const sub = this.fg.valueChanges.subscribe(data => {
      this.formIsValid = this.fg.valid;
      // console.log('form data', data, 'formIsValid', this.formIsValid);
    });
    this.subs.push(sub);
  }

  submit() {
    this.submitted = true;
    this.disableForm();
    this.submittedMessage = `Thank you, ${this.fg.controls['firstName'].value} for submitting our form.  We sure hope you win!  (Please see official rules for odds of winning.  Here's a hint:  it's a tiny fraction above zero.)`;
  }

  disableForm() {
    Object.keys(this.fg.controls).forEach(c => {
      this.fg.controls[c].disable();
    });
  }

  infoClick() {
    this.dialogService.openOverviewDialog('form');
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
