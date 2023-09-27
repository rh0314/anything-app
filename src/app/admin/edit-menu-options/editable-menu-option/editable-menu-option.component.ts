import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MenuOption } from 'src/app/models/menu-option.model';
import { getFieldRequiredUnlessSecondFieldTrue, getSubheaderOnlyHasTitleValidator, getCannotBeDividerAndSubheader, getDividerCanOnlyHaveDividerValidator } from '../../../validators/custom.validators';

@Component({
  selector: 'any-editable-menu-option',
  templateUrl: './editable-menu-option.component.html',
  styleUrls: ['./editable-menu-option.component.scss']
})
export class EditableMenuOptionComponent implements OnInit, OnDestroy {
  optionProperties = [];
  formIsValid: boolean;
  private _option: MenuOption;
  get option() {
    return this._option;
  }
  @Input('option') set option(val) {
    this._option = val;
    if (val) {
      this.getOptionProperties();
    }
  }
  headerFont: any = null;
  set subheader(val) {
    if (val) {
      this.headerFont = { 'font-family': 'NEOTERIC' };
    }
    else {
      this.headerFont = '';
    }
  }
  @Input() moving: boolean;

  @Output() pristine: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() dirty: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onsave: EventEmitter<MenuOption> = new EventEmitter<MenuOption>();
  @Output() ondelete: EventEmitter<MenuOption> = new EventEmitter<MenuOption>();
  @Output() onmove: EventEmitter<{ option: MenuOption; direction: string }> = new EventEmitter<{ option: MenuOption; direction: string }>();

  fg: FormGroup;
  titleErrorMessage: string;
  pathErrorMessage: string;
  activeIdPatternErrorMessage: string;
  dividerSubHeaderErrorMessage: string;

  subs = [];

  constructor(private fb: FormBuilder, private el: ElementRef) {
    this.getOptionProperties();
  }

  ngOnInit() {
    this.buildForm();
    this.subheader = this.option.subheader;
  }

  buildForm() {
    const titleControl = new FormControl(this.option.title, {
      validators: [],
      updateOn: 'change'
    });

    const pathControl = new FormControl(this.option.path, {
      updateOn: 'change'
    });

    const activeIdPatternControl = new FormControl(this.option.activeIdPattern, {
      updateOn: 'change'
    });

    const dividerControl = new FormControl(this.option.divider, {
      updateOn: 'change'
    });
    const subheaderControl = new FormControl(this.option.subheader, {
      updateOn: 'change'
    });

    this.fg = this.fb.group({
      title: titleControl,
      path: pathControl,
      activeIdPattern: activeIdPatternControl,
      divider: dividerControl,
      subheader: subheaderControl
    })

    this.fg.addValidators(getFieldRequiredUnlessSecondFieldTrue(this.fg.controls['title'], this.fg.controls['divider']));
    this.fg.addValidators(getSubheaderOnlyHasTitleValidator());
    this.fg.addValidators(getCannotBeDividerAndSubheader());
    this.fg.addValidators(getDividerCanOnlyHaveDividerValidator());

    this.subs[0] = this.fg.valueChanges.subscribe(data => {
      this.formIsValid = this.fg.valid
      this.pristine.emit(this.fg.pristine);
      this.dirty.emit(this.fg.dirty);
    });
  }

  delete(event) {
    event.preventDefault();
    event.stopPropagation();
    this.ondelete.emit(this.option);
  }

  save() {
    this.option.title = this.fg.controls['title'].value;
    this.option.path = this.fg.controls['path'].value;
    this.option.activeIdPattern = this.fg.controls['activeIdPattern'].value;
    this.option.divider = this.fg.controls['divider'].value;
    this.option.subheader = this.fg.controls['subheader'].value;
    this.onsave.next(this.option);
    this.setFormPristine();
    this.pristine.emit(this.fg.pristine);
  }

  move(event) {
    event.preventDefault();
    event.stopPropagation();
    this.onmove.emit({ option: this.option, direction: event.currentTarget.name === 'move-up' ? 'up' : 'down' });
  }

  setFormPristine() {
    const keys = Object.keys(this.fg.controls);
    if (keys) {
      keys.forEach(key => {
        this.fg.controls[key].markAsPristine();
      });
    }
  }

  getOptionProperties() {
    if (!this.option) { return; }
    const keys = Object.keys(this.option);
    let props = [];
    if (keys && keys.length) {
      keys.forEach(key => {
        const prop = {
          property: key,
          value: this.option[key]
        };
        props.push(prop);
      });
      this.optionProperties = props;
    }
  }

  getOptionLabel() {
    if (!this.option) { return ''; }
    let label = '';
    if (this.option.title) {
      label = this.option.title;
    }
    else if (this.option.divider) {
      label = 'divider';
    }
    else if (this.option.function) {
      label = 'function';
    }

    return label;
  }

  getOptionType() {
    if (!this.option) { return ''; }
    if (this.option.subheader) {
      return 'Sub Header';
    }
    else if (this.option.divider) {
      return "Divider"
    }
    else if (this.option.title && this.option.function) {
      return 'Menu Option (function)';
    }
    else if (this.option.title && this.option.path) {
      return 'Menu Option (Link)';
    }
    else {
      return 'Unknown';
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
