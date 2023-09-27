import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LetterService } from '../write-a-note/letter.service';
import { Letter } from '../write-a-note/letter.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'any-super-computer',
  templateUrl: './super-computer.component.html',
  styleUrls: ['./super-computer.component.scss']
})
export class SuperComputerComponent implements AfterViewInit {

  noteText: string;
  letter: Letter;
  marqueeText: string = '';
  letters: Letter[];

  letterTimeouts = [];
  clearingTImeouts = [];
  processCount = 0;
  interval: any;

  @ViewChild('note') note: ElementRef;
  @ViewChild('marquee') marquee: ElementRef;
  @ViewChild('computer') computer: ElementRef;

  constructor(private letterService: LetterService, private rend: Renderer2) {
    this.letterService.getLastLetter().pipe(takeUntilDestroyed()).subscribe(data => {
      if (!data) { return; }
      this.letter = JSON.parse(data.toString());
      this.noteText = this.letter.text.toString();
      console.log(this.noteText);
    });
    this.marqueeText = 'Your note is being processed by the super computer below.';
  }

  ngAfterViewInit() {
    console.log(this.note.nativeElement);
    this.interval = setInterval(() => this.process(), 10000);
    this.process();
  }

  process() {
    if (this.processCount > 2) {
      clearInterval(this.interval);
    }
    this.scanLetter();
    this.processCount++;
  }

  scanLetter(singlePass: boolean = false) {
    setTimeout(() => {
      this.rend.addClass(this.note.nativeElement, 'process-step-1');
      this.rend.addClass(this.computer.nativeElement, 'processing');
    }, 1000);
    setTimeout(() => { this.rend.addClass(this.note.nativeElement, 'process-step-2'); }, 2000);
    setTimeout(() => {
      this.rend.addClass(this.note.nativeElement, 'process-step-3');
      this.rend.removeClass(this.computer.nativeElement, 'processing');
    }, 8000);
    setTimeout(() => {
      this.rend.removeClass(this.note.nativeElement, 'process-step-1');
      this.rend.removeClass(this.note.nativeElement, 'process-step-2');
      this.rend.removeClass(this.note.nativeElement, 'process-step-3');
      this.rend.removeClass(this.computer.nativeElement, 'processing');
      if (this.processCount > 3 && !singlePass) { this.processComplete(); }
    }, 10000);
  }

  processComplete() {
    clearTimeout(this.interval);
    this.rend.setStyle(this.marquee.nativeElement, 'font-size', '24px');
    this.rend.setStyle(this.marquee.nativeElement, 'color', 'white');
    this.rend.setStyle(this.marquee.nativeElement, 'font-family', 'Erasmd');
    this.marqueeText = "We found your thoughts to be very insightful and have added your words to our vast database of knowledge and wisdom.  Thank you.";
  }

  displayPreviousLetters() {
    const sub = this.letterService.getLetters().subscribe((data: Letter[]) => {
      this.letters = data;
        this.letters.forEach(letter => {
          if (Array.isArray(letter.text)) {
            this.noteText = letter.text.join('\n\n');
          }
          else {
            this.noteText = letter.text;        
          }
          this.scanLetter(true);
        });
    });
  }


}
