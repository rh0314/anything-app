import { Component, ElementRef, Input, OnInit, Renderer2, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from '../models/app-config.model';
import { ScreenData, ScrollData } from '../models/window-data.model';
import { AppConfigService } from '../services/app-config.service';
import { DialogService } from '../services/dialog.service';
import { LocalStorageService } from '../services/local-storage.service';
import { MenuService } from '../services/menu.service';
import { SidenavService } from '../services/sidenav.service';
import { WindowRefService } from '../services/window-ref.service';
import { SnackBarService } from '../shared/basic-snack-bar/snack-bar.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'any-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input('currentMenuItemId') currentMenuItemId: string;
  @Input('theme') theme: string;
  sidenavIsOpen: boolean;
  mainTimer: any;
  enoughTime = false;
  smallScreen: boolean;
  windowData: ScreenData;
  showScreenData = false;
  forDummies: boolean;
  config: AppConfig;
  trashUrl: string = '';
  private _rollUp: boolean = false;
  private _overrideRollUp: boolean = false;

  private _forceRollUp: boolean = false;
  get rollUp() {
    let ru = this._rollUp;

    if (ru && this._overrideRollUp) {
      return false;
    }
    else if (!ru && this._forceRollUp) {
      return true;
    }
    return ru;
  }
  private set rollUp(val) {
    this._rollUp = val;
    this.rollUpChange.emit(this.rollUp);
    this.boundingBoxChange.emit(this.getDomRect());
  }
  scrollData: ScrollData;
  deviceInfo: any; 

  @Output() rollUpChange: EventEmitter<boolean> = new EventEmitter<boolean>(this._rollUp);
  @Output() boundingBoxChange: EventEmitter<DOMRect> = new EventEmitter<DOMRect>(null);

  constructor(
    private el: ElementRef,
    private sidenavService: SidenavService,
    private windowRef: WindowRefService,
    private activeRoute: ActivatedRoute,
    private menuService: MenuService,
    private dialogService: DialogService,
    private localStorage: LocalStorageService,
    private configService: AppConfigService,
    private router: Router,
    private snackbar: SnackBarService,
    private sanitizer: DomSanitizer,
    private rend: Renderer2
  ) {
    this.sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => {
      this.sidenavIsOpen = !!data;
    });

    this.windowRef.smallScreenWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      this.smallScreenChanged(data);
    });

    this.config = this.configService.appConfig;


  }

  ngOnInit() {
    this.deviceInfo = this.windowRef.deviceInfo;
    this.smallScreen = this.windowRef.smallScreen;
    console.log(JSON.stringify(this.deviceInfo));
  }

  ngAfterViewInit() {
    this.boundingBoxChange.emit(this.getDomRect());
    this.smallScreenChanged(this.windowRef.smallScreen);
  }

  smallScreenChanged(event) {
    this.smallScreen = event;
  }

  sidenavToggleButtonClick() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
    this.sidenavService.toggleSidenav();
  }

  infoIconClick(key) {
    this.dialogService.openOverviewDialog(key);
  }

  closeForDummies() {
    this.forDummies = true;
    this.localStorage.saveData('forDummies', "true");
  }

  complain(event) {
    event.preventDefault();
    console.log(this.router);
    this.router.navigate(['main', 'complain-to-management']);
  }

  handleScroll(data: ScrollData) {
    if (!data) { return; }

    if (data.target.classList.contains('mat-mdc-tab-body-content'))  {
      if (data.goingDown && data.y > 99) {
        this.rollUp = true;
      }
      if (data.goingUp && data.y < 100) {
        this.rollUp = false;
      }
    }
  }

  unRollUpClick() {
    this._forceRollUp = false;
    this._overrideRollUp = true;
    this.rollUpChange.emit(this.rollUp);
    this.boundingBoxChange.emit(this.getDomRect());
  }

  forceRollUpClick() {
    this._overrideRollUp = false;
    this._forceRollUp = true;
    this.rollUpChange.emit(this.rollUp);
    this.boundingBoxChange.emit(this.getDomRect());
  }

  getDomRect() {
    let els = this.el.nativeElement.querySelectorAll('.header-wrapper');
    if (els && els.length) {
      const headerEl = els[0];
      return headerEl.getBoundingClientRect();
    }
    else {
      return this.el.nativeElement.getBoundingClientRect();
    }
  }

}
