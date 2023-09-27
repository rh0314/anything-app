import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { FormGroupMenuOption, MenuOption } from 'src/app/models/menu-option.model';
import { MenuService } from 'src/app/services/menu.service';
import { DialogService } from '../../services/dialog.service';
import { SidenavService } from '../../services/sidenav.service';
import { WindowRefService } from '../../services/window-ref.service';
import { fgMenuOptionToMenuOption, menuOptionToFgMenuOption } from '../../shared/utils';
import { SnackBarService } from 'src/app/shared/basic-snack-bar/snack-bar.service';

@Component({
  selector: 'any-edit-menu-options',
  templateUrl: './edit-menu-options.component.html',
  styleUrls: ['./edit-menu-options.component.scss']
})
export class EditMenuOptionsComponent {
  sidenavIsOpen: boolean;
  title = "Edit Menu Items";
  subtitle = "Modify the items shown in the applicaton menu";
  smallScreen = false;
  formIsValid: boolean = false;
  options: MenuOption[] = [];
  fgOptions: FormGroupMenuOption[] = [];
  originalFgOptions: FormGroupMenuOption[] = [];
  success: boolean;
  dirty: boolean;
  pristine: boolean;
  movingId: number;
  @ViewChild('componentWrapper') componentWrapper: ElementRef;

  constructor(
    private fb: FormBuilder,
    private sidenavService: SidenavService,
    private windowRef: WindowRefService,
    private dialogService: DialogService,
    private menuService: MenuService,
    private snackbarService: SnackBarService

  ) {
    sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => {
      this.sidenavIsOpen = !!data;
    });

    windowRef.smallScreenWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      this.smallScreen = data;
    });

  }


  ngOnInit(): void {
    this.menuService.menuOptionsWatcher.subscribe(data => {
      if (!data) { return; }
      this.options = data;
      this.fgOptions = [];
      this.options.forEach(opt => {
        this.fgOptions.push(menuOptionToFgMenuOption(opt));
      });
    });
  }

  submit() {

  }

  onDirtyChange(event) {
    this.dirty = event;
    if (this.dirty) { this.success = false; }
  }

  onPristineChange(event) {
    this.pristine = event;
    if (!this.pristine) { this.success = false; }
  }

  infoClick() {
    this.dialogService.openOverviewDialog('edit-menu');
  }

  add() {
    let newitem: MenuOption = new MenuOption();
    newitem.title = 'New Menu Option';
    let newFgItem = menuOptionToFgMenuOption(newitem);
    this.options.push(newitem);
    this.fgOptions.push(newFgItem);
  }

  move(event) {
    this.originalFgOptions = this.fgOptions;
    const idx = this.options.indexOf(event.option);
    this.movingId = this.options[idx].id;

    let direction = 0;

    if (event.direction === 'up') {
      if (idx === 0) { return; }
      direction = -1;
    }

    if (event.direction === 'down') {
      if (idx === this.options.length - 1) { return; }
      direction = 1;
    }
    const o = this.options.splice(idx, 1);
    this.options.splice(idx + direction, 0, o[0]);
    console.log(this.options);
    this.saveOptions(true);
  }

  updateAndSave(event) {
    if (event) {
      const idx = this.options.indexOf(event);
      this.options[idx] = fgMenuOptionToMenuOption(event);
    }
  }

  saveOptions(event$, move: boolean = false) {
    this.menuService.saveMenuOptions(this.options).pipe(takeUntilDestroyed()).subscribe((res: { result: boolean; message: string; }) => {
      if (res.result) {
        this.menuService.getMenuOptions();
        this.success = true;
        let message = '';
        let duration = 1000;
        if (move) {
          message = 'Options successfully re-ordered';
        }
        else {
          message = 'Options successfully saved';
          duration = 3000;
        }
        this.snackbarService.displaySnackbar(message, { duration: duration, politeness: 'polite', verticalPosition: 'top', panelClass: 'standard-snackbar' });
      }
      else {
        let reason = "Unknown";
        if (Array.isArray(res) && res.join('') === "666") {
          reason = "NOT AUTHORIZED";
        }
        this.snackbarService.displaySnackbar(`Could not save changes.  Reason:  ${reason}`, { duration: 5000, verticalPosition: 'top', panelClass: 'standard-snackbar' });
      }
    });

  }

  delete(event) {
    const idx = this.options.indexOf(event);
    this.options.splice(idx, 1);
    this.saveOptions(event);
  }

  optionClicked() {
    this.movingId = null;
  }
}
