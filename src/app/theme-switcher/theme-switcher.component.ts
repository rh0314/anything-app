import { DOCUMENT, Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from './theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WindowRefService } from '../services/window-ref.service';


@Component({
  selector: 'any-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit{
  
  get darkTheme() {
    return this.theme === 'dark';
  }
  set darkTheme(val) {
    this.theme = val ? 'dark' : 'light';
    this.themeService.currentTheme = val ? 'dark' : 'light';
  }


  smallScreen: boolean;
  theme: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService,
    private windowRef: WindowRefService,
    private cd: ChangeDetectorRef
  ) {
    // console.log(activeRoute.snapshot);
    this.themeService.currentThemeWatcher.pipe(takeUntilDestroyed()).subscribe(data => this.theme= data);
    this.windowRef.smallScreenWatcher.pipe(takeUntilDestroyed()).subscribe(data => this.smallScreen = data);
    this.theme = themeService.currentTheme;

  }
  
  ngOnInit() {
  }

  smallScreenChanged(event) {
    this.smallScreen = event;
    this.cd.detectChanges();
  }

  setTheme(theme) {
    this.theme = theme;
    this.themeService.currentTheme = theme;
  }

  toggleClick($event) {
    $event.stopPropagation();
    $event.preventDefault();
  }

}
