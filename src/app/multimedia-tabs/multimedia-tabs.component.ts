import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { TabItem } from 'src/app/models/tab-item.model';
import { ScreenData } from 'src/app/models/window-data.model';
import { MenuService } from 'src/app/services/menu.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { WindowRefService } from 'src/app/services/window-ref.service';

export interface TabData {
  tabIndex: number;
  path: string;
  activeRouteKey: string;
}

@Component({
  selector: 'any-multimedia-tabs',
  templateUrl: './multimedia-tabs.component.html',
  styleUrls: ['./multimedia-tabs.component.scss']
})
export class MultimediaTabsComponent implements OnInit{
  @Input('show') show: boolean = false;
  @Input('tabItems') items$: Observable<TabItem[]>;
  @Input('currentMenuItemId') currentMenuItemId: string;

  key: string;
  indexkey: Map<string, TabData> = new Map<string, TabData>();
  keyindex: Map<number, TabData> = new Map<number, TabData>();

  private _activeTabIndex = 0;
  get activeTabIndex() {
    return this._activeTabIndex;
  }
  set activeTabIndex(val) {
    this._activeTabIndex = val;
    const activeTab = this.indexkey[this._activeTabIndex];
    if (!activeTab) { return; }
    this.location.replaceState(activeTab.path);
  }
  sidenavIsOpen: boolean;

  constructor(
    private sidenavService: SidenavService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private menuService: MenuService,
    private el: ElementRef,
    private windowRef: WindowRefService,
    private rend: Renderer2
  ) {
    this.indexkey.set('butters', { tabIndex: 0, path: 'media/butters', activeRouteKey: 'butters' });
    this.indexkey.set('butters-videos', { tabIndex: 1, path: 'media/butters-videos', activeRouteKey: 'butters-videos' });
    this.indexkey.set('misc', { tabIndex: 2, path: 'media/misc', activeRouteKey: 'misc' });

    this.indexkey.forEach(ik => {
      this.keyindex.set(ik.tabIndex, { tabIndex: ik.tabIndex, path: ik.path, activeRouteKey: ik.activeRouteKey });
    });

    router.events.pipe(filter(e => e instanceof NavigationEnd)).pipe(takeUntilDestroyed()).subscribe(event => {
      this.handleNewRoute();
    });

    sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => {
      if (data === undefined) { return; }
      this.sidenavIsOpen = !!data;
    });

    // this.windowRef.windowSizeWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
    //   this.windowResized(data);
    // });

  }

  ngOnInit() {
    if (!this.key) {
      this.key = Object.keys(this.indexkey)[0];
    }
  }

  windowResized(data: ScreenData) {
    if (!(this.el && this.el && this.el.nativeElement)) { return; }
    const tabs = this.el.nativeElement.getElementsByTagName('mat-tab-body');
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      if (tab.getBoundingClientRect) {
        let r = tab.getBoundingClientRect();
        let shouldBeHeight = data.windowHeight - r.top;
        tab.style.height = shouldBeHeight + 'px';

        let tabContentContainers = tab.querySelectorAll('.mat-mdc-tab-body-content');

        if (tabContentContainers && tabContentContainers.length === 1) {
          const tabContentContainer = tabContentContainers[0];
          if (tabContentContainer.offsetWidth + (this.sidenavIsOpen ? 280 : 0) === data.windowWidth) {
            this.rend.setStyle(tabContentContainer, 'overflow-x', 'hidden');
          }
        }


      }

    }
  }



  handleNewRoute() {
    if (this.route.snapshot.paramMap.has('key')) {
      this.key = this.route.snapshot.paramMap.get('key');
    }
    else {
      this.key = this.key = Object.keys(this.indexkey)[0];
    }
    this.activateTabByKey(this.key);
  }

  activateTabByKey(key: string) {
    if (!key) { return; }
    if (this.indexkey.has(key)) {
      this.activeTabIndex = this.indexkey.get(key).tabIndex;
    }
  }

  tabChanged(event) {
    if (event === undefined) { return; }
    this.activeTabIndex = event.index;
    const activeTab = this.keyindex.get(this.activeTabIndex);
    if (!activeTab) { return; }
    this.location.replaceState(this.buildPath(activeTab.path));
    this.menuService.currentActiveMenuId = activeTab.path.replace('/', '-');
  }

  buildPath(activeTabPath) {
    let segs = [];
    let rte = this.route.snapshot;
    while (rte.parent !== null) {
      segs.push(...rte.parent.url);
      rte = rte.parent;
    }
    segs = segs.reverse();
    const newPath = `/${segs.join('/')}/${activeTabPath}`;
    return newPath;
  }

}
