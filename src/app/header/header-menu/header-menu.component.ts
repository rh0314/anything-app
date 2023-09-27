import { Component, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuOption } from 'src/app/models/menu-option.model';
import { ScreenData } from 'src/app/models/window-data.model';
import { DialogService } from 'src/app/services/dialog.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MenuService } from 'src/app/services/menu.service';
import { ThemeService } from 'src/app/theme-switcher/theme.service';

@Component({
  selector: 'any-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {
  @Input('show') show: boolean = false;
  @Input('theme') theme: string;
  @Input('windowData') windowData: ScreenData;
  
  options: MenuOption[];
  options$: Observable<MenuOption[]>;
  currentMenuItemId: string;

  get darkTheme() {
    return this.theme === 'dark';
  }
  set darkTheme(val) {
    this.theme = val ? 'dark' : 'light';
    this.themeService.currentTheme = val ? 'dark' : 'light';
  }

  constructor(
    private themeService: ThemeService,
    private menuService: MenuService,
    private dialogService: DialogService,
    private localStorage: LocalStorageService
    ) {
    themeService.currentThemeWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      if (!data) { return; }
      this.theme = data;
    });

    this.options$ = this.menuService.menuOptionsWatcher;
     
    // console.log('header menu: options$', !!this.options$);
    // console.log('header menu: show: ', this.show);
  }

  toggleClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  infoIconClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.dialogService.openOverviewDialog('theme');
  }


}
