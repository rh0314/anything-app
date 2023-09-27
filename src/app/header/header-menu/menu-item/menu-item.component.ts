import { Component, Input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MenuItemType, MenuOption } from 'src/app/models/menu-option.model';
import { MenuService } from 'src/app/services/menu.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SnackBarService } from 'src/app/shared/basic-snack-bar/snack-bar.service';
import { DialogService } from 'src/app/services/dialog.service';
import { WindowRefService } from 'src/app/services/window-ref.service';

@Component({
  selector: 'any-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  currentMenuItemId: string;
  smallScreen: boolean;
  private _option: MenuOption;
  @Input('option') set option(val) {
    this._option = val;
  }
  get option() {
    return this._option;
  }

  constructor(
    private router: Router,
    private menuService: MenuService,
    private activeRoute: ActivatedRoute,
    private localStorage: LocalStorageService,
    private snackbarService: SnackBarService,
    private dialogService: DialogService,
    private windowRef: WindowRefService
  ) {
    this.menuService.currentActiveMenuIdWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      this.currentMenuItemId = data;
    });
    this.windowRef.smallScreenWatcher.pipe(takeUntilDestroyed()).subscribe(data => this.smallScreen = data);
    this.smallScreen = this.windowRef.smallScreen;
  }

  itemClick() {
    if (this.option.divider || !(this.option.path || this.option.function)) { return; }
    else if (this.option.function) {
      eval(this.option.function);
    }
    else {
      this.router.navigate([this.option.path]);
    }
  }

  resetConfig() {
    this.localStorage.clearData();
    this.snackbarService.displaySnackbar('Saved configuration has been cleared.', {
      panelClass: 'standard-snackbar', duration: 3000, verticalPosition: 'top'
    });
  }

  showConfigDialog() {
    this.dialogService.openLocalStorageDisplayDialog();
  }


}
