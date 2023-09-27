import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { MenuOption } from '../models/menu-option.model';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { config } from '../../environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LayoutComponent } from '../layout/layout.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  server = config.apiServer;
  protocol = config.apiProtocol;
  port = config.apiPort;
  urlPrefix: string = '';

  // private _menuOptionsUpdated: EventEmitter<MenuOption[]> = new EventEmitter<MenuOption[]>(null);
  // get menuOptionsUpdated() {
  //   return this._menuOptionsUpdated.asObservable();
  // }
  private _menuOptions: MenuOption[] = [];
  private _menuOptionsUpdater: BehaviorSubject<MenuOption[]> = new BehaviorSubject<MenuOption[]>(this._menuOptions);
  get menuOptionsWatcher() {
    return this._menuOptionsUpdater.asObservable();
  }
  get menuOptions() {
    return this._menuOptions;
  } 
  set menuOptions(val) {
    this._menuOptions = val;
    this._menuOptionsUpdater.next(val);
  }

  private _currentActiveMenuId: string = '';
  private _currentActiveMenuIdWatcher: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentActiveMenuIdWatcher = this._currentActiveMenuIdWatcher.asObservable();

  get currentActiveMenuId() {
    return this._currentActiveMenuId;
  }
  set currentActiveMenuId(val) {
    if (!val) { return; }
    // console.log('new active id: ', val);
    this._currentActiveMenuId = val;
    this._currentActiveMenuIdWatcher.next(val);
  }

  constructor(
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location 
  ) { 
    if (this.server || this.port) {
      this.urlPrefix += `${this.protocol ? this.protocol : 'http'}://${this.server ? this.server : 'localhost'}${config.apiPort ? ':' + config.apiPort : ':2999'}`;
    }
    this.urlPrefix += config.apiPath ? config.apiPath : '';
    
    this.getMenuOptions();
  }

  getMenuOptions() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.http.get<MenuOption[]>(`${this.urlPrefix}/menu-options`, { headers: headers }).pipe(map(x => {
      let newOpts = [];
      x.forEach(opt => {
        let y = new MenuOption();
        const keys = Object.keys(opt);
        keys.forEach(key => {
          y[key] = opt[key];
        });
        newOpts.push(y);
      })
      return newOpts;
    })).subscribe(data => {
      this.menuOptions = data;
    });
  }

  saveMenuOptions(options) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }); 
    return this.http.post(`${this.urlPrefix}/save-menu-options`, options, { headers: headers });
  }

  getActiveId() {
    console.log(this.activeRoute.snapshot);
    let segments: UrlSegment[] = [];
    const checkRoute = (routesnapshot: ActivatedRouteSnapshot) => {
      console.log('segments', segments);
      let tempUrlSegs = segments;
      tempUrlSegs.push(...routesnapshot.url);
      console.log(this.location.path(), tempUrlSegs.join('/'));
      if (this.location.path() === '/' + tempUrlSegs.join('/')) {
        if (routesnapshot.data && routesnapshot.data.menuItemId) {
          this.currentActiveMenuId = routesnapshot.data.menuItemId;
        }
      }
      else if (this.location.path().startsWith('/' + tempUrlSegs.join('/'))) {
        if (routesnapshot.children) {
          routesnapshot.children.forEach(child => {
            checkRoute(child);
          });
        }

      }
    }
    let snap = this.activeRoute.snapshot;
    segments.push(...snap.url)
    checkRoute(snap);

  }

  getActiveMenuItem() {
    let filteredOpts = this.menuOptions.filter(x => this.currentActiveMenuId.match(x.activeIdPattern));
    let menuOption: MenuOption = null;
    if (filteredOpts && filteredOpts.length) {
      menuOption = filteredOpts[0];
    }

    return menuOption;
  }
}
