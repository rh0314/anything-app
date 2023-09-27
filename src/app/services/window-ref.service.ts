import { DOCUMENT } from '@angular/common';
import { HostListener, Inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UAParser } from 'ua-parser-js';
import { ScreenData } from '../models/window-data.model';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DeviceInfo } from '../models/device-info.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
  private destroy$ = new Subject<void>();
  private titleBase = 'THE ANYTHING APP!';
  private _windowSizeSubject = new BehaviorSubject<ScreenData>(null);
  private _smallScreenCutoff = 850;
  private _smallScreenHeightCutoff = 410;
  private _smallScreenSubject = new BehaviorSubject<boolean>(false);
  private _parser = new UAParser();
  private readonly viewportChange;

  get smallScreenWatcher() {
    return this._smallScreenSubject.asObservable();
  }

  get windowSizeWatcher() {
    return this._windowSizeSubject.asObservable();
  }

  get document(): any {
    return this._document;
  }

  get nativeWindow(): any {
    return this.window;
  }

  get deviceInfo(): DeviceInfo {
    return this._parser.getResult()
  }

  get smallScreen() {
    return (this.getWindowData().windowWidth < this._smallScreenCutoff || this.getWindowData().windowHeight < this._smallScreenHeightCutoff);
  }

  get title() {
    return this.getTitle();
  }

  set title(val) {
    this.setTitle(val);
  }

  get gtag() {
    return this.window['gtag'];
  }

  constructor(
    private window: Window,
    @Inject(DOCUMENT) private _document: Document,
    private readonly viewportRuler: ViewportRuler,
    private readonly ngZone: NgZone
  ) {

    this.viewportChange = this.viewportRuler.change().pipe(takeUntilDestroyed()).subscribe(() => {
      this.ngZone.run(() => {
        this.onResize();
      });
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.onResize();
  }

  private onResize() {
    const windowBox = this.getWindowData();
    this._windowSizeSubject.next(windowBox);
    this._smallScreenSubject.next(this.smallScreen);

  }

  triggerResize() {
    this.ngZone.run(() => {
      this.onResize();
    });
  }

  private getWindowData() {
    const s = this.nativeWindow['screen'];
    const w = this.nativeWindow;
    const windowBox = {
      screenWidth: s.availWidth,
      screenHeight: s.availHeight,
      windowHeight: w.innerHeight,
      windowWidth: w.innerWidth,
      windowTop: w.screenTop,
      windowLeft: w.screenLeft,
      orientation: s && s.orientation ? s.orientation.type : null
    }
    return windowBox;
  }


  private getSmallScreen() {
    const s = this.nativeWindow['screen'];
    if (s) {
      return (s.availWidth <= this._smallScreenCutoff || s.availHeight <= this._smallScreenHeightCutoff);
    }
    return null;
  }

  private getTitle() {
    const titleTagSearch = this._document.getElementsByTagName('title');
    let title = '';
    if (titleTagSearch && titleTagSearch.length) {
      const titleTag = titleTagSearch[0];
      title = titleTag.innerHTML;
    }

    return title;
  }

  private setTitle(val: string) {
    const titleTagSearch = this._document.getElementsByTagName('title');
    let title = '';
    if (titleTagSearch && titleTagSearch.length) {
      const titleTag = titleTagSearch[0];
      titleTag.innerHTML = `${this.titleBase} - ${val}`;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
