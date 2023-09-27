import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';
import { WindowRefService } from '../services/window-ref.service';
import { ScreenData } from '../models/window-data.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LetterService } from './letter.service';
import { SnackBarService } from '../shared/basic-snack-bar/snack-bar.service';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { BasicSnackBarComponent } from '../shared/basic-snack-bar/basic-snack-bar.component';
import { config } from '../../environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'any-write-a-note',
  templateUrl: './write-a-note.component.html',
  styleUrls: ['./write-a-note.component.scss']
})
export class WriteANoteComponent implements OnInit, AfterViewInit {

  @ViewChild('textarea1') textarea1: ElementRef;
  sidenavIsOpen: boolean;
  screenData: ScreenData
  margin: number = 0;
  letterText: string = 'Dear AnythingApp,\n\n';
  originalText: string = 'Dear AnythingApp,\n\n';
  sb: MatSnackBarRef<BasicSnackBarComponent>;
  sent: boolean; 
  fadeIn: boolean;
  fadeOut: boolean;
  smallScreen: boolean;
  show: boolean;
  subs = [];

  get changed() {
    return this.letterText !== this.originalText;
  }

  constructor(
    private sidenavService: SidenavService,
    private windowRef: WindowRefService,
    private el: ElementRef,
    private rend: Renderer2,
    private letterService: LetterService,
    private snackbar: SnackBarService,
    private localStorage: LocalStorageService
  ) {
    this.sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => {
       this.sidenavIsOpen = !!data
    });
    this.sidenavService.fadeInWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      this.fadeIn = data;
    });
    this.sidenavService.fadeOutWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      this.fadeOut = data;
    });
    this.sidenavIsOpen = !!this.sidenavService.openClosed;
    this.windowRef.smallScreenWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      this.smallScreen = !!data;
    });
    this.windowRef.windowSizeWatcher.pipe(takeUntilDestroyed()).subscribe(data => {
      if (!data) { return; }
      this.screenData = data;
      this.resize();
    });

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log('el', this.el);
    console.log(this.textarea1);
    this.show = true;
  }

  textareaClick() {
    this.textarea1.nativeElement.focus();
    if (!this.changed) {
       this.textarea1.nativeElement.selectionStart = this.letterText.length;
    }
  }

  send() {
    this.sent = true;
    const sub = this.letterService.sendLetter({
      text: this.letterText,
      fontFamily: 'Chicken-Scratch'
    }).subscribe((res: { result: boolean; message: string; }) => {
      if (res.result) {
        this.sb = this.snackbar.displaySnackbar("Your note has been received by the super-computer.... Click next to watch it being processed.", {
            verticalPosition: 'top',
            panelClass: 'any-snackbar',
            data: {
              actions: [
                { text: 'Next', functionName: null, color: 'accent', link: '/super-computer' },
              ]
            }
        });
      }
      else {
        // notify not successful
      }
    });
    this.subs.push(sub);
  }


  resize() {
    let elementTop = this.el.nativeElement.getBoundingClientRect().top;
    let elementHeight = this.el.nativeElement.getBoundingClientRect().height;

    let maxHeight = (Number(this.screenData.windowHeight) - (Number(elementTop) + Number(this.margin)));
    const elementBottom = Number(maxHeight) + Number(elementTop);
    if (elementBottom > this.screenData.windowHeight) {
      maxHeight = Number(maxHeight) - (Number(elementBottom) - Number(this.screenData.windowHeight));
    }

    this.rend.setStyle(this.el.nativeElement, 'maxHeight', maxHeight + 'px');
    this.rend.setStyle(this.el.nativeElement, 'overflowY', 'auto');
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
