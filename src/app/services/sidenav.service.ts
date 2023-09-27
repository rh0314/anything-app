import { ChangeDetectorRef, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';
import { SidenavOpenClosedStatusEnum } from '../models/sidenav-status.model';
import { MatDrawer } from '@angular/material/sidenav';
import { WindowRefService } from './window-ref.service';
import { NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SidenavService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private _openClosed: SidenavOpenClosedStatusEnum;
  get openClosed(): SidenavOpenClosedStatusEnum {
    return this._openClosed;
  }
  set openClosed(val) {
    this._openClosed = val;
    this._sidenavOpenClosedUpdateer.next(val);
    this.localStorageService.saveData('sidenavStatus', this.openClosed.toString());
  }
  selectedItem: string;

  private _sidenavOpenClosedUpdateer = new BehaviorSubject<SidenavOpenClosedStatusEnum>(null);
  get sidenavOpenClosedUpdater() {
    return this._sidenavOpenClosedUpdateer.asObservable();
  }

  private _drawer: MatDrawer = null;
  get drawer() {
    return this._drawer;
  }

  private _fadeIn: boolean = false;
  private _fadeInWatcher: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._fadeIn);
  get fadeInWatcher() {
    return this._fadeInWatcher.asObservable();
  }
  get fadeIn() {
    return this._fadeIn;
  }
  set fadeIn(val) {
    this._fadeIn = val;
    this._fadeInWatcher.next(this._fadeIn);
  }
  private _fadeOut: boolean = false;
  private _fadeOutWatcher: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._fadeOut);
  get fadeOutWatcher() {
    return this._fadeOutWatcher.asObservable();
  }
  get fadeOut() {
    return this._fadeOut;
  }
  set fadeOut(val) {
    this._fadeOut = val;
    this._fadeOutWatcher.next(this._fadeOut);
  }

  constructor(
    private router: Router,
    private windowRef: WindowRefService,
    private localStorageService: LocalStorageService,
  ) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).pipe(takeUntilDestroyed()).subscribe(event => {
    });

  }

  registerDrawer(drawer: MatDrawer) {
    if (this._drawer) { return; }
    this._drawer = drawer;
    const ocString = this.localStorageService.getData('sidenavStatus');
    this.openClosed = ocString === "1" ? SidenavOpenClosedStatusEnum.OPEN : SidenavOpenClosedStatusEnum.CLOSED;
    if (this.openClosed === SidenavOpenClosedStatusEnum.OPEN) {
      this._drawer.open();
    }
    this._drawer.openedChange.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.openClosed = this._drawer.opened ? SidenavOpenClosedStatusEnum.OPEN : SidenavOpenClosedStatusEnum.CLOSED;
      this._sidenavOpenClosedUpdateer.next(this.openClosed);
    });

  }

  openSidenav() {
    // console.log('openSidenav');
    if (!this.drawer) { return; }
    this.fadeOut = true;
    this.fadeIn = false;

    setTimeout(() => {
      this.drawer.open();
    }, 250);

    setTimeout(() => {
      if (!this.drawer) { return; }
      this.fadeOut = false;
      this.fadeIn = true;
    }, 750);

    this.drawer.open();
  }

  toggleSidenav() {
    this.fadeOut = true;
    this.fadeIn = false;

    setTimeout(() => {
      this.drawer.toggle();
    }, 250);

    setTimeout(() => {
      if (!this.drawer) { return; }
      this.fadeOut = false;
      this.fadeIn = true;
    }, 750);

  }

  closeSidenav() {
    if (!this.drawer) { return; }
    this.fadeOut = true;
    this.fadeIn = false;

    setTimeout(() => {
      this.drawer.close();
    }, 250);

    setTimeout(() => {
      this.fadeOut = false;
      this.fadeIn = true;
    }, 500);

  }

  sidenavOpened() {
    // console.log('sidenavOpened');

    this.openClosed = SidenavOpenClosedStatusEnum.OPEN;
  }

  sidenavClosed() {
    // console.log('sidenavClosed');

    this.openClosed = SidenavOpenClosedStatusEnum.CLOSED;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
