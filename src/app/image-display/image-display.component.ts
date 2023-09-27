import { Component, OnInit, Input, HostListener, ElementRef, Renderer2, Inject, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AVContentItem } from '../models/av-content-item.model';
import { DOCUMENT } from '@angular/common';
// import { ImageModalComponent } from './image-modal/image-modal.component';
import { WindowRefService } from '../services/window-ref.service';
import { ScreenData } from 'src/app/models/window-data.model';
import { DialogService } from 'src/app/services/dialog.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'any-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageDisplayComponent implements AfterViewInit, OnInit {

  @Input('mainTitle') mainTitle: string;
  @Input('image') image: AVContentItem;
  _width: number = -1;
  @Input('width') set width(val) {
    this._width = val;
    this.widthStyle = this._width > -1 ? `${this._width}px` : '100%';
  };
  get width(): number {
    return this._width;
  }
  gtag: any;

  @ViewChild('imageContainer') imageContainer: ElementRef;

  showFullSize: boolean = false;
  widthStyle: string = '';

  @HostListener('mouseover') mouseOverFn() {
    // this.onMouseOver();
  }
  @HostListener('click') clickFn() {
    this.onClick();
  }

  windowData: ScreenData;

  constructor(
    @Inject(DOCUMENT) private document,
    private windowRef: WindowRefService,
    private rend: Renderer2,
    private el: ElementRef,
    private dialogService: DialogService
  ) { 
  }

  ngOnInit() {
    // this.gtag = this.windowRef.gtag;
  }
  
  ngAfterViewInit(): void {
  }

  onClick() {
    // this.gtag("event", "Video Clicked gtm.js", { send_to: "G-0XFXF8DZ2J" })
    this.dialogService.openContentItemDialog(this.image);
  }
 
}
