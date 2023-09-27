import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuOption } from '../models/menu-option.model';
import { SidenavOpenClosedStatusEnum } from '../models/sidenav-status.model';
import { MenuService } from '../services/menu.service';
import { SidenavService } from '../services/sidenav.service';
import { WindowRefService } from '../services/window-ref.service';
import { ThemeService } from '../theme-switcher/theme.service';
import { DialogService } from '../services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { OverviewDialogComponent } from '../overview-dialog/overview-dialog.component';

@Component({
  selector: 'any-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('drawer') drawerRef: ElementRef;
  @ViewChild('drawerContent') drawerContent: ElementRef;
  sidenavIsOpen: boolean = false;
  preRouteNavStatus: SidenavOpenClosedStatusEnum;
  smallScreen: boolean = false;
  theme: string;
  menuOptions$: Observable<MenuOption[]> = new Observable<MenuOption[]>();
  rollUp: boolean = false;
  dialog: MatDialogRef<OverviewDialogComponent, any>;

  constructor(
    private sidenavService: SidenavService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private windowRef: WindowRefService,
    private themeService: ThemeService,
    private menuService: MenuService,
    private rend: Renderer2,
    private el: ElementRef,
    private dialogService: DialogService
  ) {
    this.sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => {
      if (data === undefined) { return; }
      this.sidenavIsOpen = !!data;
    });

    this.windowRef.smallScreenWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      this.smallScreenChanged(data);
    });
    this.smallScreen = this.windowRef.smallScreen;
    this.menuOptions$ = this.menuService.menuOptionsWatcher.pipe(takeUntilDestroyed());
  }

  ngOnInit() {
    this.sidenavIsOpen = !!this.sidenavService.openClosed;

  }

  ngAfterViewInit() {
    this.sidenavService.registerDrawer(this.drawer);
    this.cd.detectChanges();
  }

  smallScreenChanged(smallScreen) {
    this.smallScreen = smallScreen;

    if (this.smallScreen && this.sidenavIsOpen) {
      this.sidenavService.closeSidenav();
    }

  }

  sidenavToggleButtonClick() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
    this.sidenavService.toggleSidenav();
  }

  sidenavToggle() {
    this.sidenavService.toggleSidenav()
  }

  sidenavClose() {
    this.sidenavService.closeSidenav();
  }

  onRollUpChange(event) {
    this.rollUp = event;
  }

  onHeaderBoundingBoxChange(event) {
    let drawerContainerTop = this.rollUp ? 0 : event.height + 1;
    let els = this.el.nativeElement.querySelectorAll('.mat-drawer-container');
    if (els && els.length) {
      const drawerEl = els[0];
      this.rend.setStyle(drawerEl, 'top', drawerContainerTop + 'px');
    }

  }

  infoIconClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.dialog = this.dialogService.openOverviewDialog('sidenav');
  }

}
