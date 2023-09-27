import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AVContentItem } from '../models/av-content-item.model';
import { WindowRefService } from '../services/window-ref.service';
import { ScreenData } from '../models/window-data.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'any-image-display-dialog',
  templateUrl: './image-display-dialog.component.html',
  styleUrls: ['./image-display-dialog.component.scss']
})
export class ImageDisplayDialogComponent implements OnInit, AfterViewInit {

  title: string;
  image: AVContentItem;
  windowData: ScreenData;
  screenTooSmall: boolean;

  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('content') content: ElementRef;
  @ViewChild('dialogImage') dialogImage: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<ImageDisplayDialogComponent>, @Inject(MAT_DIALOG_DATA) data,
    private windowRef: WindowRefService,
    private el: ElementRef,
    private rend: Renderer2
  ) {
    this.image = data.image;
    this.title = data.title

    // this.windowRef.windowSizeWatcher.pipe(takeUntilDestroyed()).subscribe((windowData: ScreenData) => {
    //   this.windowData = windowData;
    //   this.onWindowResize();
    // });

  }

  ngOnInit() {
    this.onWindowResize();
  }

  ngAfterViewInit() {
    // this.onWindowResize();
  }

  onWindowResize() {
    // nothing to do yet
    console.log(this.windowData);
  }
  
  checkContentSize() {
    let contentSize; 
    if (this.content) {
      contentSize = this.content.nativeElement.getBoundingClientRect();
    }
  }

  close() {
    this.dialogRef.close();
  }

}
