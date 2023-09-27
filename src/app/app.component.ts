import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from './theme-switcher/theme.service';
import { AVContentItem } from './models/av-content-item.model';
import { ImageDataService } from './services/image-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { WindowRefService } from './services/window-ref.service';
import { ScreenData } from './models/window-data.model';
import { AppConfigService } from './services/app-config.service';
import { AppConfig } from './models/app-config.model';
import { SidenavService } from './services/sidenav.service';
import { DialogService } from './services/dialog.service';
import { LocalStorageService } from './services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'any-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  theme$: Observable<string> = new Observable<string>();
  title = 'The Anything App!';
  windowData: ScreenData;
  screenTooSmall: boolean;
  appConfig: AppConfig;
  screenProperties = [];
  fadeIn: boolean = true;
  fadeOut: boolean = false;
  smallScreen: boolean;
  closeSubs = [];

  constructor(
    private themeService: ThemeService,
    private windowRef: WindowRefService,
    private sidenavService: SidenavService,
    private dialogService: DialogService,
    private localStorageService: LocalStorageService,
  ) {
    this.theme$ = this.themeService.currentThemeWatcher.pipe(takeUntilDestroyed());
    this.windowRef.windowSizeWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      if (!data) { return; }
      this.windowData = data;
    });
    this.windowRef.smallScreenWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      if (!data) { return; }
      this.smallScreen = data;
    });



    if (!this.smallScreen) { this.sidenavService.openSidenav(); }

    this.sidenavService.fadeInWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      this.fadeIn = data;
    });
    this.sidenavService.fadeOutWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      this.fadeOut = data;
    });

  }

  ngOnInit() {
    this.formatWindowData();
    const autoShowDialog = this.localStorageService.getData('autoShowDialog');
    if (autoShowDialog !== "false") {
      const dialogSub = this.dialogService.openOverviewDialog('global').afterOpened().subscribe(() => this.sidenavService.openSidenav());
      this.closeSubs.push(dialogSub);
      this.localStorageService.saveData('autoShowDialog', "false");
    }

  }

  formatWindowData() {
    if (!this.windowData) { return; }
    const keys = Object.keys(this.windowData);
    let props = [];
    if (keys && keys.length) {
      keys.forEach(key => {
        const prop = {
          property: key,
          value: this.windowData[key]
        };
        props.push(prop);
      });
      this.screenProperties = props;
    }
  }

  ngOnDestroy() {
    this.closeSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }


}
